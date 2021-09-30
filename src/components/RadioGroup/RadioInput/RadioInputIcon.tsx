import React from 'react';
import { Box, BoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { FontColor } from '../../../types';
import { RadioInputProps } from './RadioInput'; // eslint-disable-line import/no-cycle

export interface RadioIconProps extends BoxProps {
  /**
   * Custom className to be applied to root node of component.
   */
  className?: string;
  /**
   * Whethere the radio is selected.
   */
  isSelected?: RadioInputProps['isSelected'];
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: RadioInputProps['isDisabled'];
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const RadioInputIcon: React.FC<RadioIconProps> = ({
  className = undefined,
  isSelected = false,
  isDisabled = false,
  ...restProps
}) => {
  let color: FontColor = 'grey-500';
  let name: 'radio-btn-unchecked' | 'radio-btn-checked' = 'radio-btn-unchecked';

  if (isSelected) {
    name = 'radio-btn-checked';
    color = 'secondary-500';
  }

  if (isDisabled) {
    color = 'grey-200';
  }

  return (
    <Box className={className} {...restProps}>
      <Icon color={color} name={name} />
    </Box>
  );
};
