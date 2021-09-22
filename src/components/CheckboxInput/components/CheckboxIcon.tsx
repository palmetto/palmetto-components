import React from 'react';
import { Box } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { FontColor } from '../../../types';
import { CheckboxProps } from './Checkbox'; // eslint-disable-line import/no-cycle

export interface CheckboxIconProps {
  className?: string;
  isChecked?: CheckboxProps['isChecked'];
  isDisabled?: CheckboxProps['isDisabled'];
  error?: CheckboxProps['error'];
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  className = undefined,
  isChecked = false,
  isDisabled = false,
  error = null,
}) => {
  let color: FontColor = 'grey-500';
  let name: 'checkbox-btn' | 'checkbox-btn-checked' = 'checkbox-btn';

  if (isChecked && isDisabled) {
    color = 'secondary-200';
    name = 'checkbox-btn-checked';
  } else if (isChecked && !isDisabled) {
    color = 'secondary-500';
    name = 'checkbox-btn-checked';
  } else if (isDisabled) {
    color = 'grey-200';
  }
  if (error) {
    color = 'danger-500';
  }

  return (
    <Box className={className} display="inline-block">
      <Icon color={color} name={name} />
    </Box>
  );
};
