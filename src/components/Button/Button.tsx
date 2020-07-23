import React, { FC } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import styles from './Button.module.scss';

interface Props {
  /**
   * Contents of the button
   */
  children: React.ReactNode;
  /**
    * A unique identifier for the button
    */
  id?: string;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Disables the button, making it inoperable
   */
  isDisabled?: boolean;
  /**
   * Additional ClassNames to add to button
   */
  className?: string;
  /**
   * Callback when button is pressed
   */
  fullWidth?: boolean;
  /**
   * Specify the tabIndex of the button
   */
  tabIndex?: number;
  /**
   * Button takes up the full width of its parent container
   */
  isLoading?: boolean;
  /**
   * Callback when button is pressed
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Callback when button receives focus
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * Callback when focus leaves button
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * The size of the button
   */
  size?: 'sm' | 'md' | 'lg';
};

const Button: FC<Props> = ({
  id,
  type = 'button',
  className = '',
  children,
  isDisabled = false,
  fullWidth,
  onClick,
  size = 'md',
  tabIndex,
  isLoading,
  onFocus,
  onBlur,
}) => {
  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames(
    styles.button,
    className,
    {
      [styles.loading]: isLoading,
      [styles.fullWidth]: fullWidth,
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
        <Spinner color="white" className={styles.spinnerWrapper} />
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

Button.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  tabIndex: PropTypes.number,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Button;
