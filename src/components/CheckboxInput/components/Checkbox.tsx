import React, {
  FC, ChangeEvent, FocusEvent, ReactNode,
} from 'react';
import { Box } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { FontColor, FontSize } from '../../../types';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  /**
   * The id attribute of the input.
   */
  id: string;
  /**
   * The checkbox input "checked" attribute.
   */
  isChecked: boolean;
  /**
   * Custom content to be displayed to right of checkbox.
   */
  label: string;
  /**
   * Callback function when input is changed.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * The size of the checkbox.
   */
  size?: CheckboxSize;
  /**
   * Additional props to be spread to checkbox input element
   */
  [x: string]: any; // eslint-disable-line
}

const SIZE_KEYS: { [key: string]: { iconSize: FontSize; height: string; }; } = {
  sm: {
    iconSize: 'lg',
    height: '20px',
  },
  md: {
    iconSize: 'xl',
    height: '24px',
  },
  lg: {
    iconSize: '2xl',
    height: '36px',
  },
};

export const Checkbox: FC<CheckboxProps> = ({
  id,
  isChecked,
  label,
  onChange,
  className = undefined,
  error = false,
  isDisabled = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  size = 'md',
  ...restProps
}) => {
  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
  };

  const inputProps = {
    'aria-invalid': !!error,
    'aria-label': label,
    id,
    checked: !!isChecked,
    disabled: isDisabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    required: isRequired,
    type: 'checkbox',
    ...restProps,
  };

  interface CheckboxIcon {
    color: FontColor;
    name: 'checkbox-btn' | 'checkbox-btn-checked';
    className?: string;
  }

  const checkboxIcon = () => {
    const iconProps: CheckboxIcon = {
      color: 'grey-500',
      name: 'checkbox-btn',
    };

    if (isChecked && isDisabled) {
      iconProps.color = 'secondary-200';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isChecked && !isDisabled) {
      iconProps.color = 'secondary-500';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isDisabled) {
      iconProps.color = 'grey-200';
    }
    if (error) {
      iconProps.color = 'danger-500';
    }

    return (
      <Box display="inline-block">
        <Icon {...iconProps} size={SIZE_KEYS[size].iconSize} />
      </Box>
    );
  };

  return (
    <Box
      display="inline"
      radius="sm"
      background={isDisabled && !isChecked ? 'grey-50' : 'white'}
      className={className}
      style={{ position: 'relative' }}
      height={SIZE_KEYS[size].height}
    >
      <input
        {...inputProps}
        style={{
          position: 'absolute',
          opacity: '0',
          width: `var(--size-font-${SIZE_KEYS[size]})`,
          height: `var(--size-font-${SIZE_KEYS[size]})`,
        }}
      />
      {checkboxIcon()}
    </Box>
  );
};
