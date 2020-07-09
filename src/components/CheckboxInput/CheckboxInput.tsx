import React, { ChangeEvent } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';
import { v4 as uuid } from 'uuid';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import FormLabel from '../FormLabel/FormLabel';
import './CheckboxInput.scss';

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
   * Callback function when input is changed
   */
  onChange: PropTypes.func.isRequired,
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
  onChange,
  label,
}: InferProps<typeof propTypes>) => {
  const inputId = id || uuid();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  // const labelClasses = classNames(
  //   'checkboxInputInstructions',
  //   { error },
  // );

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
        {label && <FormLabel {...{
          isFieldRequired: isRequired,
          inputId,
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
  id: undefined,
  className: '',
  error: false,
  isChecked: false,
  isDisabled: false,
  isRequired: false,
};


export default CheckboxInput;
