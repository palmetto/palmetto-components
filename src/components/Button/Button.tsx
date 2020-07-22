import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types';

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
<<<<<<< HEAD:src/components/Button/Button.jsx
  onBlur: PropTypes.func,
  /**
   * The size of the button
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Specify the tabIndex of the button
   */
  tabIndex: PropTypes.number,
};

const defaultProps = {
  id: undefined,
  type: 'button',
  className: undefined,
  isDisabled: false,
  isLoading: undefined,
  fullWidth: undefined,
  onClick: undefined,
  tabIndex: undefined,
  onFocus: undefined,
  onBlur: undefined,
  size: 'md',
=======
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
>>>>>>> develop:src/components/Button/Button.tsx
};

const Button: FC<Props> = ({
  id,
  type = 'button',
  className = '',
  children,
  isDisabled = false,
  fullWidth,
  onClick,
  size,
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
<<<<<<< HEAD:src/components/Button/Button.jsx
        <Spinner color="white" className={styles.spinnerWrapper} />
=======
        <div className="buttonLoadingIndicator">
          <svg className="spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <title>circle</title>
            <g fill="#ffffff">
              <path
                fill="#ffffff"
                d="M8,16c-1.199,0-2.352-0.259-3.428-0.77l0.857-1.807C6.235,13.806,7.1,14,8,14c3.309,0,6-2.691,6-6 s-2.691-6-6-6S2,4.691,2,8c0,0.901,0.194,1.766,0.578,2.572l-1.806,0.859C0.26,10.354,0,9.2,0,8c0-4.411,3.589-8,8-8s8,3.589,8,8 S12.411,16,8,16z" />
            </g>
          </svg>
        </div>
>>>>>>> develop:src/components/Button/Button.tsx
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
};

export default Button;
