import React, {
  FC,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimesCircle,
  faCheckCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Heading from '../Heading/Heading';
import styles from './Alert.module.scss';

interface AlertProps {
  /**
   * Custom class to apply to the alert container div.
   */
  className?: string;
  /**
   * Custom text to use as a close button.
   */
  closeText?: string;
  /**
   * The type/color of the alert to show.
   */
  hasIcon?: boolean;
  /**
   * Deterimines whether the alert can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the alert.
   */
  isClosable?: boolean;
  /**
   * Renders a version of the alert with smaller padding.
   */
  isCompact?: boolean;
  /**
   * The text message or ReactNode to be rendered in the alert.
   */
  message?: string | ReactNode;
  /**
   * Deterimines whether the alert can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the alert.
   */
  onClose?: (event: (MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>)) => void;
  /**
   * A render function that returns JSX if preferred over a static ReactNode or string.
   */
  render?: () => ReactNode;
  /**
   * The title for the alert.
   */
  title?: string;
  /**
   * The type/color of the alert to show.
   */
  type?: 'info' | 'success' | 'warning' | 'danger' | 'default';
}
const Alert: FC<AlertProps> = ({
  className = '',
  closeText = '',
  hasIcon = false,
  isCompact = false,
  isClosable = false,
  message = '',
  onClose = undefined,
  render = undefined,
  title = '',
  type = 'default',
}) => {
  const handleClose = (event: (MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>)): void => {
    if (!onClose) return;

    onClose(event);
  };

  const renderAlertIcon = (): ReactNode => {
    const icons = {
      default: faExclamationCircle,
      info: faInfoCircle,
      success: faCheckCircle,
      warning: faExclamationTriangle,
      danger: faTimesCircle,
    };

    const iconClasses = classNames(
      styles['type-icon'],
      styles[type],
    );

    return (
      <div className={iconClasses}>
        <FontAwesomeIcon icon={icons[type]} data-testid={`alert-icon-${type}-test-id`} />
      </div>
    );
  };

  const renderCloseIcon = (): ReactNode => {
    const closeIconClasses: string = classNames(
      styles['close-icon'],
      { [styles.clickable]: !!onClose },
    );

    const handleCloseKeyPress = (event: KeyboardEvent<HTMLSpanElement>): void => {
      if (event.keyCode === 13) handleClose(event);
    };

    return (
      <div className={closeIconClasses}>
        {closeText ? (
          /* @TODO -- replace with <Button /> component once variations exists for this use case */
          <button
            type="button"
            onClick={handleClose}
            onKeyUp={handleCloseKeyPress}
          >
            {closeText}
          </button>
        ) : (
          <FontAwesomeIcon
            icon={faTimes}
            role="button"
            data-testid="alert-close-icon-test-id"
            onClick={handleClose}
          />
        )}
      </div>
    );
  };

  const alertContainerClasses: string = classNames(
    styles.alert,
    styles[type],
    { [styles.compact]: isCompact },
    className,
  );

  return (
    <div className={alertContainerClasses} role="alert">
      {hasIcon && renderAlertIcon()}
      <div className={styles['alert-message']}>
        {render ? render() : (
          <>
            {title && <Heading as="h4" size="md" className={styles['alert-title']}>{title}</Heading>}
            {message && <p>{message}</p>}
          </>
        )}
      </div>
      {isClosable && renderCloseIcon()}
    </div>
  );
};

export default Alert;
