import React, { FC, ReactNode, RefObject, createContext, useContext } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Box from '../Box/Box';
import Button from '../Button/Button';
import '@reach/dialog/styles.css';
import styles from './Modal.module.scss';

interface ModalProps {
  Header: ReactNode;
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
}

type ContextProps = {
  onDismiss: (event?: React.SyntheticEvent) => void;
};

export const ModalContext = createContext<Partial<ContextProps>>({});

const Modal: FC<ModalProps> = ({
  allowPinchZoom = false,
  children,
  className,
  isOpen,
  onDismiss,
}) => {
  const contentClassnames = classNames(styles['modal-content'], className);

  const modalContextData = {
    onDismiss,
  };

  return (
    <ModalContext.Provider value={modalContextData}>
      <DialogOverlay
        className={styles.overlay}
        allowPinchZoom={allowPinchZoom}
        isOpen={isOpen}
        onDismiss={onDismiss}
      >
        <DialogContent className={contentClassnames}>{children}</DialogContent>
      </DialogOverlay>
    </ModalContext.Provider>
  );
};

interface ModalHeaderProps {
  /**
   * Modal's header title
   */
  title?: string;
  /**
   * display a close button in the Modal header
   */
  closeButton: boolean;
}

const Header: FC<ModalHeaderProps> = ({ closeButton = false, title }) => {
  const { onDismiss } = useContext(ModalContext);

  return (
    <Box
      padding="lg"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      borderWidth="0 0 xs 0"
      borderColor="grey-lighter"
      style={{
        flexShrink: 0,
      }}
      height="lg"
    >
      {title && (
        <Box as="h4" fontSize={{ base: 'md', tablet: 'lg' }}>
          {title}
        </Box>
      )}
      {onDismiss && closeButton && (
        <button type="button" className={styles['modal-close']} onClick={onDismiss}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      )}
    </Box>
  );
};

interface ModalFooterProps {
  /**
   * Modal footer content, usually a containing a primary action button, and a seondary action button
   */
  children?: ReactNode;
}

const Footer: FC<ModalFooterProps> = ({ children }) => {
  return (
    <Box
      padding="lg"
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      borderWidth="xs 0 0 0"
      borderColor="grey-lighter"
      childGap="sm"
      style={{
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  );
};

Modal.Footer = Footer;
Modal.Header = Header;

export default Modal;
