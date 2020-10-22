import React, { FC, useContext } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '../../../Box/Box';
import { ModalContext } from '../../Modal';
import styles from '../../Modal.module.scss';

type ModalHeaderProps = {
  /**
   * Modal's header title
   */
  title?: string;
  /**
   * display a close button in the Modal header
   */
  closeButton: boolean;
};

const ModalHeader: FC<ModalHeaderProps> = ({ closeButton = false, title = undefined }) => {
  const { onDismiss } = useContext(ModalContext);

  const justifyContentValue = title === undefined && closeButton ? 'flex-end' : 'space-between';

  return (
    <Box
      padding="lg"
      direction="row"
      alignItems="center"
      justifyContent={justifyContentValue}
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

export default ModalHeader;
