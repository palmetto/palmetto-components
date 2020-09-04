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
  faTimesCircle,
  faCheckCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Alert.module.scss';

interface AlertProps {
  /**
   * The text message or ReactNode to be rendered in the alert.
   */
  message?: string | ReactNode;
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
   * Deterimines whether the alert can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the alert.
   */
  onClose?: (event: (MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>)) => void ;
  /**
   * A render function that returns JSX if preferred over a static ReactNode or string.
   */
  render?: () => ReactNode;
  /**
   * The type/color of the alert to show.
   */
  type?: 'info' | 'success' | 'warning' | 'danger' | 'default';
}
const Alert: FC<AlertProps> = ({
  message,
  className = '',
  closeText = '',
  hasIcon = false,
  isCompact = false,
  isClosable = false,
  onClose = undefined,
  render = undefined,
  type = 'default',
}) => {
  const handleClose = (event: (MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>)): void => {
    if (!onClose) return;

    onClose(event);
  };

  const renderAlertIcon = ():ReactNode => {
    const icons = {
      default: faExclamationCircle,
      info: faExclamationCircle,
      success: faCheckCircle,
      warning: faExclamationTriangle,
      danger: faTimesCircle,
    };

    return (
      <div className={styles['type-icon']}>
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
          <span
            role="button"
            onClick={handleClose}
            onKeyUp={handleCloseKeyPress}
            tabIndex={0}
          >
            {closeText}
          </span>
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
    { [styles[type]]: !!type },
    { [styles.compact]: isCompact },
    className,
  );

  return (
    <div className={alertContainerClasses} role="alert">
      {hasIcon && renderAlertIcon()}
      <div className={styles['alert-message']}>
        {render ? render() : message}
      </div>
      {isClosable && renderCloseIcon()}
    </div>
  );
};

export default Alert;
