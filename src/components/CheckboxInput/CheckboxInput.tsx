import React from 'react';
import classNames from 'classnames';
import { cssShorthandToClasses } from '../../lib/cssShorthandToClasses';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { FormLabel } from '../FormLabel/FormLabel';
import { Box } from '../Box/Box';
import { Checkbox, CheckboxSize, CheckboxProps } from './components/Checkbox';

const labelMarginSizeMap = {
  sm: '0',
  md: '2xs 0 0 0',
  lg: 'xs 0 0 0',
};

const computedResponsiveSize = ( // eslint-disable-line @typescript-eslint/explicit-module-boundary-types
  size: CheckboxInputProps['size'],
) => {
  if (size && !(typeof size === 'string') && typeof size === 'object') {
    return Object.entries(size)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: labelMarginSizeMap[value || 'md'] }), {});
  }

  return labelMarginSizeMap[size || 'md'] as string;
};
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: React.ReactNode;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: React.ReactNode;
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
   * Whether the checkbox is rendered in an indeterminate state.
   * NOTE: this change is only visual and it does not affect the checked or unchecked state of the checkbox.
   */
  isIndeterminate?: CheckboxProps['isIndeterminate'];
  /**
   * The required and aria-required attributes on the input
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: React.ReactNode;
  /**
   * The size of the checkbox.
   */
  size?: CheckboxSize;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  isChecked,
  label,
  onChange,
  className = '',
  error = false,
  hideLabel = false,
  helpText,
  isDisabled = false,
  isIndeterminate = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  requiredIndicator = ' *',
  size = 'md',
  ...restProps
}) => {
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
  };

  const checkboxProps = {
    id,
    isChecked: !!isChecked,
    isDisabled,
    isIndeterminate,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    isRequired,
    size,
    label,
    className: classNames('palmetto-components__variables__form-control', 'm-right-xs'),
    error,
  };

  const labelProps = {
    inputId: id,
    helpText,
    isDisabled,
    isFieldRequired: isRequired,
    requiredIndicator,
    className: classNames(...cssShorthandToClasses('m', computedResponsiveSize(size))),
  };

  return (
    <Box className={className} {...restProps}>
      <Box
        alignItems="flex-start"
        direction="row"
      >
        <Checkbox {...checkboxProps} labelledby={`${id}Label`} />
        {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      </Box>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </Box>
  );
};
