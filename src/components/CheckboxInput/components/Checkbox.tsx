import React from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../../types';
import { generateResponsiveClasses } from '../../../lib/generateResponsiveClasses';
import { Box, BoxProps } from '../../Box/Box';
import { CheckboxIcon } from './CheckboxIcon'; // eslint-disable-line import/no-cycle
import styles from './Checkbox.module.scss';

type BaseSize = 'sm' | 'md' | 'lg';
export type CheckboxSize = BaseSize | ResponsiveProp<BaseSize>;

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
   * If the radio input should be hidden to make way for a custom checkbox.
   */
  isHidden?: boolean;
  /**
   * Whether the checkbox is rendered in an indeterminate state.
   * NOTE: this change is only visual and it does not affect the checked or unchecked state of the checkbox.
   */
  isIndeterminate?: boolean;
  /**
   * The required and aria-required attributes on the input
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
      isIndeterminate = false,
      isRequired = false,
      onBlur = undefined,
      onFocus = undefined,
      size = 'md',
      value = undefined,
      ...restProps
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (inputRef?.current) {
        inputRef.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate]);

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
      'aria-required': isRequired,
      id,
      checked: !!isChecked,
      disabled: isDisabled,
      onBlur: handleBlur,
      onChange: handleChange,
      onFocus: handleFocus,
      required: isRequired,
      type: 'checkbox',
      ref: inputRef,
      ...value && { value },
    };

    const responsiveClasses = generateResponsiveClasses('size', size);

    const containerClasses = classNames(
      styles.checkbox,
      className,
      ...responsiveClasses.map(c => (styles[c])),
      { [styles.hidden]: isHidden },
    );

    const iconClasses = classNames(...responsiveClasses.map(c => (styles[c])));

    return (
      <Box
        display={display}
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
          }}
        />
        {!isHidden && (
          <CheckboxIcon
            isChecked={isChecked}
            isDisabled={isDisabled}
            isIndeterminate={isIndeterminate}
            className={iconClasses}
            error={error}
          />
        )}
      </Box>
    );
  },
);
