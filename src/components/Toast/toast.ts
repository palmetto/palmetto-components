import { v4 as uuidv4 } from 'uuid';
import { resolveValue } from '../../lib/resolveValue';
import { ValueOrFunction } from '../../types';
import {
  Toast,
  ToastOptions,
  ToastType,
  ExtendedToastOptions,
} from './Toast.types';
import { ToastStoreActionType, dispatch } from './Toast.store';

type Message = ValueOrFunction<React.ReactNode, Toast>;

type ToastHandler = (message: Message, options?: ToastOptions) => string;

const createToast = (
  message: Message,
  type: ToastType = 'blank',
  opts?: ToastOptions,
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
  canDismiss: type !== 'loading' && opts?.canDismiss !== false,
});

const createHandler = (type?: ToastType): ToastHandler => (
  message,
  options,
) => {
  const toast = createToast(message, type, options);
  dispatch({
    type: ToastStoreActionType.UPSERT_TOAST,
    payload: { toast },
  });
  return toast.id;
};

// eslint-disable-next-line
const toast = (message: Message, opts?: ToastOptions) => createHandler('blank')(message, opts);

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

toast.remove = (toastId?: string) => dispatch({
  type: ToastStoreActionType.REMOVE_TOAST,
  payload: { toastId },
});

// eslint-disable-next-line func-names
toast.async = function<T> (
  promise: Promise<T>,
  messages: {
    loading: React.ReactNode;
    success: ValueOrFunction<React.ReactNode, T>;
    error: ValueOrFunction<React.ReactNode, unknown>;
  },
  opts?: ExtendedToastOptions,
) {
  const id = toast.loading(messages.loading, { ...opts, ...opts?.loading });

  promise
    .then(data => {
      toast.success(resolveValue(messages.success, data), {
        id,
        ...opts,
        ...opts?.success,
      });
      return data;
    })
    .catch(err => {
      toast.error(resolveValue(messages.error, err), {
        id,
        ...opts,
        ...opts?.error,
      });
    });

  return promise;
};

export { toast }; // eslint-disable-line import/prefer-default-export
