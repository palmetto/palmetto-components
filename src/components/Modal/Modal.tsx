import React, {
  ReactNode,
  RefObject,
  forwardRef,
} from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import classNames from 'classnames';
import { ModalFooter, ModalHeader, ModalBody } from './components';
import { CssOverflowValue } from '../../types';
import styles from './Modal.module.scss';

export interface ModalProps {
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom?: boolean;
  /**
   * Each modal needs to be properly labeled to provide context for users with
   * assistive technology such as screen readers. If a modal is announced to
   * the user without a label, it can be confusing and difficult to navigate.
   */
  ariaLabel?: string;
  /**
   * The id of the element that should be used as the Modal's label by assistive
   * technologies like screen readers. Usually the id is set on the `Modal.Header`
   */
  ariaLabelledBy?: string;
  /**
   * Contents of the button.
   */
  children?: ReactNode;
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * At mobile viewport widths, the modal will take up the fullscreen
   */
  fullScreenMobile?: boolean;
  /**
   * By default the first focusable element will receive focus when the dialog
   * opens but you can provide a ref to focus instead.
   *
   * @see Docs https://reach.tech/dialog#dialog-initialfocusref
   */
  initialFocusRef?: RefObject<HTMLDivElement>;
  /**
   * Whether the modal is visible or not
   */
  isOpen: boolean;
  /**
   * Function that is called whenever the user hits "Esacape" key or clicks outside the modal.
   */
  onDismiss: (event?: React.SyntheticEvent) => void;
  /**
   * The css overflow behavior of the Modal
   */
  overflow?: CssOverflowValue;
  /**
   * Allows spread props
   */
  [x: string]: any; // eslint-disable-line
}

export interface ModalStatic {
  Body: typeof ModalBody;
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
}

export type ModalWithStaticComponents =
  React.ForwardRefExoticComponent<React.PropsWithoutRef<ModalProps>>
  & Partial<ModalStatic>;

const Modal: ModalWithStaticComponents = forwardRef<HTMLDivElement, ModalProps>((
  {
    ariaLabel,
    ariaLabelledBy,
    allowPinchZoom = false,
    children,
    className,
    fullScreenMobile = false,
    initialFocusRef,
    isOpen,
    onDismiss,
    overflow = 'hidden',
    ...restProps
  },
  ref,
) => {
  const overylayClassnames = classNames(styles.overlay, {
    fullscreen: fullScreenMobile,
  });
  const contentClassnames = classNames(styles['modal-content'], className, {
    [`overflow-${overflow}`]: overflow,
  });

  return (
    <DialogOverlay
      className={overylayClassnames}
      allowPinchZoom={allowPinchZoom}
      isOpen={isOpen}
      onDismiss={onDismiss}
      initialFocusRef={initialFocusRef}
      ref={ref}
      {...restProps}
    >
      <div className={styles.container}>
        <DialogContent
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={contentClassnames}
        >
          {children}
        </DialogContent>
      </div>
    </DialogOverlay>
  );
});

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;

export { Modal };
