import React, { ChangeEvent, FocusEvent } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import FormLabel from '../FormLabel/FormLabel';
import './CheckboxInput.scss';

/**
 * Used to allow users to make a range of selections (zero, one or many).
 */

const propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string.isRequired,
  /**
   * Additional classes to add
   */
  className: PropTypes.string.isRequired,
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  /**
   * The checkbox input "checked" attribute
   */
  isChecked: PropTypes.bool.isRequired,
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled: PropTypes.bool.isRequired,
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired: PropTypes.bool.isRequired,
  /**
   * Callback function when input is blurred.
   */
  onBlur: PropTypes.func.isRequired,
  /**
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback function when input is focused
   */
  onFocus: PropTypes.func.isRequired,
  /**
   * Custom content to be displayed to right of checkbox. Can be any valid node/tree, anchors, etc.
   */
  label: PropTypes.node.isRequired,
};

const CheckboxInput: React.FC<InferProps<typeof propTypes>> = ({
  id,
  className,
  error,
  isChecked,
  isDisabled,
  isRequired,
  onBlur,
  onChange,
  onFocus,
  label,
}) => {
  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
  };

  return (
    <>
      <div className={classNames('Palmetto-CheckboxInput', className, { isDisabled })}>
        <input
          aria-invalid={!!error}
          aria-label={label}
          aria-labelledby={label ? `${id}Label` : null}
          id={id}
          checked={isChecked}
          disabled={isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          type="checkbox"
          className="input"
        />
        {label && <FormLabel {...{
          isFieldRequired: isRequired,
          inputId: id,
          labelText: label,
          hasError: !!error,
        }} />}
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

CheckboxInput.propTypes = propTypes;

CheckboxInput.defaultProps = {
  className: '',
  error: false,
  isChecked: false,
  isDisabled: false,
  isRequired: false,
  onBlur: undefined,
  onFocus: undefined,
};

export default CheckboxInput;
