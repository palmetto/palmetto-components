import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cleave from 'cleave.js/react';
import * as InputMasks from './TextInputMasks';
import './TextInput.scss';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';

const getInputMask = (inputMask, availableInputMasks) => {
  if (typeof inputMask === 'string') {
    return availableInputMasks[inputMask];
  }

  return inputMask;
};
/**
 * Use TextInput to show where users can enter text based data. It does not maintain any internal state, so its value should be managed by the parent.
 */
const TextInput = ({
  autoComplete,
  autoFocus,
  className,
  id,
  inputMask,
  isDisabled,
  error,
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
    e.currentTarget.select(); // Selects input content allowing immediate edit. @TODO Confirm if desired functionality.
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const inputClasses = classNames(
    'Palmetto-TextInput',
    className,
    { error },
  );

  const getAutoCompleteValue = () => {
    if (
      !autoComplete
      || (typeof autoComplete !== 'boolean' && typeof autoComplete !== 'string')) {
      return 'off';
    }

    if (typeof autoComplete === 'boolean' && autoComplete) {
      return 'on';
    }

    return autoComplete;
  };

  const inputProps = {
    'aria-required': isRequired,
    'aria-label': label || name,
    'aria-invalid': !!error,
    autoComplete: getAutoCompleteValue(),
    autoFocus,
    className: inputClasses,
    disabled: isDisabled,
    id,
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
    inputId: id,
    labelText: label,
    hasError: !!error,
  };

  return (
    <div>
      {label && <FormLabel {...labelProps} />}
      {!inputMask ? (
        <input {...inputProps} />
      ) : (
        <Cleave {...inputProps} options={getInputMask(inputMask, InputMasks)} />
      )}
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </div>
  );
};

TextInput.propTypes = {
  /**
   * The input's 'autocomplete' attribute
   */
  autoComplete: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  /**
   * Automatically focus the input when the page is loaded
   */
  autoFocus: PropTypes.bool,
  /**
   * Custom class to be added to standard input classes.
   */
  className: PropTypes.string,
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * The input's id attribute. Used to programmatically tie the input with its label.
   */
  id: PropTypes.string.isRequired,
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

TextInput.defaultProps = {
  autoComplete: false,
  autoFocus: false,
  className: '',
  inputMask: undefined,
  isDisabled: false,
  error: false,
  isRequired: false,
  label: undefined,
  name: '',
  onBlur: undefined,
  onFocus: undefined,
  placeholder: '',
  type: 'text',
};

export default TextInput;
