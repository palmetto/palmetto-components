import { useCallback, useState } from 'react';

export interface UseDisclosureProps {
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

export interface UseDisclosureState {
  /**
   * If true, sets the controlled component to its visible state
   */
  isOpen: boolean;
  /**
   * Callback function to set a falsy value for the `isOpen` parameter.
   */
  onClose: () => void;
  /**
   * Callback function to set a truthy value for the `isOpen` parameter.
   */
  onOpen: () => void;
  /**
   * Callback function to toggle the value of the `isOpen` parameter.
   */
  onToggle: () => void;
}

export const useDisclosure = (
  props: UseDisclosureProps = {},
): UseDisclosureState => {
  const {
    defaultIsOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
  } = props;

  const handleOpen = useCallback(() => {
    onOpenProp?.();
  }, [onOpenProp]);

  const handleClose = useCallback(() => {
    onCloseProp?.();
  }, [onCloseProp]);

  const [isOpenState, setIsOpen] = useState(defaultIsOpen || false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

  const isControlled = isOpenProp !== undefined;

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    handleClose?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    handleOpen?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
  };
};
