import React, {
  FC,
  ReactNode,
  MouseEvent,
  FocusEvent,
  forwardRef,
  createElement,
} from 'react';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';
import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'success' | 'danger' | 'light' | 'dark';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps {
  /**
   * Contents of the button.
   */
  children?: ReactNode;
  /**
   * HTML element that will be rendered.
   */
  as?: 'button' | 'a' | 'input';
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * Make button take full width of container.
   */
  fullWidth?: boolean;
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
   * Specify the tabIndex of the button.
   */
  tabIndex?: number;
  /**
   * The Button's type.
   * NOTE: this is not restricted to button types since we allow
   * rendering a button as a different HTML element than a button (`<a>` or `<input>`).
   */
  type?: 'submit' | 'reset' | 'button' | string;
  /**
   * Callback when Button is pressed.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Callback when focus leaves Button.
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  /**
   * Callback when Button receives focus.
   */
  onFocus?: (event: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
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

const Button: FC<ButtonProps> = forwardRef((
  {
    children = null,
    as = 'button',
    className = '',
    fullWidth = false,
    id = undefined,
    href = undefined,
    isDisabled = false,
    isLoading = false,
    isOutlined = false,
    tabIndex = undefined,
    type = 'button',
    onClick = undefined,
    onFocus = undefined,
    onBlur = undefined,
    size = 'md',
    variant = 'primary',
    ...restProps
  },
  ref,
) => {
  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames(
    styles.button,
    styles[variant],
    styles[size],
    className,
    {
      [styles.outline]: isOutlined,
      [styles.loading]: isLoading,
      [styles['full-width']]: fullWidth,
    },
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(event);
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

  const buttonContent = (
    <>
      {isLoading && (
        <Spinner variant={getSpinnerVariant()} className={styles['spinner-wrapper']} />
      )}
      <span className={styles.label}>{children}</span>
    </>
  );

  const buttonElement = getElementType(Button, { as });

  return createElement(buttonElement, {
    id,
    href,
    className: buttonClasses,
    ...children && { children: buttonContent },
    disabled,
    onBlur: handleBlur,
    onClick: handleClick,
    onFocus: handleFocus,
    ref,
    type,
    tabIndex,
    ...restProps,
  });
});

export default Button;
