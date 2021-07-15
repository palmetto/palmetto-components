import { ValueOrFunction, IconName } from '../../types';

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
  isCompact?: boolean;
  icon?: IconName;
  duration?: number;
  pauseDuration: number;
  position?: ToastPosition;
  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  canDismiss?: boolean;
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
    | 'ariaProps'
    | 'className'
    | 'style'
    | 'position'
    | 'canDismiss'
    | 'isCompact'
  >
>;

/**
 * Extends toast options so that you can include options for each type of toast in the options.
 * e.g: { duration: 1000, success: { duration: 2000 } }
 */
export type ExtendedToastOptions = ToastOptions & { [key in ToastType]?: ToastOptions; };
