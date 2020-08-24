import React, { FC } from 'react';
import classNames from 'classnames';
import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

interface ButtonProps {
  /**
   * Contents of the button
   */
  children: React.ReactNode;
  /**
   * Additional ClassNames to add to button
   */
  className?: string;
  /**
   * Make button take full width of container.
   */
  fullWidth?: boolean;
  /**
   * A unique identifier for the button
   */
  id?: string;
  /**
   * Disables the button, making it inoperable
   */
  isDisabled?: boolean;
  /**
   * Button takes up the full width of its parent container
   */
  isLoading?: boolean;
  /**
   * Specify the tabIndex of the button
   */
  tabIndex?: number;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Callback when button is pressed
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Callback when focus leaves button
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * Callback when button receives focus
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * The size of the button
   */
  size?: 'sm' | 'md' | 'lg';
}

const Button: FC<ButtonProps> = ({
  children,
  className = '',
  fullWidth = false,
  id = undefined,
  isDisabled = false,
  isLoading = false,
  tabIndex = undefined,
  type = 'button',
  onClick = undefined,
  onFocus = undefined,
  onBlur = undefined,
  size = 'md',
}) => {
  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames(
    styles.button,
    className,
    {
      [styles.loading]: isLoading,
      [styles['full-width']]: fullWidth,
      [styles.sm]: size === 'sm',
      [styles.lg]: size === 'lg',
    },
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (onBlur) onBlur(e);
  };

  const content = (
    <>
      {isLoading && (
        <Spinner color="white" className={styles['spinner-wrapper']} />
      )}
      <span className={styles.label}>{children}</span>
    </>
  );

  return (
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
    >
      {content}
    </button>
  );
};

export default Button;
