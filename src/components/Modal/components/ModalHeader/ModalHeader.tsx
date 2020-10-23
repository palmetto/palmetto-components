import React, { FC } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '../../../Box/Box';
import styles from '../../Modal.module.scss';

type ModalHeaderProps = {
  /**
   * id of the element containing the title, used by the Modal `aria-labelledby` prop
   */
  id: string;
  /**
   * Modal's header title
   */
  title?: string;
  /**
   * If defined, will render a 'x' close button on the right side of the ModalHeader
   */
  onDismiss?: (event?: React.SyntheticEvent) => void;
};

const ModalHeader: FC<ModalHeaderProps> = ({ id, onDismiss, title = undefined }) => {
  const justifyContentValue = title === undefined && onDismiss ? 'flex-end' : 'space-between';

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
        <Box as="h4" fontSize={{ base: 'md', tablet: 'lg' }} id={id}>
          {title}
        </Box>
      )}
      {onDismiss && (
        <button
          aria-label="close"
          type="button"
          className={styles['modal-close']}
          onClick={onDismiss}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      )}
    </Box>
  );
};

export default ModalHeader;
