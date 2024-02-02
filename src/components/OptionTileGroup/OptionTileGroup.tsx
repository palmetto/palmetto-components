import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import { ResponsiveProp } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { OptionTile } from '../OptionTile/OptionTile';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import styles from './OptionTileGroup.module.scss';

interface Option {
  id: string;
  value: string;
  label: string;
  disabled?: boolean;
  error?: boolean | string;
  render?: (option: {
    id: string;
    value: string;
    label: string;
    disabled?: boolean;
  }) => React.ReactNode;
}

export interface OptionTileGroupProps extends BoxProps {
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
   * The required and aria-required attributes on each option
   */
  isRequired?: boolean;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
   requiredIndicator?: React.ReactNode;
  /**
   * Title to be displayed above the Option Group.
   */
  title?: React.ReactNode;
}

export const OptionTileGroup: ForwardRefExoticComponent<OptionTileGroupProps> = forwardRef<HTMLDivElement, OptionTileGroupProps>(( // eslint-disable-line max-len
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
    requiredIndicator = <>&nbsp;*</>,
    title = '',
    ...restProps
  },
  ref,
) => {
  const isOptionSelected = (option: Option) => {
    if (isMulti && value && typeof value !== 'string' && typeof value !== 'number') {
      return value.includes(option.value);
    }

    return value === option.value;
  };

  const hasAnyError = !!error || options.some(option => !!option.error);

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
            color={hasAnyError ? 'danger' : 'dark'}
            fontSize="sm"
            fontWeight="bold"
          >
            {title}
            {isRequired && requiredIndicator && <span>{requiredIndicator}</span>}
            {description && (
              <Box margin="xs 0 0 0" fontWeight="regular">{description}</Box>
            )}
          </Box>
        )}
        {options && options.map(option => (
          <OptionTile
            key={option.id}
            className={styles.option}
            flex={isFullWidth ? 'auto' : 'initial'}
            cursor={option.disabled ? 'not-allowed' : 'pointer'}
            hover={{
              ...(!option.disabled && !isOptionSelected(option)) && { borderColor: 'grey-300' },
            }}
            isSelected={isOptionSelected(option)}
            isRequired={isRequired}
            onChange={onChange}
            value={option.value}
            label={option.label}
            disabled={option.disabled}
            inputType={isMulti ? 'checkbox' : 'radio'}
            hideInput={hideInput}
            error={!!option.error || !!error}
            id={option.id}
            name={name}
          >
            {option.render ? option.render(option) : option.label}
          </OptionTile>
        ))}
      </Box>
      {error && typeof error !== 'boolean' && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
});
