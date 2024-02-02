import React, {
  FC, ReactNode, MouseEvent, KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { Heading } from '../Heading/Heading';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import styles from './Alert.module.scss';
import { AlertVariant } from './Alert.types';
import { ALERT_ICONS_MAP } from './Alert.constants';

export interface AlertProps {
  /**
   * Custom class to apply to the alert.
   */
  className?: string;
  /**
   * Custom text to use as a close button.
   */
  closeText?: string;
  /**
   * Whether the alert as an icon that corresponds to its variant (Success, warning, etc.).
   */
  hasIcon?: boolean;
  /**
   * Whether the alert can be closed by the user. If `true` it will render
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
   * Whether the alert can be closed by the user. If `true` it will render
   * the 'close' icon on the right hand side of the alert.
   */
  onClose?: (event: MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>) => void;
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
  variant?: AlertVariant;
    /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}
export const Alert: FC<AlertProps> = ({
  className = '',
  closeText = '',
  hasIcon = false,
  isCompact = false,
  isClosable = false,
  message = '',
  onClose = undefined,
  render = undefined,
  title = '',
  variant = 'default',
  ...restProps
}) => {
  const handleClose = (
    event: MouseEvent<HTMLOrSVGElement> | KeyboardEvent<HTMLSpanElement>,
  ): void => {
    if (!onClose) return;

    onClose(event);
  };

  const renderAlertIcon = (): ReactNode => (
    <Box fontSize="lg" className={styles[`alert__icon__${variant}`]}>
      <Icon
        name={ALERT_ICONS_MAP[variant].icon}
        data-testid={`alert-icon-${variant}-test-id`}
      />
    </Box>
  );

  const renderCloseIcon = (): ReactNode => {
    const handleCloseKeyPress = (event: KeyboardEvent<HTMLSpanElement>): void => {
      if (event.keyCode === 13) handleClose(event);
    };

    return (
      <Box margin="0 0 0 auto" color="grey-500" className={styles['close-icon']}>
        <button type="button" onClick={handleClose} onKeyUp={handleCloseKeyPress}>
          {closeText || <Icon name="remove" data-testid="alert-close-icon-test-id" />}
        </button>
      </Box>
    );
  };

  const alertContainerClasses: string = classNames(
    styles[`alert__${variant}`],
    styles.alert,
    className,
  );

  return (
    <Box
      alignItems="flex-start"
      gap="sm"
      className={alertContainerClasses}
      direction="row"
      padding={isCompact ? 'xs' : 'md'}
      radius="md"
      role="alert"
      fontSize="sm"
      {...restProps}
    >
      {hasIcon && renderAlertIcon()}
      <div>
        {render ? (
          render()
        ) : (
          <Box display="block" childGap={message && title ? '2xs' : undefined}>
            {title && (
              <Heading as="h4" size="md">
                {title}
              </Heading>
            )}
            {message && (typeof message === 'string' ? <p>{message}</p> : message)}
          </Box>
        )}
      </div>
      {isClosable && renderCloseIcon()}
    </Box>
  );
};
