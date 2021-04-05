import React from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { FormControl, FormControlProps } from '../FormControl/FormControl';
import styles from './SelectInputNative.module.scss';

export interface SelectInputNativeProps extends BoxProps, FormControlProps {
  options: { value: string | number; label: string | number }[],
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  size: 'sm' | 'md' | 'lg';
  autoFocus: HTMLSelectElement['autofocus'],
}

export const SelectInputNative: React.FC<SelectInputNativeProps> = ({
  autoFocus = false,
  label,
  hideLabel,
  helpText,
  error,
  id,
  isDisabled,
  isRequired,
  name,
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

  const selectWrapperClasses = classNames(
    styles['select-input-native-wrapper'],
    styles[size],
    {
      [styles.disabled]: isDisabled,
      [styles.error]: error,
    },
  );

  return (
    <FormControl
      label={label}
      hideLabel={hideLabel}
      id={id}
      error={error}
      helpText={helpText}
      isRequired={isRequired}
      isDisabled={isDisabled}
      {...restProps}
    >
      <Box
        className={selectWrapperClasses}
      >
        <Box
          as="select"
          aria-label={label}
          aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
          value={value ?? ''}
          onChange={onChange}
          color={!value ? 'grey-light': 'dark'}
          autoFocus={autoFocus}
          disabled={isDisabled}
          name={name}
          id={id}
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
        </Box>
      </Box>
    </FormControl>
  )
}