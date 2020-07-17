import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import './RadioGroup.scss';

/**
 * Allows users to pick a single option from a predefined list of two or more options.
 * Ideally, it should be used when there are less than 5 options,
 * otherwise you should consider using SelectInput instead.
 */

const propTypes = {
  /**
   * Radio group 'name'
   */
  name: PropTypes.string.isRequired,
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
    disabled: PropTypes.bool,
  })).isRequired,
  /**
   * Title to be displayed above the RadioGroup.
   */
  title: PropTypes.node,
  /**
   * Description to be displayed below the title, and above the RadioGroup.
   */
  description: PropTypes.node,
  /**
   * Additional classes to add
   */
  className: PropTypes.string,
  /**
   * Mark the radio group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
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
  title: undefined,
  description: undefined,
  className: '',
  error: false,
  isDisabled: false,
  isRequired: false,
  onFocus: undefined,
  onBlur: undefined,
  selectedOption: undefined,
};

const RadioGroup = ({
  title,
  description,
  name,
  className,
  error,
  isDisabled,
  isRequired,
  onChange,
  onFocus,
  onBlur,
  options,
  selectedOption,
}) => {
  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const groupClasses = classNames(
    'radioGroup',
    className,
    { error },
  );

  const legendClasses = classNames(
    'legend',
    { error },
  );

  return (
    <div className={classNames('Palmetto-RadioGroup', groupClasses)}>
      <fieldset className="fieldset">
        {(title || description) && (
          <legend className={legendClasses}>
            {title}
            {isRequired && <span className="font-size-sm">&nbsp;*</span>}
            {description && <div className="description">{description}</div>}
          </legend>
        )}
        <div className="options">
          {options.map(option => {
            const labelProps = {
              inputId: option.id,
              labelText: option.label,
              isDisabled: isDisabled || option.disabled,
              displayInline: true,
              hasError: !!error,
            };

            return (
              <div className="option" key={option.id}>
                <input
                  id={option.id}
                  type="radio"
                  name={name}
                  className="radioInput"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={onChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  disabled={isDisabled || option.disabled}
                />
                {option.label && <FormLabel {...labelProps} />}
              </div>
            );
          })}
        </div>
      </fieldset>
      {error && typeof error !== 'boolean' && <InputValidationMessage>{error}</InputValidationMessage>}
    </div>
  );
};

RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;

export default RadioGroup;
