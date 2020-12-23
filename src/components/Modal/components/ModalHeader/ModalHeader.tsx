import React, { FC } from 'react';
import Box from '../../../Box/Box';
import Icon from '../../../Icon/Icon';
import styles from '../../Modal.module.scss';

export type ModalHeaderProps = {
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
          <Icon name="remove" />
        </button>
      )}
    </Box>
  );
};

export default ModalHeader;
