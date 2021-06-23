import React from 'react';
import { BrandColor, FontColor, ResponsiveProp } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { RadioInput } from '../RadioGroup/RadioInput/RadioInput';
import { Checkbox } from '../CheckboxInput/components/Checkbox';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
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
   * Option group name (to be passed to either radio or checkbox inputs)
   */
  name: string;
  /**
   * Change event.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Options to display
   */
  options: Option[];
  /**
   * Value of selected option(s).
   */
  value: null | string | number | (string | number)[];
  /**
   * Direction (flex direction) for option tiles.
   */
  direction?: 'row' | 'column' | ResponsiveProp<'row' | 'column'>;
  /**
   * Description to be displayed below the title, and above the RadioGroup.
   */
  description?: React.ReactNode;
  /**
   * Error state or error message for the option group.
   */
  error?: boolean | string;
  /**
   * Whether the tile shows a radio/checkbox. Note that the true input is always hidden (accessibly). This prop
   * hides the custom component which is the visual indicator of checked/selected state.
   */
  hideInput?: boolean;
  /**
   * Make tiles take up 100% of their container.
   */
  isFullWidth?: boolean;
  /**
   * Whether user can select multiple options. Input will be rendered as checkboxes if set to `true`.
   */
  isMulti?: boolean;
  /**
   * Determines if option group is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Title to be displayed above the Option Group.
   */
  title?: React.ReactNode;
  /**
   * Properties to spread onto root node.
   */
  [x: string]: any; // eslint-disable-line
}

export const OptionTiles: React.FC<OptionTilesProps> = React.forwardRef((
  {
    name,
    onChange,
    options,
    value,
    className = '',
    description = '',
    direction = 'column',
    error = undefined,
    hideInput = undefined,
    isFullWidth = true,
    isMulti = false,
    isRequired = false,
    title = '',
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
    if (isOptionSelected(option) && !option.disabled && error) {
      return 'danger-lightest';
    }
    if (isOptionSelected(option) && option.disabled && error) {
      return 'danger-lightest';
    }
    if (isOptionSelected(option) && !option.disabled) {
      return 'primary-lightest';
    }
    if (option.disabled) {
      return 'grey-lightest';
    }

    return 'white';
  };

  const getOptionBorderColor = (option: Option) => {
    if (isOptionSelected(option) && !option.disabled && error) {
      return 'danger';
    }
    if (isOptionSelected(option) && option.disabled && error) {
      return 'danger-lighter';
    }
    if (isOptionSelected(option) && !option.disabled) {
      return 'primary';
    }
    if (isOptionSelected(option) && option.disabled) {
      return 'grey-light';
    }

    return 'grey-lighter';
  };

  const getOptionFontColor = (option: Option) => {
    if (error && option.disabled) {
      return 'danger-lighter';
    }
    if (error) {
      return 'danger';
    }
    if (option.disabled) {
      return 'grey-light';
    }

    return 'dark';
  };

  const renderRadio = (option: Option) => {
    const getRadioFillColor = (defaultColor: BrandColor): BrandColor => {
      if (isOptionSelected(option) && !option.disabled && error) {
        return 'danger';
      }
      if (isOptionSelected(option) && option.disabled && error) {
        return 'danger-lighter';
      }
      if (isOptionSelected(option) && !option.disabled) {
        return 'primary';
      }
      if (isOptionSelected(option) && option.disabled) {
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
    if (isOptionSelected(option) && option.disabled && error) {
      iconProps.color = 'danger-lighter';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isOptionSelected(option) && !option.disabled && error) {
      iconProps.color = 'danger';
      iconProps.name = 'checkbox-btn-checked';
    } else if (isOptionSelected(option) && option.disabled) {
      iconProps.color = 'grey-light';
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
      <Box
        role="group"
        childGap="md"
        borderWidth="0"
        direction={direction}
        padding="0"
        alignItems={!isFullWidth ? 'flex-start' : undefined}
      >
        {(title || description) && (
          <Box
            as="legend"
            display="block"
            margin="0 0 md 0"
            color={error ? 'danger' : 'dark'}
            fontSize="sm"
            fontWeight="bold"
          >
            {title}
            {isRequired && <span>&nbsp;*</span>}
            {description && (
              <Box margin="xs 0 0 0" fontWeight="regular">{description}</Box>
            )}
          </Box>
        )}
        {options && options.map((option, index) => (
          <Box
            key={option.id}
            className={styles.option}
            background={getOptionBackgroundColor(option)}
            borderColor={getOptionBorderColor(option)}
            color={getOptionFontColor(option)}
            borderWidth="xs"
            shadow="2xs"
            radius="md"
            direction="row"
            childGap="md"
            padding="md"
            flex={isFullWidth ? 'auto' : 'initial'}
            cursor={option.disabled ? 'not-allowed' : 'pointer'}
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
        ))}
      </Box>
      {error && typeof error !== 'boolean' && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
});
