import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '../Box/Box';
import {
  ValueOrFunction,
  ValueFunction,
  Toast,
  ToastPosition,
  ToastOptions,
  ExtendedToastOptions,
  ToastType,
} from './Toast.types';
import { ToastNotification } from './ToastNotification';
import { useToastStore, dispatch, ToastStoreActionType } from './Toast.store';
// import { prefersReducedMotion } from '../core/utils';

// =====================================================
// UTILS
// =====================================================
const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);

export const createRectRef = (onRect: (rect: DOMRect) => void) => (
  el: HTMLElement | null
) => {
  if (el) {
    setTimeout(() => {
      const boundingRect = el.getBoundingClientRect();
      onRect(boundingRect);
    });
  }
};

export const prefersReducedMotion = (() => {
  // Cache result
  let shouldReduceMotion: boolean | undefined = undefined;

  return () => {
    if (shouldReduceMotion === undefined) {
      const mediaQuery = window?.matchMedia('(prefers-reduced-motion: reduce)');
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();

// =====================================================
// USE TOASTS HOOK
// =====================================================
export const useToasts = (toastOptions?: ExtendedToastOptions) => {
  const { toasts, pausedAt } = useToastStore(toastOptions);

  useEffect(() => {
    if (pausedAt) {
      return;
    }

    const now = Date.now();
    const timeouts = toasts.map((t) => {
      if (t.duration === Infinity) {
        return;
      }

      const durationLeft =
        (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          toast.dismiss(t.id);
        }
        return;
      }
      return setTimeout(() => toast.dismiss(t.id), durationLeft);
    });

    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [toasts, pausedAt]);

  const handlers = useMemo(
    () => ({
      startPause: () => {
        dispatch({
          type: ToastStoreActionType.START_PAUSE,
          payload: { time: Date.now() },
        });
      },
      endPause: () => {
        if (pausedAt) {
          dispatch({
            type: ToastStoreActionType.END_PAUSE,
            payload: { time: Date.now() },
          });
        }
      },
      updateHeight: (toastId: string, height: number) =>
        dispatch({
          type: ToastStoreActionType.UPDATE_TOAST,
          payload: { toast: { id: toastId, height } },
        }),
      calculateOffset: (
        toast: Toast,
        opts?: {
          reverseOrder?: boolean;
          gutter?: number;
          defaultPosition?: ToastPosition;
        }
      ) => {
        const { reverseOrder = false, gutter = 8, defaultPosition } =
          opts || {};

        const relevantToasts = toasts.filter(
          (t) =>
            (t.position || defaultPosition) ===
              (toast.position || defaultPosition) && t.height
        );
        const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id);
        const toastsBefore = relevantToasts.filter(
          (toast, i) => i < toastIndex && toast.visible
        ).length;

        const offset = relevantToasts
          .filter((t) => t.visible)
          .slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
          .reduce((acc, t) => acc + (t.height || 0) + gutter, 0);

        return offset;
      },
    }),
    [toasts, pausedAt]
  );

  return {
    toasts,
    handlers,
  };
};

// =====================================================
// TOAST
// =====================================================
type Message = ValueOrFunction<React.ReactNode, Toast>;

type ToastHandler = (message: Message, options?: ToastOptions) => string;

const createToast = (
  message: Message,
  type: ToastType = 'blank',
  opts?: ToastOptions
): Toast => ({
  createdAt: Date.now(),
  visible: true,
  type,
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
  message,
  pauseDuration: 0,
  ...opts,
  id: opts?.id || uuidv4(),
});

const createHandler = (type?: ToastType): ToastHandler => (
  message,
  options
) => {
  const toast = createToast(message, type, options);
  dispatch({
    type: ToastStoreActionType.UPSERT_TOAST,
    payload: { toast }
  });
  return toast.id;
};

export const toast = (message: Message, opts?: ToastOptions) =>
  createHandler('blank')(message, opts);

toast.error = createHandler('error');
toast.success = createHandler('success');
toast.loading = createHandler('loading');
toast.custom = createHandler('custom');

toast.dismiss = (toastId?: string) => {
  dispatch({
    type: ToastStoreActionType.DISMISS_TOAST,
    payload: { toastId },
  });
};

toast.remove = (toastId?: string) =>
  dispatch({
    type: ToastStoreActionType.REMOVE_TOAST,
    payload: { toastId },
  });

toast.promise = function<T>(
  promise: Promise<T>,
  msgs: {
    loading: React.ReactNode;
    success: ValueOrFunction<React.ReactNode, T>;
    error: ValueOrFunction<React.ReactNode, any>;
  },
  opts?: ExtendedToastOptions
) {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });

  promise
    .then((p) => {
      toast.success(resolveValue(msgs.success, p), {
        id,
        ...opts,
        ...opts?.success,
      });
      return p;
    })
    .catch((e) => {
      toast.error(resolveValue(msgs.error, e), {
        id,
        ...opts,
        ...opts?.error,
      });
    });

  return promise;
};



// =====================================================
// TOAST CONTAINER
// =====================================================
const getPositionStyle = (
  position: ToastPosition,
  offset: number
): React.CSSProperties => {
  const top = position.includes('top');
  const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle: React.CSSProperties = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
    ? {
        justifyContent: 'flex-end',
      }
    : {};
  return {
    left: 0,
    right: 0,
    display: 'flex',
    position: 'absolute',
    transition: false // prefersReducedMotion()
      ? undefined
      : `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};

interface ToastContainerProps {
  position?: ToastPosition;
  toastOptions?: ExtendedToastOptions;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  children?: (toast: Toast) => JSX.Element;
}

const DEFAULT_OFFSET = 16;

export const ToastContainer: React.FC<ToastContainerProps> = ({
  reverseOrder,
  position = 'top-center',
  toastOptions,
  gutter,
  children,
  containerStyle,
  containerClassName,
}) => {
  const { toasts, handlers } = useToasts(toastOptions);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: DEFAULT_OFFSET,
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        bottom: DEFAULT_OFFSET,
        pointerEvents: 'none',
        ...containerStyle,
      }}
      className={containerClassName}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
    >
      {toasts.map((t) => {
        const toastPosition = t.position || position;
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        });
        const positionStyle = getPositionStyle(toastPosition, offset);

        const ref = t.height
          ? undefined
          : createRectRef((rect) => {
              handlers.updateHeight(t.id, rect.height);
            });

        return (
          <Box
            ref={ref}
            zIndex={t.visible ? 'popover' : ''}
            key={t.id}
            style={positionStyle}
            direction="row"
          >
            {t.type === 'custom' ? (
              resolveValue(t.message, t)
            ) : children ? (
              children(t)
            ) : (
              <ToastNotification toast={t} position={toastPosition} />
            )}
          </Box>
        );
      })}
    </div>
  );
};