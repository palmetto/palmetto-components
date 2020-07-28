import React, { FocusEvent, FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, { ValueType, OptionTypeBase, FocusEventHandler } from 'react-select';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import './SelectInput.scss'; // Not a module because it requires :global styles applied to react-select

/**
 * Allows users to pick a value from predefined list of options.
 * Ideally, it should be used when there are more than 4 options,
 * otherwise you should consider using a radio group instead.
 */

interface SimulatedEventPayload {
  target: {
    name: string;
    value: ValueType<OptionTypeBase>;
  }
}

interface Props {
  /**
   * The id attribute of the input
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: SimulatedEventPayload) => void;
  /**
   * Options for dropdown list
   */
  options: {
    value: string;
    label: string;
  }[];
  /**
   * Visually hide the label
   */
  hideLabel?: boolean;
  /**
   * Additional classes to add
   */
  className?: string;
  /**
   * Placeholder
   */
  placeholder?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error?: React.ReactNode;
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired?: boolean;
  /**
   * Select 'name' attribute
   */
  name?: string;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  /**
   * Autofocus select input on render
   */
  autoFocus?: boolean;
  /**
   * Is multi select enabled
   */
  isMulti?: boolean;
  /**
   * The value(s) of select
   */
  value?: any | any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  hideLabel: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  isMulti: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

const SelectInput: FC<Props> = ({
  id,
  label,
  className,
  placeholder,
  error = false,
  hideLabel = false,
  isDisabled = false,
  isRequired = false,
  name = '',
  onChange,
  onFocus,
  onBlur,
  autoFocus = false,
  isMulti = false,
  options,
  value,
}) => {
  const handleChange = (values: ValueType<OptionTypeBase>) => {
    const simulatedEventPayload: SimulatedEventPayload = {
      target: {
        name,
        value: values,
      },
    };

    onChange(simulatedEventPayload);
  };

  const handleFocus: FocusEventHandler = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur: FocusEventHandler = e => {
    if (onBlur) onBlur(e);
  };

  const wrapperClasses = classNames(
    'selectInputWrapper',
    className,
    { disabled: isDisabled },
  );

  const inputClasses = classNames(
    'reactSelect',
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
          aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
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

export default SelectInput;
