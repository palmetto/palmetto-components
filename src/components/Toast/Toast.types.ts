import { ValueOrFunction } from '../../types';

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';

export type ToastPosition =
  'top-left' |
  'top-center' |
  'top-right' |
  'bottom-left' |
  'bottom-center' |
  'bottom-right';

export interface Toast {
  /**
   * Type of toast to create.
   */
  type: ToastType;
  /**
   * Unique id for the toast.
   */
  id: string;
  /**
   * Toast message
   */
  message: ValueOrFunction<React.ReactNode, Toast>;
  /**
   * Determine of toast layout is compact or default.
   */
  isCompact?: boolean;
  /**
   * Custom duration for toast.
   */
  duration?: number;
  /**
   * Amount of time the toast timeout has been paused for.
   * When the toast timeout is paused, its auto-dismissal will be delayed.
   */
  pauseDuration: number;
  /**
   * Custom toast position, use as needed to override global position from ToastContainer.
   */
  position?: ToastPosition;
  /**
   * Accessibility options
   */
  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  /**
   * Whether the toast can be dismissed (if true, the toast will include a close button)
   */
  canDismiss?: boolean;
  /**
   * Custom styles.
   */
  style?: React.CSSProperties;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Epoch timestamp
   */
  createdAt: number;
  /**
   * Whether the toast is visible at the current time.
   * Used in order to display a proper fade-out animation before the element is fully removed from the DOM.
   */
  visible: boolean;
  /**
   * Height of element (calculated with getBoundingClientRect)
   */
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
