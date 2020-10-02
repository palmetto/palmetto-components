import React, {
  FC,
  ReactNode,
  MouseEvent,
  FocusEvent,
} from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

interface ButtonProps {
  /**
   * Contents of the button.
   */
  children: ReactNode;
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
   */
  type?: 'button' | 'submit' | 'reset';
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
  size?: 'sm' | 'md' | 'lg';
  /**
   * The color variant of the button
   */
  variant?: 'primary' | 'success' | 'danger' | 'light' | 'dark';
}

const Button: FC<ButtonProps> = ({
  children,
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
}) => {
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

  const content = (
    <>
      {isLoading && (
        <Spinner variant={getSpinnerVariant()} className={styles['spinner-wrapper']} />
      )}
      <span className={styles.label}>{children}</span>
    </>
  );

  return (
    href ? (
      <a
        href={href}
        className={buttonClasses}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={tabIndex}
        {...restProps}
      >
        {content}
      </a>
    ) : (
      <button
        id={id}
        type={type} // eslint-disable-line react/button-has-type
        disabled={disabled}
        className={buttonClasses}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={tabIndex}
        aria-label={isLoading ? 'Loading' : undefined}
        aria-busy={isLoading}
        {...restProps}
      >
        {content}
      </button>
    )
  );
};

export default Button;
