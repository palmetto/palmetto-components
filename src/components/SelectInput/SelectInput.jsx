import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import './SelectInput.scss';

/**
 * Allows users to pick a value from predefined list of options.
 * Ideally, it should be used when there are more than 4 options, otherwise you should consider using a radio group instead.
 */

const SelectInput = ({
  id,
  label,
  className,
  placeholder,
  hasError,
  isDisabled,
  isRequired,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  isMulti,
  options,
  value,
}) => {
  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const inputClasses = classNames(
    'selectInput',
    { error: hasError },
  );

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    labelText: label,
    hasError: !!hasError,
  };

  return (
    <>
      <div className={classNames('Palmetto-SelectInput', className, { disabled: isDisabled })}>
        {label && <FormLabel {...labelProps} />}
        <Select
          inputId={id}
          aria-label={label || id}
          className={inputClasses}
          classNamePrefix="selectInput"
          placeholder={placeholder}
          isDisabled={isDisabled}
          isMulti={isMulti}
          autoFocus={autoFocus}
          options={options}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
        />
      </div>
      {hasError && hasError !== true && <InputValidationMessage>{hasError}</InputValidationMessage>}
    </>
  );
};

SelectInput.defaultProps = {
  label: undefined,
  className: '',
  placeholder: undefined,
  hasError: false,
  isDisabled: false,
  isRequired: false,
  onFocus: undefined,
  onBlur: undefined,
  autoFocus: false,
  isMulti: false,
  value: undefined,
};

SelectInput.propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string.isRequired,
  /**
   * Custom content to be displayed above the input.
   */
  label: PropTypes.string,
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  hasError: PropTypes.oneOfType([
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
   * Callback function to call on focus event.
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
  /**
   * The value(s) of select
   */
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default SelectInput;
