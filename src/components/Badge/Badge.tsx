import React, {
  FC,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faExclamationTriangle,
  faUser,
  faInfoCircle,
  faTimesCircle,
  faCheckCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Badge.module.scss';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
  /**
   * Custom class to apply to the badge container div.
   */
  className?: string;
  /**
   * Custom text to use as a close button.
   */
  closeText?: string;
  /**
   * Whether the badge as an icon that corresponds to its variant (Success, warning, etc.).
   */
  hasIcon?: boolean;
  /**
   * Deterimines whether the badge can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the badge.
   */
  isClosable?: boolean;
  /**
   * The text message or ReactNode to be rendered in the badge.
   */
  message?: string | ReactNode;
  /**
   * Deterimines whether the badge can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the badge.
   */
  onClose?: (event: (MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>)) => void;
  /**
   * A render function that returns JSX if preferred over a static ReactNode or string.
   */
  render?: () => ReactNode;
  /**
   * The size of the button.
   */
  size?: BadgeSize;
  /**
   * The type/color of the badge to show.
   */
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'default';
}

const Badge: FC<BadgeProps> = ({
  className = '',
  closeText = '',
  hasIcon = false,
  isClosable = false,
  message = '',
  onClose = undefined,
  render = undefined,
  variant = 'default',
  size = 'md',
}) => {
  const handleClose = (event: (MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>)): void => {
    if (!onClose) return;

    onClose(event);
  };

  const renderBadgeIcon = (): ReactNode => {
    const icons = {
      default: faExclamationCircle,
      info: faInfoCircle,
      tertiary: faUser,
      success: faCheckCircle,
      warning: faExclamationTriangle,
      danger: faTimesCircle,
    };

    const iconClasses = classNames(
      styles['type-icon'],
      styles[variant],
      styles[size]
    );

    return (
      <div className={iconClasses}>
        <FontAwesomeIcon icon={icons[variant]} data-testid={`badge-icon-${variant}-test-id`} />
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
        <button
          type="button"
          onClick={handleClose}
          onKeyUp={handleCloseKeyPress}
        >
          {closeText || <FontAwesomeIcon icon={faTimes} data-testid="badge-close-icon-test-id" />}
        </button>
      </div>
    );
  };

  const badgeContainerClasses: string = classNames(
    styles.badge,
    styles[variant],
    styles[size],
    className,
  );

  return (
    <div className={badgeContainerClasses}>
      {hasIcon && renderBadgeIcon()}
      <div className={styles['badge-message']}>
        {render ? render() : (
          message && (
            typeof message === 'string' ? <p>{message}</p> : message
          )
        )}
      </div>
      {isClosable && renderCloseIcon()}
    </div>
  );
};

export default Badge;