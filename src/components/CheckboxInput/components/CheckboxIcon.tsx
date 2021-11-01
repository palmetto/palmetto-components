import React from 'react';
import { Box } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { FontColor } from '../../../types';
import { CheckboxProps } from './Checkbox'; // eslint-disable-line import/no-cycle

export interface CheckboxIconProps {
  /**
   * Custom className to be applied to root node of component.
   */
  className?: string;
  /**
   * Whether the input is in an error state. The icon will visually change accordingly.
   */
  error?: CheckboxProps['error'];
  /**
   * The checkbox input "checked" attribute.
   */
  isChecked?: CheckboxProps['isChecked'];
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: CheckboxProps['isDisabled'];
  /**
   * Whether the checkbox is rendered in an indeterminate state.
   * NOTE: this change is only visual and it does not affect the checked or unchecked state of the checkbox.
   */
  isIndeterminate?: CheckboxProps['isIndeterminate'];
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  className = undefined,
  error = null,
  isChecked = false,
  isDisabled = false,
  isIndeterminate = false,
}) => {
  let color: FontColor = 'grey-500';
  let name: 'checkbox-btn' | 'checkbox-btn-checked' | 'checkbox-btn-indeterminate' = 'checkbox-btn';

  if (isChecked && isDisabled) {
    color = 'secondary-200';
    name = 'checkbox-btn-checked';
  } else if (isChecked && !isDisabled) {
    color = 'secondary-500';
    name = 'checkbox-btn-checked';
  } else if (isDisabled) {
    color = 'grey-200';
  }

  if (error) color = 'danger-500';
  if (isIndeterminate) name = 'checkbox-btn-indeterminate';

  return (
    <Box className={className} display="inline-block">
      <Icon color={color} name={name} />
    </Box>
  );
};
