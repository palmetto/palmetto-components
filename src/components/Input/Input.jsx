import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import './Input.scss';

const Input = (props) => {
  const {
    className,
    id,
    isDisabled,
    label,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    type,
    value,
  } = props;

  const handleChange = (event) => {
    onChange(event);
  }

  const handleFocus = (event) => {
    if (onFocus) onFocus(event);
  }

  const handleBlur = (event) => {
    if (onBlur) onBlur(event);
  }

  const classes = classNames(
    className,
    'input',
    // { @TODO Placeholder until size/color props are added.
    //   [`font-size-${size}`]: size,
    //   [`font-color-${color}`]: color,
    // }
  );

  const inputId = id || uuid();

  const renderInput = () => (
    <input
      className={classes}
      disabled={isDisabled}
      id={inputId}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );

  const renderLabel = () => {
    if (!label) return;

    return (
      <label className="label" htmlFor={inputId}>
        {label}<span className="font-color-danger font-size-sm">&nbsp;*</span>
      </label>
    );
  }

  return (
    label ? (
      <>
        {renderLabel()}
        {renderInput()}
      </>
    ) : (
      <>
        {renderInput()}
      </>
    )
  );
};

Input.propTypes = {
  /**
   * Custom class to be added to standard input classes.
   */
  className: PropTypes.string,
  /**
   * The input's id attribute. We will use this to programmatically tie the input with its label.
   */
  id: PropTypes.string,
  /**
   * The input's disabled attribute
   */
  isDisabled: PropTypes.bool,
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired: PropTypes.bool,
  /**
   * Value for HTML <label> tag
   */
  label: PropTypes.string,
  /**
   * Callback function to call on blur event.
   */
  onBlur: PropTypes.func,
  /**
   * Callback function to call on change event.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback function to call on focus event..
   */
  onFocus: PropTypes.func,
  /**
   * The input placeholder attribute
   */
  placeholder: PropTypes.string,
  /**
   * The input 'type' value. Defaults to type 'text'.
   */
  type: PropTypes.oneOf(['text', 'password', 'email', 'tel', 'url', 'search']),
  /**
   * The text value of the input. Required since our Input is a controlled component.
   */
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  className: '',
  id: undefined,
  isDisabled: false,
  isRequired: false,
  label: undefined,
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  type: 'text',
};

export default Input;