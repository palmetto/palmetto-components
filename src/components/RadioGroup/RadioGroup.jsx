import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import './RadioGroup.scss';

/**
 * Allows users to pick a value from predefined list of options.
 * Ideally, it should be used when there are less than 5 options,
 * otherwise you should consider using SelectInput instead.
 */

const propTypes = {
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  groupLabel: PropTypes.string.isRequired,
  /**
   * Radio group 'name'
   */
  groupName: PropTypes.string.isRequired,
  /**
   * Callback function to call on change event.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Options for radio group
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool,
  })).isRequired,
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Mark the radio group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * If the radio group should be disabled and not focusable
   */
  isDisabled: PropTypes.bool,
  /**
   * Determines if radio group is required or not. (Label will have an asterisk if required)
   */
  isRequired: PropTypes.bool,
  /**
   * Callback function to call on focus event.
   */
  onFocus: PropTypes.func,
  /**
   * Callback function to call on blur event.
   */
  onBlur: PropTypes.func,
  /**
   * The value of selected radio input
   */
  selectedOption: PropTypes.string,
};

const defaultProps = {
  className: '',
  error: false,
  isDisabled: false,
  isRequired: false,
  onFocus: undefined,
  onBlur: undefined,
  selectedOption: undefined,
};

const RadioGroup = ({
  groupLabel,
  groupName,
  className,
  placeholder,
  error,
  hideLabel,
  isDisabled,
  isRequired,
  onChange,
  onFocus,
  onBlur,
  autoFocus,
  isMulti,
  options,
  selectedOption,
}) => {
  const handleChange = e => {
    if (onChange) onChange(e);
  };

  // const handleFocus = e => {
  //   if (onFocus) onFocus(e);
  // };

  // const handleBlur = e => {
  //   if (onBlur) onBlur(e);
  // };

  const groupClasses = classNames(
    className,
    'radioGroup',
    { error },
  );

  const inputClasses = classNames(
    'radioInput',
    { error },
  );

  return (
    <>
      <div className={classNames('Palmetto-RadioGroup', groupClasses)}>
        {options.map(option => {
          const labelProps = {
            id: option.id,
            labelText: option.label,
          };

          return (
            <>
              <input
                type="radio"
                name={name}
                className={inputClasses}
                value={option.value}
                checked={selectedOption && selectedOption === option.value}
                onChange={handleChange}
                disabled={option.isDisabled}
              />
              {option.label && !hideLabel && <FormLabel {...labelProps} />}
            </>
          );
        })}
      </div>
      {error && typeof error !== 'boolean' && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
