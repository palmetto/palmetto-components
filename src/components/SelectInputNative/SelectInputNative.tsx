import React from 'react';
import classNames from 'classnames';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { ResponsiveProp } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { FormControl, FormControlProps } from '../FormControl/FormControl';
import styles from './SelectInputNative.module.scss';

export type SelectInputNativeSize = 'sm' | 'md' | 'lg';
export interface SelectInputNativeProps extends BoxProps, FormControlProps {
  /**
   * List of options for the select input.
   */
  options: { value: string | number; label: string | number; }[];
  /**
   * onChange callback from select element.
   */
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * Value of selected option. Should match the value key in the option object.
   */
  value: string | number | null;
  /**
   * The input's 'name' attribute.
   */
  name?: string;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: React.ReactNode;
  /**
   * Size of the input. ('sm' | 'md' | 'lg')
   */
  size?: SelectInputNativeSize | ResponsiveProp<SelectInputNativeSize>;
  /**
   * Whether the input is autofocused on initial render.
   */
  autoFocus?: HTMLSelectElement['autofocus'];
  /**
   * Additional props to be spread.
   */
  [x: string]: any; // eslint-disable-line
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
  placeholder = 'Select...',
  requiredIndicator = ' *',
  size = 'md',
  ...restProps
}) => {
  const placeholderOption = { value: '', label: placeholder };
  const optionsWithPlaceholder = [
    { ...placeholderOption },
    ...options,
  ];

  const responsiveClasses = generateResponsiveClasses('size', size);

  const selectWrapperClasses = classNames(
    'palmetto-components__variables__form-control',
    styles['select-input-native-wrapper'],
    ...responsiveClasses.map(className => (styles[className])),
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
      isDisabled={isDisabled}
      isRequired={isRequired}
      requiredIndicator={requiredIndicator}
      {...restProps}
    >
      <Box
        className={selectWrapperClasses}
      >
        <Box
          as="select"
          aria-label={label}
          aria-labelledby={label && !hideLabel ? `${id}Label` : undefined}
          aria-required={isRequired}
          value={value ?? ''}
          onChange={onChange}
          color={!value ? 'grey-light' : 'dark'}
          autoFocus={autoFocus}
          disabled={isDisabled}
          name={name}
          id={id}
          required={isRequired}
        >
          {optionsWithPlaceholder.map(option => (
            <Box
              as="option"
              key={option.value}
              value={option.value}
              disabled={option.value === ''}
              hidden={option.value === ''}
              color={option.value === '' ? 'grey-light' : 'dark'}
            >
              {option.label}
            </Box>
          ))}
        </Box>
      </Box>
    </FormControl>
  );
};
