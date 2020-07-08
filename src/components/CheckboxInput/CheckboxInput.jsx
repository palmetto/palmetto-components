import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import FormLabel from '../FormLabel/FormLabel';
import './CheckboxInput.scss';

const CheckboxInput = ({
  id,
  className,
  error,
  isChecked,
  isDisabled,
  isRequired,
  onChange,
  label,
}) => {
  const inputId = id || uuid();

  const handleChange = e => {
    onChange(e.target.checked);
  };

  // const labelClasses = classNames(
  //   'checkboxInputInstructions',
  //   { error },
  // );

  const labelProps = {
    isFieldRequired: isRequired,
    inputId,
    labelText: label,
    hasError: !!error,
  };

  return (
    <>
      <div className={classNames('Palmetto-CheckboxInput', className, { isDisabled })}>
        <input
          aria-invalid={!!error}
          id={inputId}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          type="checkbox"
          className="input"
        />
        {label && <FormLabel {...labelProps} />}
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

CheckboxInput.defaultProps = {
  id: undefined,
  className: '',
  error: false,
  isChecked: false,
  isDisabled: false,
  isRequired: false,
};

CheckboxInput.propTypes = {
  /**
   * The id attribute of the input
   */
  id: PropTypes.string,
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
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Custom content to be displayed to right of checkbox. Can be any valid node/tree, anchors, etc.
   */
  label: PropTypes.node.isRequired,
};

export default CheckboxInput;

