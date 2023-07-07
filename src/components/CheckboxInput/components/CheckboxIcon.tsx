import React from 'react';
import { Box, BoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { CheckboxProps } from './Checkbox'; // eslint-disable-line import/no-cycle

export interface CheckboxIconProps extends BoxProps {
  /**
   * Custom className to be applied to root node of component.
   */
  className?: string;
  /**
   * prop deprecated: no longer in use and will be remove in next major release.
   */
  error?: CheckboxProps['error'];
  /**
   * The checkbox input "checked" attribute.
   */
  isChecked?: CheckboxProps['isChecked'];
  /**
   * prop deprecated: no longer in use and will be remove in next major release.
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
  isChecked = false,
  isIndeterminate = false,
  ...restProps
}) => {
  let name:
    | 'checkbox-btn'
    | 'checkbox-btn-checked'
    | 'checkbox-btn-indeterminate' = 'checkbox-btn';

  if (isChecked) name = 'checkbox-btn-checked';
  else name = 'checkbox-btn';

  if (isIndeterminate) name = 'checkbox-btn-indeterminate';

  return (
    <Box className={className} display="inline-block" {...restProps}>
      <Icon name={name} />
    </Box>
  );
};
