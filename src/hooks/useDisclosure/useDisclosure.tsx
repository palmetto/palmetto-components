import { useCallback, useState } from 'react';

export interface UseDisclosureProps {
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export interface UseDisclosureState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
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
