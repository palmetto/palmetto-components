import React from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { BorderRadiusSize, FontColor, FontSize } from '../../../types';
import styles from './Checkbox.module.scss';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<BoxProps, 'radius' | 'background' | 'as' | 'height'> {
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Custom class to apply to the checkbox container.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: React.ReactNode;
  /**
   * id of the element that labels the Checkbox
   */
  labelledby?: string;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * If the radio input should be hidden to make way for a custom radio.
   */
  isHidden?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused.
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * The size of the checkbox.
   */
  size?: CheckboxSize;
  /**
   * Value of the checkbox input element
   */
  value?: string | number;
}

const SIZE_KEYS: {
  [key: string]: { iconSize: FontSize; height: string; radius: BorderRadiusSize; };
} = {
  sm: {
    iconSize: 'lg',
    height: '20px',
    radius: 'xs',
  },
  md: {
    iconSize: 'xl',
    height: '24px',
    radius: 'sm',
  },
  lg: {
    iconSize: '2xl',
    height: '36px',
    radius: 'sm',
  },
};

export const Checkbox: React.FC<CheckboxProps> = React.forwardRef(
  (
    {
      className = '',
      display = 'inline',
      id,
      isChecked,
      label,
      labelledby,
      onChange,
      error = false,
      isDisabled = false,
      isHidden = false,
      isRequired = false,
      onBlur = undefined,
      onFocus = undefined,
      size = 'md',
      value = undefined,
      ...restProps
    },
    ref,
  ) => {
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
      if (onBlur) onBlur(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      onChange(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
      if (onFocus) onFocus(event);
    };

    const inputProps = {
      'aria-invalid': !!error,
      'aria-label': label,
      'aria-labelledby': labelledby,
      id,
      checked: !!isChecked,
      disabled: isDisabled,
      onBlur: handleBlur,
      onChange: handleChange,
      onFocus: handleFocus,
      required: isRequired,
      type: 'checkbox',
      ...value && { value },
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
        <Box radius={SIZE_KEYS[size].radius} display="inline-block" height={SIZE_KEYS[size].height}>
          <Icon {...iconProps} size={SIZE_KEYS[size].iconSize} />
        </Box>
      );
    };

    const containerClasses = classNames(
      styles.checkbox,
      className,
      { [styles.hidden]: isHidden },
    );

    return (
      <Box
        background={isDisabled && !isChecked ? 'grey-50' : 'white'}
        display={display}
        height={!isHidden ? SIZE_KEYS[size].height : '0'}
        radius={SIZE_KEYS[size].radius}
        ref={ref}
        style={{ position: 'relative' }}
        className={containerClasses}
        {...restProps}
      >
        <input
          {...inputProps}
          style={{
            position: 'absolute',
            opacity: '0',
            width: SIZE_KEYS[size].height,
            height: SIZE_KEYS[size].height,
          }}
        />
        {!isHidden && checkboxIcon()}
      </Box>
    );
  },
);
