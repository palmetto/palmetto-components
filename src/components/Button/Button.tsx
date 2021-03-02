import React, {
  FC, ReactNode, MouseEvent, FocusEvent, forwardRef, createElement,
} from 'react';
import classNames from 'classnames';
import { IconName } from '../../types';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import getElementType from '../../lib/getElementType';
import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'success' | 'danger' | 'light' | 'dark';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export interface ButtonProps {
  /**
   * Contents of the button.
   */
  children?: ReactNode;
  /**
   * HTML element that will be rendered.
   */
  as?: 'button' | 'a';
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * Make button take full width of container.
   */
  fullWidth?: boolean;
  /**
   * Name of the icon to include before the button text
   */
  iconPrefix?: IconName;
  /**
   * Name of the icon to include after the button text
   */
  iconSuffix?: IconName;
  /**
   * A unique identifier for the button.
   */
  id?: string;
  /**
   * URL to navigate to when clicked. Passing this attribute automatically
   * renders an anchor <a> tag, NOT a <button> element.
   */
  href?: string;
  /**
   * Disables the button, making it inoperable.
   */
  isDisabled?: boolean;
  /**
   * Button takes up the full width of its parent container.
   */
  isLoading?: boolean;
  /**
   * Renders an outline version of the button. With a transparent background.
   */
  isOutlined?: boolean;
  /**
   * Render the button with no styles of its own, other than a pointer cursor.
   */
  isNaked?: boolean;
  /**
   * Prop reserved for when component is wrapped by `<Link>` from react-router.
   */
  navigate?: () => void;
  /**
   * Callback when Button is pressed.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Callback when focus leaves Button.
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Callback when Button receives focus.
   */
  onFocus?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Specify the tabIndex of the button.
   */
  tabIndex?: number;
  /**
   * Usefull when using button as an anchor tag.
   */
  target?: string;
  /**
   * The Button's type.
   * NOTE: this is not restricted to button types since we allow
   * rendering a button as a different HTML element than a button (`<a>` or `<input>`).
   */
  type?: 'submit' | 'reset' | 'button' | string;
  /**
   * The size of the button.
   */
  size?: ButtonSize;
  /**
   * The color variant of the button
   */
  variant?: ButtonVariant;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const Button: FC<ButtonProps> = forwardRef(
  (
    {
      children = undefined,
      as = 'button',
      className = '',
      fullWidth = false,
      id = undefined,
      href = undefined,
      iconPrefix = undefined,
      iconSuffix = undefined,
      isDisabled = false,
      isLoading = false,
      isOutlined = false,
      isNaked = false,
      navigate = undefined,
      onClick = undefined,
      onFocus = undefined,
      onBlur = undefined,
      tabIndex = undefined,
      target = undefined,
      type = 'button',
      size = 'md',
      variant = 'primary',
      ...restProps
    },
    ref,
  ) => {
    const disabled = isLoading || isDisabled;

    const buttonClasses = classNames(styles.button, className, {
      [styles.outline]: isOutlined && !isNaked,
      [styles.loading]: isLoading,
      [styles.naked]: isNaked,
      [styles[variant]]: variant && !isNaked,
      [styles[size]]: size && !isNaked,
      [styles['full-width']]: fullWidth,
    });

    const isModifiedEvent = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => (
      !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    );

    /**
     * Due to react-router's handling of custom components used in RR <Link>
     * we must add this validation that ensures the router will execute the passed `navigate`
     * prop, thus navigating the user without triggering a refresh.
     *
     * SOURCES:
     *    https://github.com/ReactTraining/react-router/issues/7727
     *    https://github.com/ReactTraining/react-router/issues/7761
     * */
    const handleClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (onClick) onClick(event);

      if (
        !event.defaultPrevented// onClick prevented default
        && event.button === 0 // ignore everything but left clicks
        && (!target || target === '_self') // let browser handle "target=_blank" etc.
        && !isModifiedEvent(event) // ignore clicks with modifier keys
        && navigate
      ) {
        event.preventDefault();
        navigate();
      }
    };

    const handleFocus = (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (onFocus) onFocus(event);
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (onBlur) onBlur(event);
    };

    const getSpinnerVariant = () => {
      if (isOutlined) return variant;

      return variant === 'light' ? 'grey' : 'white';
    };

    const buttonContent = iconPrefix || iconSuffix ? (
      <Box
        display="inline-flex"
        direction="row"
        alignItems="center"
        childGap={size === 'xs' ? '2xs' : 'xs'}
      >
        {isLoading && (
          <Spinner variant={getSpinnerVariant()} className={styles['spinner-wrapper']} />
        )}
        {iconPrefix && (
        <Icon
          className={styles.label}
          name={iconPrefix}
          aria-hidden="true"
          focusable="false"
          data-testid="prefixIcon"
        />
        )}
        {children && <span className={styles.label}>{children}</span>}
        {iconSuffix && (
        <Icon
          className={styles.label}
          name={iconSuffix}
          aria-hidden="true"
          focusable="false"
          data-testid="suffixIcon"
        />
        )}
      </Box>
    ) : (
      <>
        {isLoading && (
        <Spinner variant={getSpinnerVariant()} className={styles['spinner-wrapper']} />
        )}
        {children && <span className={styles.label}>{children}</span>}
      </>
    );

    const buttonElement = getElementType(Button, { as });

    return createElement(buttonElement, {
      id,
      href,
      className: buttonClasses,
      children: buttonContent,
      disabled,
      onBlur: handleBlur,
      onClick: handleClick,
      onFocus: handleFocus,
      ref,
      type: href ? null : type,
      tabIndex,
      ...restProps,
    });
  },
);

export default Button;
