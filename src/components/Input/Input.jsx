import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import Cleave from 'cleave.js/react';
import * as InputMasks from './InputMasks';
import './Input.scss';

const Input = ({
  autoComplete,
  autoFocus,
  className,
  id,
  inputMask,
  isDisabled,
  isRequired,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  type,
  value,
}) => {

  const handleChange = (e) => {
    onChange(e);
  };

  const handleFocus = (e) => {
    if (onFocus) onFocus(e);
    e.currentTarget.select();
  };

  const handleBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const inputClasses = classNames(
    className,
    'input',
    {
      // [`font-size-${size}`]: size,
      // [`font-color-${color}`]: color,
    }
  );

  const inputId = id || uuid();

  const getInputMask = () => {
    if (!inputMask) return undefined;

    if (typeof inputMask === 'string') {
      return InputMasks[inputMask];
    } else {
      return inputMask;
    }
  };

  const renderInput = () => {
    const inputProps = {
      autoComplete,
      autoFocus,
      className: inputClasses,
      disabled: isDisabled,
      id: inputId,
      name,
      onBlur: handleBlur,
      onChange: handleChange,
      onFocus: handleFocus,
      placeholder,
      type,
      value,
    };

    return !getInputMask() ? <input {...inputProps} /> : <Cleave {...inputProps} options={getInputMask()} />;
  };

  const renderLabel = () => (
    <label className="label" htmlFor={inputId}>
      {label}{isRequired && <span className="font-color-danger font-size-sm">&nbsp;*</span>}
    </label>
  );

  return (
    <>
      {label && renderLabel()}
      {renderInput()}
    </>
  );
};

Input.propTypes = {
  /**
   * The input's 'autocomplete' attribute
   */
  autoComplete: PropTypes.oneOf(['on', 'off']),
  /**
   * The input's 'autocomplete' attribute
   */
  autoFocus: PropTypes.bool,
  /**
   * Custom class to be added to standard input classes.
   */
  className: PropTypes.string,
  /**
   * The input's id attribute. We will use this to programmatically tie the input with its label.
   */
  id: PropTypes.string,
  /**
   * An options object to mask the input appearance. See https://github.com/nosir/cleave.js for options.
   */
  inputMask: PropTypes.oneOfType([
    PropTypes.oneOf(['phone', 'creditCard']),
    PropTypes.object,
  ]),
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
   * The input's 'name' attribute
   */
  name: PropTypes.string,
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
  autoComplete: 'off',
  autoFocus: false,
  className: '',
  id: undefined,
  inputMask: undefined,
  isDisabled: false,
  isRequired: false,
  label: undefined,
  name: '',
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  type: 'text'
};

export default Input;