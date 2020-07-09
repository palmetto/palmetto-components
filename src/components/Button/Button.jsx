import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';
import { ReactComponent as LoadingIndicator } from '../../images/loading.svg';

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

Button.defaultProps = {
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

Button.propTypes = {
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

export default Button;
