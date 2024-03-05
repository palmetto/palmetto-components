import React, { ReactNode } from 'react';
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
  error?: ReactNode;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: ReactNode;
  /**
   * The input's disabled attribute
   */
  isDisabled?: boolean;
  /**
   * The required and aria-required attributes on the input
   */
  isRequired?: boolean;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>((
  {
    label,
    hideLabel,
    children,
    error,
    id,
    isRequired,
    helpText,
    isDisabled,
    requiredIndicator,
    width = '100',
    ...restProps
  },
  ref,
) => {
  const labelProps = {
    inputId: id,
    helpText,
    margin: '0 0 xs 0',
    isDisabled,
    isFieldRequired: isRequired,
    requiredIndicator,
  };

  return (
    <Box width={width} ref={ref} {...restProps}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      {children}
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </Box>
  );
});
