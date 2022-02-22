import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { RadioInput } from '../RadioGroup/RadioInput/RadioInput';
import { Checkbox } from '../CheckboxInput/components/Checkbox';
import { CheckboxIcon } from '../CheckboxInput/components/CheckboxIcon';
import { RadioInputIcon } from '../RadioGroup/RadioInput/RadioInputIcon';
import styles from './OptionTile.module.scss';

export interface OptionTileProps extends BoxProps {
  /**
   * id attribute for radio/checkbox input.
   */
  id: string;
  /**
   * Whether the option is selected. Passed down as `checked` attribute for the underlying input.
   */
  isSelected: boolean;
  /**
   * label attribute for radio/checkbox input.
   */
  label: string;
  /**
   * Name attribute for parent fieldset, to be passed to radio/checkbox input.
   */
  name: string;
  /**
   * onChange callback attached to underlying input elements.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>) => void;
  /**
   * value attribute for radio/checkbox input.
   */
  value: string;
  /**
   * Whether the option is disabled. This is passed down to the underlying
   * input and disables onChange firing on user interactions.
   * NOTE: that a custom onClick will still fire despite this prop being set to `true`.
   */
  disabled?: boolean;
  /**
   * Whether the input is in an error state. This is used to modify the visual
   * radio/checkbox with the appropriate error color.
   * NOTE: this may create mismatches when using custom styling on the OptionTile.
   */
  error?: boolean;
  /**
   * The actual input on an OptionTile is already hidden and replaced
   * with a custom div for visual interaction. This prop will hide the custom visual element.
   * The input will continue to be accessibly hidden regardless of the value of this prop.
   */
  hideInput?: boolean;
  /**
   * Whether to render a radio or a checkbox input.
   */
  inputType?: 'radio' | 'checkbox';
}

export const OptionTile: ForwardRefExoticComponent<OptionTileProps> = forwardRef<HTMLDivElement, OptionTileProps>((
  {
    children,
    id,
    isSelected,
    label,
    name,
    onChange,
    value,
    borderWidth = 'xs',
    className = '',
    childGap = undefined,
    cursor = 'pointer',
    direction = 'row',
    disabled = false,
    error = false,
    flex = 'auto',
    hideInput = false,
    inputType = 'radio',
    onClick = undefined,
    padding = 'md',
    shadow = '2xs',
    ...restProps
  },
  ref,
) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const classes = classNames(
    'palmetto-components__variables__form-control',
    styles['option-tile'],
    className,
    {
      [styles.selected]: isSelected,
      [styles.disabled]: disabled,
      [styles.error]: error,
    },
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }

    if (!disabled) {
      const element = inputRef.current?.children[0];

      if (element) {
        event.target = element; // eslint-disable-line no-param-reassign
      }

      onChange(event);
    }
  };

  return (
    <Box
      borderWidth={borderWidth}
      childGap={childGap}
      className={classes}
      cursor={cursor}
      direction={direction}
      flex={flex}
      padding={padding}
      ref={ref}
      shadow={shadow}
      {...restProps}
      onClick={handleClick}
    >
      {!hideInput && (inputType === 'checkbox' ? (
        <CheckboxIcon
          isChecked={isSelected}
          isDisabled={disabled}
          error={error}
          margin="0 md 0 0"
        />
      ) : (
        <RadioInputIcon
          isSelected={isSelected}
          isDisabled={disabled}
          error={error}
          margin="0 md 0 0"
        />
      ))}
      {inputType === 'checkbox' ? (
        <Checkbox
          id={id}
          name={name}
          onChange={onChange}
          isChecked={isSelected}
          label={label}
          value={value}
          isHidden
          isDisabled={disabled}
          ref={inputRef}
        />
      ) : (
        <RadioInput
          name={name}
          onChange={onChange}
          option={{
            id,
            disabled,
            value,
            label,
          }}
          isDisabled={disabled}
          isSelected={isSelected}
          isHidden
          ref={inputRef}
          size="md"
        />
      )}
      {children}
    </Box>
  );
});
