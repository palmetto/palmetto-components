import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import { BrandColor, FontColor } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { RadioInput } from '../RadioGroup/RadioInput/RadioInput';
import { Checkbox } from '../CheckboxInput/components/Checkbox';
import { Icon } from '../Icon/Icon';

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
   * Whether the option is disabled. This is passed down to the underlying input and disables onChange firing on user interactions.
   * NOTE: that a custom onClick will still fire despite this prop being set to `true`.
   */
  disabled?: boolean;
  /**
   * Whether the input is in an error state. This is used to modify the visual radio/checkbox with the approproate error color.
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
    background = isSelected ? 'primary-lightest' : 'white',
    borderColor = isSelected ? 'primary' : 'grey-lighter',
    borderWidth = 'xs',
    className = '',
    childGap = 'md',
    color = 'dark',
    cursor = 'pointer',
    direction = 'row',
    disabled = false,
    error = false,
    flex = 'auto',
    hideInput = false,
    hover = { borderColor: isSelected ? 'primary' : 'grey-light' },
    inputType = 'radio',
    onClick = undefined,
    padding = 'md',
    radius = 'md',
    shadow = '2xs',
    ...restProps
  },
  ref,
) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

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

  const renderRadio = () => {
    const getRadioFillColor = (defaultColor: BrandColor): BrandColor => {
      if (isSelected && !disabled && error) {
        return 'danger';
      }
      if (isSelected && disabled && error) {
        return 'danger-lighter';
      }
      if (isSelected && !disabled) {
        return 'primary';
      }
      if (isSelected && disabled) {
        return 'grey-light';
      }

      return defaultColor;
    };

    return (
      <Box
        width="16px"
        minWidth="16px"
        height="16px"
        minHeight="16px"
        radius="circle"
        borderColor={getRadioFillColor('grey-light')}
        background="white"
        borderWidth="xs"
        position="relative"
      >
        <Box
          width="10px"
          height="10px"
          background={getRadioFillColor('white')}
          radius="circle"
          position="absolute"
          style={{
            top: '2px',
            left: '2px',
          }}
        />
      </Box>
    );
  };

  const renderCheckbox = () => {
    interface CheckboxIcon {
      color: FontColor;
      name: 'checkbox-btn' | 'checkbox-btn-checked';
      className?: string;
    }

    const iconProps: CheckboxIcon = {
      color: 'grey-500',
      name: 'checkbox-btn',
    };
    if (isSelected && disabled && error) {
      iconProps.color = 'danger-lighter';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isSelected && !disabled && error) {
      iconProps.color = 'danger';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isSelected && disabled) {
      iconProps.color = 'grey-light';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isSelected && !disabled) {
      iconProps.color = 'primary-500';
      iconProps.name = 'checkbox-btn-checked';
    } else if (disabled) {
      iconProps.color = 'grey-200';
    }

    return (
      <Box radius="md" display="inline-block" height="16px">
        <Icon {...iconProps} size="md" />
      </Box>
    );
  };

  return (
    <Box
      background={background}
      borderColor={borderColor}
      borderWidth={borderWidth}
      childGap={childGap}
      className={className}
      color={color}
      cursor={cursor}
      direction={direction}
      flex={flex}
      hover={hover}
      padding={padding}
      radius={radius}
      ref={ref}
      shadow={shadow}
      {...restProps}
      onClick={handleClick}
    >
      {!hideInput && (inputType === 'checkbox' ? renderCheckbox() : renderRadio())}
      {children}
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
        />
      )}
    </Box>
  );
})