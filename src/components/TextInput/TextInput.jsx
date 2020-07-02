import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import Cleave from 'cleave.js/react';
import * as InputMasks from './TextInputMasks';
import './TextInput.scss';
import FormLabel from '../FormLabel/FormLabel';

const getInputMask = (inputMask, availableInputMasks) => {
  if (typeof inputMask === 'string') {
    return availableInputMasks[inputMask];
  }

  return inputMask;
};

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
  const handleChange = e => {
    onChange(e);
  };

  const handleFocus = e => {
    if (onFocus) onFocus(e);
    e.currentTarget.select(); // Selects input content allowing immediate edit. @TODO -- Confirm if desired functionality.
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const inputClasses = classNames(
    className,
    'input',
  );

  const inputId = id || uuid();

  const inputProps = {
    'aria-required': isRequired,
    'aria-label': label || name,
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

  const labelProps = {
    isFieldRequired: isRequired,
    inputId,
    labelText: label,
  };

  return (
    <>
      {label && <FormLabel {...labelProps} />}
      {!inputMask ? (
        <input {...inputProps} />
      ) : (
        <Cleave {...inputProps} options={getInputMask(inputMask, InputMasks)} />
      )}
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
   * Pass a value to apply a mask to the input value.
   * Can be one of the existing present strings, or a custom object with options
   * For options object formats See https://github.com/nosir/cleave.js
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
  type: 'text',
};

export default Input;
