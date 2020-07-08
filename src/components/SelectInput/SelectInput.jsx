import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import Select from 'react-select'
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import './SelectInput.scss';

const SelectInput = ({
  id,
  label,
  className,
  error,
  isDisabled,
  isRequired,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  isMulti,
  options,
}) => {
  const inputId = id || uuid();

  const handleChange = e => {
    onChange(e);
  };

  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const inputClasses = classNames(
    'Palmetto-SelectInput',
    className,
    { error },
  );

  const labelProps = {
    isFieldRequired: isRequired,
    inputId,
    labelText: label,
    hasError: !!error,
  };

  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      <div className={classNames('Palmetto-SelectInput', className, { isDisabled })}>
        {label && <FormLabel {...labelProps} />}
        <Select
          className={inputClasses}
          autoFocus={autoFocus}
          options={selectOptions}
        />
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

SelectInput.defaultProps = {
  id: undefined,
  className: '',
  error: false,
  isDisabled: false,
  isRequired: false,
  onFocus: undefined,
  onBlur: undefined,
  autoFocus: false,
  isMulti: false,
};

SelectInput.propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string,
  /**
   * Custom content to be displayed to right of checkbox. Can be any valid node/tree, anchors, etc.
   */
  label: PropTypes.node.isRequired,
  /**
   * Additional classes to add
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
   * If the input should be disabled and not focusable
   */
  isDisabled: PropTypes.bool,
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired: PropTypes.bool,
  /**
   * Callback function to call on change event.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback function to call on focus event..
   */
  onFocus: PropTypes.func,
  /**
   * Callback function to call on blur event.
   */
  onBlur: PropTypes.func,
  /**
   * Autofocus select input on render
   */
  autoFocus: PropTypes.bool,
  /**
   * Is multi select enabled
   */
  isMulti: PropTypes.bool,
  /**
   * Options for dropdown list
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default SelectInput;
