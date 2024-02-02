import { useCallback, useState } from 'react';

export interface UseOpenCloseProps {
  /**
   * Initial visibility of the component
   */
  defaultIsOpen?: boolean;
  /**
   * If defined, visibility of the component is assumed to be controlled
   */
  isOpen?: boolean;
  /**
   * Callback function when component is closed
   * @returns void
   */
  onClose?: () => void;
  /**
   * Callback function when component is opened
   * @returns void
   */
  onOpen?: () => void;
}

export interface UseOpenCloseState {
  /**
   * If true, sets the controlled component to its visible state
   */
  isOpen: boolean;
  /**
   * Callback function to set a falsy value for the `isOpen` parameter.
   */
  handleClose: () => void;
  /**
   * Callback function to set a truthy value for the `isOpen` parameter.
   */
  handleOpen: () => void;
  /**
   * Callback function to toggle the value of the `isOpen` parameter.
   */
  handleToggle: () => void;
}

export const useOpenClose = (
  props: UseOpenCloseProps = {},
): UseOpenCloseState => {
  const {
    defaultIsOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
  } = props;

  const openCallback = useCallback(() => {
    onOpenProp?.();
  }, [onOpenProp]);

  const closeCallback = useCallback(() => {
    onCloseProp?.();
  }, [onCloseProp]);

  const [isOpenState, setIsOpen] = useState(defaultIsOpen || false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

  const isControlled = isOpenProp !== undefined;

  const handleClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    closeCallback?.();
  }, [isControlled, closeCallback]);

  const handleOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    openCallback?.();
  }, [isControlled, openCallback]);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleOpen, handleClose]);

  return {
    isOpen,
    handleClose,
    handleOpen,
    handleToggle,
  };
};
