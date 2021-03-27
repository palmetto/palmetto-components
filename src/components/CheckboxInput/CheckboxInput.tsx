import React, { FC, ChangeEvent, FocusEvent, ReactNode } from 'react';
import classNames from 'classnames';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import { FormLabel } from '../FormLabel/FormLabel';
import { Box } from '../Box/Box';
import { Checkbox, CheckboxSize } from './components/Checkbox';
import styles from './CheckboxInput.module.scss';

export interface CheckboxInputProps {
  /**
   * The id attribute of the input.
   */
  id: string;
  /**
   * The checkbox input "checked" attribute.
   */
  isChecked: boolean;
  /**
   * Custom content to be displayed to right of checkbox.
   */
  label: string;
  /**
   * Callback function when input is changed.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Determines if the checkbox should be rendered with display: inline;.
   */
  displayInline?: boolean;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: ReactNode;
  /**
   * Determines if the label is not shown for stylistic reasons.
   * Note the label is still a required prop and will be used as the aria-label for accessibility reasons.
   */
  hideLabel?: boolean;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * The size of the checkbox.
   */
  size?: CheckboxSize;
}

export const CheckboxInput: FC<CheckboxInputProps> = ({
  id,
  isChecked,
  label,
  onChange,
  className = '',
  displayInline = false,
  error = false,
  hideLabel = false,
  helpText,
  isDisabled = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  size = 'md',
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
    { [styles.disabled]: isDisabled },
    { [styles.inline]: displayInline },
  );

  const checkboxProps = {
    'aria-invalid': !!error,
    'aria-label': label,
    'aria-labelledby': label ? `${id}Label` : undefined,
    id,
    isChecked: !!isChecked,
    isDisabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    size,
    label,
    className: 'm-right-xs',
    error,
  };

  let labelMargin;

  if (size === 'sm') {
    labelMargin = '0';
  } else if (size === 'lg') {
    labelMargin = 'xs 0 0 0';
  } else {
    labelMargin = '2xs 0 0 0';
  }

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    hasError: !!error,
    helpText,
    isDisabled,
    margin: labelMargin,
  };

  return (
    <Box className={className}>
      <div className={wrapperClasses}>
        <Checkbox {...checkboxProps} />
        {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      </div>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </Box>
  );
};
