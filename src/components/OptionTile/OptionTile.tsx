import React from 'react';
import { BrandColor, FontColor, ResponsiveProp } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { RadioInput } from '../RadioGroup/RadioInput/RadioInput';
import { Checkbox } from '../CheckboxInput/components/Checkbox';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { Icon } from '../Icon/Icon';
import styles from './OptionTileGroup.module.scss';

export interface OptionTileProps extends BoxProps {
  id: string;
}

export const OptionTile = React.forwardRef<HTMLDivElement, OptionTileProps>((
  {
    id,
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
  },
  ref,
) => {
  return (
    <Box
      ref={ref}
      key={id}
      className={styles.option}
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
      hover={{
        ...(!option.disabled && !isOptionSelected(option)) && { borderColor: 'grey-300' },
      }}
      onClick={!option.disabled ? (e: React.MouseEvent<HTMLDivElement>) => handleClick(e, index) : undefined}
    >
      {!hideInput && (!isMulti ? renderRadio(option) : renderCheckbox(option))}
      <Box>
        {option.render ? option.render(option) : option.label}
      </Box>
      {isMulti ? (
        <Checkbox
          id={option.id}
          name={name}
          onChange={onChange}
          isChecked={isOptionSelected(option)}
          label={option.label}
          value={option.value}
          isHidden
          isDisabled={option.disabled}
          ref={optionsRefs.current[index]}
        />
      ) : (
        <RadioInput
          name={name}
          onChange={onChange}
          option={option}
          isDisabled={option.disabled}
          isSelected={isOptionSelected(option)}
          isHidden
          ref={optionsRefs.current[index]}
        />
      )}
    </Box>
  );
})