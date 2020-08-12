import React, { ChangeEvent, FocusEvent, FC } from 'react';
import classNames from 'classnames';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import FormLabel from '../FormLabel/FormLabel';
import styles from './CheckboxInput.module.scss';

/**
 * Used to allow users to make a range of selections (zero, one or many).
 */

interface Props {
  /**
   * The id attribute of the input
   */
  id: string;
  /**
   * Callback function when input is changed
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Custom content to be displayed to right of checkbox.
   */
  label: string;
  /**
   * Additional classes to add
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input
   */
  error?: React.ReactNode;
  /**
   * The checkbox input "checked" attribute
   */
  isChecked?: boolean;
  /**
   * If the input should be disabled and not focusable
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required)
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

const CheckboxInput: FC<Props> = ({
  id,
  onChange,
  label,
  className,
  error = false,
  isChecked = false,
  isDisabled = false,
  isRequired = false,
  onBlur,
  onFocus,
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

  const wrapperClasses = classNames(
    styles.checkbox,
    className,
    { [styles.disabled]: isDisabled },
  );

  return (
    <>
      <div className={wrapperClasses}>
        <input
          aria-invalid={!!error}
          aria-label={label}
          aria-labelledby={label ? `${id}Label` : undefined}
          id={id}
          checked={!!isChecked}
          disabled={isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          type="checkbox"
          className={styles.input}
        />
        {label && (
          <FormLabel
            {...{
              isFieldRequired: isRequired,
              inputId: id,
              labelText: label,
              hasError: !!error,
              isDisabled,
            }}
          />
        )}
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </>
  );
};

export default CheckboxInput;
