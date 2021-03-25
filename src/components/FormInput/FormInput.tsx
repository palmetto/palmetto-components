import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface FormInputProps extends BoxProps {
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: React.ReactNode;
  /**
   * The size of the text input.
   */
  size?: 'sm' | 'md' | 'lg';
}

export const FormInput: React.FC<FormInputProps> = ({
  children,
  error,
  isDisabled,
  size = 'md',
  ...restProps
}) => {
  const paddingMap = {
    sm: '0 2xs',
    md: 'xs sm',
    lg: 'xs sm',
  };

  const borderRadiusMap = {
    sm: 'sm',
    md: 'md',
    lg: 'md',
  };

  return (
    <Box
      padding={paddingMap[size]}
      radius={borderRadiusMap[size]}
      background={error ? 'warning-100' : 'white'}
      borderColor={error ? 'warning' : 'grey-100'}
      {...restProps}
    >
      {children}
    </Box>
  );
}
