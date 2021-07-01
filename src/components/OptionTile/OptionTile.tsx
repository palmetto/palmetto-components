import React from 'react';
import { BrandColor, FontColor, ResponsiveProp } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { RadioInput } from '../RadioGroup/RadioInput/RadioInput';
import { Checkbox } from '../CheckboxInput/components/Checkbox';
import { Icon } from '../Icon/Icon';

export interface OptionTileProps extends BoxProps {
  id: string;
  label: string;
  value: string;
  name: string;
  inputType: 'radio' | 'checkbox';
  hideInput: boolean;
  isSelected: boolean;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>) => void;
  error: boolean;
}

export const OptionTile = React.forwardRef<HTMLDivElement, OptionTileProps>((
  {
    id,
    onChange,
    isSelected,
    label,
    value,
    disabled,
    name,
    error,
    hideInput = false,
    children,
    className = '',
    inputType = 'radio',
    background = 'white',
    borderColor = 'grey-light',
    color = 'dark',
    borderWidth = 'xs',
    shadow = '2xs',
    radius = 'md',
    direction = 'row',
    childGap = 'md',
    padding = 'md',
    flex = 'auto',
    cursor = 'pointer',
    hover = undefined,
    onClick = undefined,
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
        borderWidth="xs"
        position="relative"
      >
        <Box
          width="10px"
          height="10px"
          background={getRadioFillColor('transparent')}
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
      ref={ref}
      key={id}
      className={className}
      background={background}
      borderColor={borderColor}
      color={color}
      borderWidth={borderWidth}
      shadow={shadow}
      radius={radius}
      direction={direction}
      childGap={childGap}
      padding={padding}
      flex={flex}
      cursor={cursor}
      hover={hover}
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