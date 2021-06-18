import React from 'react';
import { FontColor } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { RadioInput } from '../RadioGroup/RadioInput/RadioInput';
import { Checkbox } from '../CheckboxInput/components/Checkbox';
import { Icon } from '../Icon/Icon';
import styles from './OptionTiles.module.scss';

interface Option {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
  render?: (option: {
    id: string;
    value: string;
    label: string;
    disabled?: boolean;
  }) => React.ReactNode;
}

export interface OptionTilesProps extends BoxProps {
  /**
   * Value of selected option(s).
   */
  value: string | number | (string | number)[];
  /**
   * Change event.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Options to display
   */
  options: Option[];
  /**
   * Direction (flex direction) for option tiles.
   */
  direction?: BoxProps['direction'];
  /**
   * Make tiles take up 100% of their container.
   */
  isFullWidth?: boolean;
  /**
   * Whether user can select multiple options. Input will be rendered as checkboxes if set to `true`.
   */
  isMulti?: boolean;
  /**
   * Properties to spread onto root node.
   */
  [x: string]: any; // eslint-disable-line
}

export const OptionTiles: React.FC<OptionTilesProps> = React.forwardRef((
  {
    value,
    onChange,
    className,
    options,
    direction = 'column',
    isFullWidth = true,
    isMulti = false,
    ...restProps
  },
  ref,
) => {
  const optionsRefs = React.useRef<React.RefObject<HTMLDivElement>[]>(options?.map(() => React.createRef()));

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const element = optionsRefs.current[index]?.current?.children[0];

    if (element) {
      event.target = element; // eslint-disable-line no-param-reassign
    }

    onChange(event);
  };

  const isOptionSelected = (option: Option) => {
    if (isMulti && value && typeof value !== 'string' && typeof value !== 'number') {
      return value.includes(option.value);
    }

    return value === option.value;
  };

  const getOptionBackgroundColor = (option: Option) => {
    if (isOptionSelected(option) && !option.disabled) {
      return 'primary-lightest';
    } else if (option.disabled) {
      return 'grey-lightest';
    }

    return 'white';
  }

  const getOptionBorderColor = (option: Option) => {
    if (isOptionSelected(option) && !option.disabled) {
      return 'primary';
    } else if (isOptionSelected(option) && option.disabled) {
      return 'grey-light';
    }

    return 'grey-lighter';
  }

  const renderRadio = (option: Option) => {
    const getRadioBackgroundColor = (option: Option) => {
      if (isOptionSelected(option) && !option.disabled) {
        return 'primary';
      } else if (isOptionSelected(option) && option.disabled) {
        return 'grey-light';
      } 
  
      return 'transparent';
    };

    const getRadioBorderColor = (option: Option) => {
      if (isOptionSelected(option) && !option.disabled) {
        return 'primary';
      } else if (isOptionSelected(option) && option.disabled) {
        return 'grey-light';
      } 
  
      return 'grey-light';
    };

    return (
      <Box
        width="16px"
        minWidth="16px"
        height="16px"
        minHeight="16px"
        radius="circle"
        borderColor={getRadioBorderColor(option)}
        borderWidth="xs"
        position="relative"
      >
        <Box
          width="10px"
          height="10px"
          background={getRadioBackgroundColor(option)}
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

  const renderCheckbox = (option: Option) => {
    interface CheckboxIcon {
      color: FontColor;
      name: 'checkbox-btn' | 'checkbox-btn-checked';
      className?: string;
    }

    const iconProps: CheckboxIcon = {
      color: 'grey-500',
      name: 'checkbox-btn',
    };

    if (isOptionSelected(option) && option.disabled) {
      iconProps.color = 'primary-200';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isOptionSelected(option) && !option.disabled) {
      iconProps.color = 'primary-500';
      iconProps.name = 'checkbox-btn-checked';
    } else if (option.disabled) {
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
      className={className}
      width={isFullWidth ? '100' : undefined}
      {...restProps}
    >
      <Box as="fieldset" childGap="md" borderWidth="0" direction={direction} padding="0">
        {options
          && options.map((option, index) => (
            <Box
              key={option.id}
              className={styles.option}
              background={getOptionBackgroundColor(option)}
              borderColor={getOptionBorderColor(option)}
              color={!option.disabled ? 'dark' : 'grey'}
              borderWidth="xs"
              shadow="2xs"
              radius="md"
              direction="row"
              childGap="md"
              padding="md"
              flex={isFullWidth ? 'auto' : 'initial'}
              cursor={option.disabled ? 'not-allowed' : 'pointer'}
              hover={{
                ...!option.disabled && { borderColor: 'primary' },
              }}
              onClick={!option.disabled ? (event: React.MouseEvent<HTMLDivElement>) => handleClick(event, index) : undefined}
            >
              {!isMulti ? renderRadio(option) : renderCheckbox(option)}
              <Box>
                {option.render ? option.render(option) : option.label}
              </Box>
              {isMulti ? (
                <Checkbox
                  id={option.id}
                  name={option.id}
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
                  name={option.id}
                  onChange={onChange}
                  option={option}
                  isDisabled={option.disabled}
                  isSelected={isOptionSelected(option)}
                  isHidden
                  ref={optionsRefs.current[index]}
                />
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
});
