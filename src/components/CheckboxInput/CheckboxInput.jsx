import React from 'react';
import PropTypes from 'prop-types';
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
   * The checkbox input "checked" attribute
   */
  isChecked: PropTypes.bool,
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled: PropTypes.bool,
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired: PropTypes.bool,
  /**
   * Callback function when input is blurred.
   */
  onBlur: PropTypes.func,
  /**
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback function when input is focused
   */
  onFocus: PropTypes.func,
  /**
   * Custom content to be displayed to right of checkbox. Can be any valid node/tree, anchors, etc.
   */
  label: PropTypes.node.isRequired,
};

const defaultProps = {
  className: '',
  error: false,
  isChecked: false,
  isDisabled: false,
  isRequired: false,
  onBlur: undefined,
  onFocus: undefined,
};

const CheckboxInput = ({
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
  const handleBlur = e => {
    if (onBlur) onBlur(e);
  };

  const handleChange = e => {
    onChange(e);
  };

  const handleFocus = e => {
    if (onFocus) onFocus(e);
  };

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    labelText: label,
    hasError: !!error,
  };

  return (
    <>
      <div className={classNames('Palmetto-CheckboxInput', className, { isDisabled })}>
        <input
          aria-invalid={!!error}
          aria-label={label}
          aria-labelledby={`${id}Label`}
          id={id}
          checked={!!isChecked}
          disabled={isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          type="checkbox"
          className="input"
        />
        {label && <FormLabel {...labelProps} />}
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

CheckboxInput.propTypes = propTypes;
CheckboxInput.defaultProps = defaultProps;

export default CheckboxInput;
