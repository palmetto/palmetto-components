import React from 'react';
import { Box, BoxProps } from '../Box/Box';
import { FormControl, FormControlProps } from '../FormControl/FormControl';
import { FormInput } from '../FormInput/FormInput';
import styles from './SelectInputNative.module.scss';

export interface SelectInputNativeProps extends BoxProps, FormControlProps {
  options: { value: string | number; label: string | number }[],
  value: string | number;
  onChange: (event: React.MouseEvent<HTMLSelectElement>) => void;
  size: 'sm' | 'md' | 'lg';
}

export const SelectInputNative: React.FC<SelectInputNativeProps> = ({
  label,
  hideLabel,
  helpText,
  error,
  id,
  isDisabled,
  isRequired,
  value,
  options,
  onChange,
  placeholder = 'Select an option...',
  size = 'md',
  ...restProps
}) => {
  const optionsWithPlaceholder = [
    { value: '', label: placeholder },
    ...options,
  ];

  return (
    <FormControl
      label={label}
      hideLabel={hideLabel}
      id={id}
      error={error}
      helpText={helpText}
      isRequired={isRequired}
      isDisabled={isDisabled}
    >
      <FormInput
        as="select"
        value={value}
        onChange={onChange}
        size={size}
      >
        {optionsWithPlaceholder.map(option => (
          <Box
            as="option"
            key={option.value}
            value={option.value}
            disabled={option.value === ''}
            hidden={option.value === ''}
          >
            {option.label}
          </Box>
        ))}
      </FormInput>
    </FormControl>
  )
}