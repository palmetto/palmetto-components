import React from 'react';
import { useToaster } from '../core/use-toaster';
import { ToastBar } from './toast-bar';
import { createRectRef, prefersReducedMotion } from '../core/utils';

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';

export type ToastPosition =
  'top-left' |
  'top-center' |
  'top-right' |
  'bottom-left' |
  'bottom-center' |
  'bottom-right';

export interface Toast {
  type: ToastType;
  id: string;
  message: ValueOrFunction<React.ReactNode, Toast>;
  // icon?:
  duration?: number;
  pauseDuration: number;
  position?: ToastPosition;
  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  style?: React.CSSProperties;
  className?: string;
  createdAt: number;
  visible: boolean;
  height?: number;
}

export type ToastOptions = Partial<
  Pick<
    Toast,
    | 'id'
    | 'duration'
    | 'position'
  >
>;

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> =
  | TValue
  | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> =>
  typeof valOrFunction === 'function';

export const resolveValue = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>,
  arg: TArg
): TValue => (isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction);

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
    transition: prefersReducedMotion()
      ? undefined
      : `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};

const activeClass = css`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;

interface ToasterProps {
  position?: ToastPosition;
  toastOptions?: DefaultToastOptions;
  reverseOrder?: boolean;
  gutter?: number;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
  children?: (toast: Toast) => JSX.Element;
}

const DEFAULT_OFFSET = 16;

export const Toaster: React.FC<ToasterProps> = ({
  reverseOrder,
  position = 'top-center',
  toastOptions,
  gutter,
  children,
  containerStyle,
  containerClassName,
}) => {
  const { toasts, handlers } = useToaster(toastOptions);

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
          <div
            ref={ref}
            className={t.visible ? activeClass : ''}
            key={t.id}
            style={positionStyle}
          >
            {t.type === 'custom' ? (
              resolveValue(t.message, t)
            ) : children ? (
              children(t)
            ) : (
              <ToastBar toast={t} position={toastPosition} />
            )}
          </div>
        );
      })}
    </div>
  );
};