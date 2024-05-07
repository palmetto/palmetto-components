import React, { ChangeEvent, FocusEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../../types';
import { generateResponsiveClasses } from '../../../lib/generateResponsiveClasses';
import { Box, BoxProps } from '../../Box/Box';
import { FormLabel } from '../../FormLabel/FormLabel';
import { RadioInputIcon } from './RadioInputIcon'; // eslint-disable-line import/no-cycle
import styles from './RadioInput.module.scss';

type BaseSize = 'sm' | 'md' | 'lg';
export type RadioSize = BaseSize | ResponsiveProp<BaseSize>;

export interface RadioInputProps {
  /**
   * Radio input name.
   */
  name: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Options for radio group.
   */
  option: {
    id: string;
    value: string;
    label: ReactNode;
    disabled?: boolean | null;
  };
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * If the radio group should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * If the radio input should be hidden to make way for a custom radio.
   */
  isHidden?: boolean;
  /**
   * The required and aria-required attributes
   */
  isRequired?: boolean;
  /**
   * If the radio group should be disabled and not focusable.
   */
  isSelected?: boolean;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * The size of the radio icon.
   */
  size: RadioSize;
}

export const RadioInput = React.forwardRef<HTMLDivElement, RadioInputProps>((
  {
    name,
    onChange,
    option,
    className = '',
    isDisabled = false,
    isHidden = false,
    isRequired = false,
    isSelected = false,
    onBlur = undefined,
    onFocus = undefined,
    size = 'md',
  },
  ref,
) => {
  const responsiveClasses = classNames(...generateResponsiveClasses('size', size).map(c => styles[c]));

  const labelProps = {
    inputId: option.id,
    isDisabled,
    display: 'flex' as BoxProps['display'],
    isRadioInputLabel: true,
    justifyContent: 'center' as BoxProps['justifyContent'],
  };

  const containerClasses = classNames(
    'palmetto-components__variables__form-control',
    className,
    styles['radio-container'],
    responsiveClasses,
    { [styles.hidden]: isHidden },
  );

  return (
    <>
      {option && (
        <Box
          className={containerClasses}
          key={option.id}
          direction="row"
          alignItems="center"
          ref={ref}
          position="relative"
        >
          <Box
            aria-required={isRequired}
            as="input"
            id={option.id}
            type="radio"
            name={name}
            value={option.value}
            checked={isSelected}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={isDisabled}
            position="absolute"
            required={isRequired}
            style={{ opacity: '0' }}
            margin={isHidden ? '0' : '0 xs 0 2xs'}
          />
          {!isHidden && (
            <RadioInputIcon
              isSelected={isSelected}
              isDisabled={isDisabled}
              margin={isHidden ? '0' : '0 xs 0 2xs'}
              className={responsiveClasses}
              background={isDisabled && !isSelected ? 'grey-50' : 'white-500'}
              radius="circle"
            />
          )}
          {option.label && (
            <FormLabel {...labelProps}>{option.label}</FormLabel>
          )}
        </Box>
      )}
    </>
  );
});
