import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import './SelectInput.scss'; // Not a module because it requires :global styles applied to react-select

/**
 * Allows users to pick a value from predefined list of options.
 * Ideally, it should be used when there are more than 4 options,
 * otherwise you should consider using a radio group instead.
 */

const propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string.isRequired,
  /**
   * Visually hide the label
   */
  hideLabel: PropTypes.bool,
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: PropTypes.string.isRequired,
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
   * Select 'name' attribute
   */
  name: PropTypes.string,
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

const defaultProps = {
  className: undefined,
  placeholder: undefined,
  error: false,
  hideLabel: false,
  isDisabled: false,
  isRequired: false,
  name: '',
  onFocus: undefined,
  onBlur: undefined,
  autoFocus: false,
  isMulti: false,
  value: undefined,
};

const SelectInput = ({
  id,
  label,
  className,
  placeholder,
  error,
  hideLabel,
  isDisabled,
  isRequired,
  name,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  isMulti,
  options,
  value,
}) => {
  const handleChange = values => {
    const simulatedEventPayload = {
      target: {
        name,
        value: values,
      },
    };

    onChange(simulatedEventPayload);
  };

  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const wrapperClasses = classNames(
    'select-input-wrapper',
    className,
    { disabled: isDisabled },
  );

  const inputClasses = classNames(
    'react-select',
    { error },
  );

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    labelText: label,
    hasError: !!error,
    className: 'm-bottom-xs',
  };

  return (
    <>
      <div className={wrapperClasses}>
        {label && !hideLabel && <FormLabel {...labelProps} />}
        <Select
          inputId={id}
          aria-label={label}
          aria-labelledby={label && !hideLabel ? `${id}Label` : null}
          className={inputClasses}
          classNamePrefix="reactSelect"
          placeholder={placeholder}
          isDisabled={isDisabled}
          isMulti={isMulti}
          name={name}
          autoFocus={autoFocus}
          options={options}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
        />
      </div>
      {error && typeof error !== 'boolean' && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default SelectInput;
