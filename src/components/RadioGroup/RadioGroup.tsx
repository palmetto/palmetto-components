import React, { ChangeEvent, FocusEvent, FC } from 'react';
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

interface Props {
  /**
   * Radio group name
   */
  name: string,
  /**
   * Callback function to call on change event
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Options for radio group
   */
  options: [{
    id: string,
    value: string,
    label: string,
    disabled?: boolean,
  }],
  /**
   * Additional classes to add
   */
  className?: string,
  /**
   * Description to be displayed below the title, and above the RadioGroup.
   */
  description?: React.ReactNode,
  /**
   * Mark the radio group as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: boolean | string | React.ReactNode,
  /**
   * If the radio group should be disabled and not focusable
   */
  isDisabled?: boolean,
  /**
   * Determines if radio group is required or not. (Label will have an asterisk if required)
   */
  isRequired?: boolean,
  /**
   * Callback function to call on blur event
   */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * Callback function to call on focus event
   */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  /**
   * The value of selected radio input
   */
  selectedOption?: string,
  /**
   * Title to be displayed above the RadioGroup
   */
  title?: React.ReactNode,
};

const propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })).isRequired,
  className: PropTypes.string,
  description: PropTypes.node,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]),
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  selectedOption: PropTypes.string,
  title: PropTypes.node,
};

// const defaultProps = {
//   className: '',
//   description: undefined,
//   error: false,
//   isDisabled: false,
//   isRequired: false,
//   onBlur: undefined,
//   onFocus: undefined,
//   selectedOption: undefined,
//   title: undefined,
// };

const RadioGroup: FC<Props> = ({
  className,
  description,
  error,
  isDisabled = false,
  isRequired = false,
  name,
  onBlur,
  onChange,
  onFocus,
  options,
  title,
  selectedOption,
}) => {
  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    if (onBlur) onBlur(event);
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

export default RadioGroup;
