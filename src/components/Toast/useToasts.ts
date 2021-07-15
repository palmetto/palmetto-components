import { useEffect, useMemo } from 'react';
import { ExtendedToastOptions, Toast, ToastPosition } from './Toast.types';
import { useToastStore, dispatch, ToastStoreActionType } from './Toast.store';
import { toast } from './toast';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useToasts = (toastOptions?: ExtendedToastOptions) => { // eslint-disable-line import/prefer-default-export
  const { toasts, pausedAt } = useToastStore(toastOptions);

  useEffect(() => {
    if (pausedAt) {
      return;
    }

    const now = Date.now();
    const timeouts = toasts.map(t => {
      if (t.duration === Infinity) {
        return;
      }

      const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        if (t.visible) {
          toast.dismiss(t.id);
        }
        return;
      }
      return setTimeout(() => toast.dismiss(t.id), durationLeft); // eslint-disable-line consistent-return
    });

    return () => { // eslint-disable-line consistent-return
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
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
      updateHeight: (toastId: string, height: number) => dispatch({
        type: ToastStoreActionType.UPDATE_TOAST,
        payload: { toast: { id: toastId, height } },
      }),
      calculateOffset: (
        currentToast: Toast,
        opts?: {
          reverseOrder?: boolean;
          gutter?: number;
          defaultPosition?: ToastPosition;
        },
      ) => {
        const { reverseOrder = false, gutter = 8, defaultPosition } = opts || {};

        const relevantToasts = toasts
          .filter(t => (t.position || defaultPosition) === (currentToast.position || defaultPosition) && t.height);
        const toastIndex = relevantToasts.findIndex(t => t.id === currentToast.id);
        const toastsBefore = relevantToasts.filter(
          (t, i) => i < toastIndex && t.visible,
        ).length;

        const offset = relevantToasts
          .filter(t => t.visible)
          .slice(...(reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]))
          .reduce((acc, t) => acc + (t.height || 0) + gutter, 0);

        return offset;
      },
    }),
    [toasts, pausedAt],
  );

  return {
    toasts,
    handlers,
  };
};
