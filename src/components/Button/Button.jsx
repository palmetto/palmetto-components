import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import './Button.scss';

const Button = ({
  id,
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
  const inputId = id || uuid();

  const disabled = isLoading || isDisabled;

  const buttonClasses = classNames('Palmetto-Button', className, {
    'loading': isLoading,
    'fullWidth': fullWidth,
  });

  const handleClick = e => {
    onClick(e);
  };

  const handleFocus = e => {
    onFocus(e);
  };

  const handleBlur = e => {
    onBlur(e);
  };

  const content = (
    <>
      <span className="buttonLoadingIndicator">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </span>
      <span className="buttonLabel">{children}</span>
    </>
  );

  return (
    <button
      disabled={disabled}
      id={inputId}
      type="button"
      className={buttonClasses}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={tabIndex}
      aria-busy={isLoading ? true : undefined}
    >
      {content}
    </button>
  );
};

Button.defaultProps = {
  id: undefined,
  className: '',
  isDisabled: false,
  isLoading: undefined,
  fullWidth: undefined,
  tabIndex: undefined,
  onFocus: undefined,
  onBlur: undefined,
};

Button.propTypes = {
  /**
   * A unique identifier for the button
   */
  id: PropTypes.string,
  /**
   * Additional ClassNames to add to button
   */
  className: PropTypes.string,
  /**
   * Contents of the button
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  /**
   * Disables the button, making it inoperable
   */
  isDisabled: PropTypes.bool,
  /**
   * Button takes up the full width of its parent container
   */
  isLoading: PropTypes.bool,
  /**
   * Callback when button receives focus
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback when button is pressed
   */
  onClick: PropTypes.func.isRequired,
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

export default Button;
