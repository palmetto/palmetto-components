import React, { FC, ReactNode, RefObject } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import classNames from 'classnames';
import '@reach/dialog/styles.css';
import styles from './Modal.module.scss';

interface ModalProps {
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom: boolean;
  /**
   * Contents of the button.
   */
  children: ReactNode;
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  initialFocusRef?: RefObject<HTMLDivElement>;
  /**
   * Whether the modal is visible or not
   */
  isOpen: boolean;
  /**
   * Function that is called whenever the user hits "Esacape" key or clicks outside the dialog.
   */
  onDismiss: (event?: React.SyntheticEvent) => void;
  /**
   * Modal's header title
   */
  title?: string;
}

const Modal: FC<ModalProps> = ({
  allowPinchZoom = false,
  children,
  className,
  isOpen,
  onDismiss,
}) => {
  const contentClassnames = classNames(styles['modal-content'], className);

  return (
    <DialogOverlay
      className={styles.overlay}
      allowPinchZoom={allowPinchZoom}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <DialogContent className={contentClassnames}>{children}</DialogContent>
    </DialogOverlay>
  );
};

export default Modal;
