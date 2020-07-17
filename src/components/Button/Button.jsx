import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

const propTypes = {
  /**
   * A unique identifier for the button
   */
  id: PropTypes.string,
  /**
   * Button type
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Additional ClassNames to add to button
   */
  className: PropTypes.string,
  /**
   * Contents of the button
   */
  children: PropTypes.node.isRequired,
  /**
   * Disables the button, making it inoperable
   */
  isDisabled: PropTypes.bool,
  /**
   * Button takes up the full width of its parent container
   */
  isLoading: PropTypes.bool,
  /**
   * Allow the button to grow to its container's full width
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback when button is pressed
   */
  onClick: PropTypes.func,
  /**
   * Callback when button receives focus
   */
  onFocus: PropTypes.func,
  /**
   * Callback when focus leaves button
   */
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
  className: '',
  isDisabled: false,
  isLoading: undefined,
  fullWidth: undefined,
  onClick: undefined,
  tabIndex: undefined,
  onFocus: undefined,
  onBlur: undefined,
  size: 'md',
};

const Button = ({
  id,
  type,
  className,
  children,
  isDisabled,
  fullWidth,
  onClick,
  size,
  tabIndex,
  isLoading,
  onFocus,
  onBlur,
}) => {
  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames('Palmetto-Button', className, {
    loading: isLoading,
    fullWidth,
    sm: size === 'sm',
    lg: size === 'lg',
  });

  const handleClick = e => {
    if (onClick) onClick(e);
  };

  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const content = (
    <>
      {isLoading && (
        <div className="buttonLoadingIndicator">
          <svg className="spin" alt="Loading" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <title>circle</title>
            <g fill="#ffffff">
              <path
                fill="#ffffff"
                d="M8,16c-1.199,0-2.352-0.259-3.428-0.77l0.857-1.807C6.235,13.806,7.1,14,8,14c3.309,0,6-2.691,6-6 s-2.691-6-6-6S2,4.691,2,8c0,0.901,0.194,1.766,0.578,2.572l-1.806,0.859C0.26,10.354,0,9.2,0,8c0-4.411,3.589-8,8-8s8,3.589,8,8 S12.411,16,8,16z" />
            </g>
          </svg>
        </div>
      )}
      <span className="buttonLabel">{children}</span>
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
      aria-label={isLoading && 'Loading'}
      aria-busy={isLoading ? true : undefined}
    >
      {content}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
