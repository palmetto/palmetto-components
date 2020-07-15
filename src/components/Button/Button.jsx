import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';
import { ReactComponent as LoadingIndicator } from '../../images/loading.svg';

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
};

const Button = ({
  id,
  type,
  className,
  children,
  isDisabled,
  fullWidth,
  onClick,
  tabIndex,
  isLoading,
  onFocus,
  onBlur,
}) => {
  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames('Palmetto-Button', className, {
    loading: isLoading,
    fullWidth,
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
          <LoadingIndicator className="img" alt="Loading..." />
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
