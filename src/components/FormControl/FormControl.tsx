import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { FormLabel } from '../FormLabel/FormLabel';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';

export interface FormControlProps extends BoxProps {
  /**
   * The input's id attribute. Used to programmatically tie the input with its label.
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: React.ReactNode;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: React.ReactNode;
  /**
   * The input's disabled attribute
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
}

export const FormControl: React.FC<FormControlProps> = React.forwardRef((
  {
    label,
    hideLabel,
    children,
    error,
    isRequired,
    id,
    helpText,
    isDisabled,
    width = '100',
    ...restProps
  },
  ref,
) => {
  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    hasError: !!error,
    helpText,
    margin: '0 0 xs 0',
    isDisabled,
  };

  return (
    <Box width={width} ref={ref} {...restProps}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      {children}
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </Box>
  );
});
