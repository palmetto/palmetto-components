import React, {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  ReactNode,
  HTMLProps,
} from 'react';
import classNames from 'classnames';
import { ChangeEvent as CleaveChangeEvent } from 'cleave.js/react/props';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';

import { Box, BoxProps } from '../Box/Box';
import { HelpText } from '../HelpText/HelpText';
import { Icon } from '../Icon/Icon';
import { getAutoCompleteValue } from '../../lib/getAutoCompleteValue';
import styles from './SelectInputInset.module.scss';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';

export type SelectInputInsetSize = 'md' | 'lg';
export interface SelectInputInsetProps {
  /**
   * The input's id attribute. Used to programmatically tie the input with its label.
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * List of options for the select input.
   */
  options: { value: string | number; label: string | number; }[];
  /**
   * Callback function to call on change event.
   */
  onChange: (
    event: ChangeEvent<HTMLInputElement> | CleaveChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * Value of selected option. Should match the value key in the option object.
   */
  value: string | number | null;
  /**
   * Automatically focus the input when the page is loaded.
   */
  autoFocus?: boolean;
  /**
   * Custom class to be added to standard input classes.
   */
  className?: string;
  /**
   * Mark the input field as invalid and display a validation message.
   * Pass a string or node to render a validation message below the input.
   */
  error?: ReactNode;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: ReactNode;
  /**
   * Props passed directly to the input element of the component
   */
  inputProps?: BoxProps & HTMLProps<HTMLInputElement>;
  /**
   * The input's disabled attribute
   */
  isDisabled?: boolean;
  /**
   * The required and aria-required attributes on the input
   */
  isRequired?: boolean;
  /**
   * The input's 'name' attribute.
   */
  name?: string;
  /**
   * Callback function to call on blur event.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function to call when input us cleared. When this is passed,
   * the input will display an icon on the right side, for triggering this callback.
   */
  onClear?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * The input placeholder attribute.
   */
  placeholder?: string;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
  /**
   * The size of the text input.
   */
  size?: SelectInputInsetSize | ResponsiveProp<SelectInputInsetSize>;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const SelectInputInset: ForwardRefExoticComponent<SelectInputInsetProps> = forwardRef<HTMLDivElement, SelectInputInsetProps>(
  (
    {
      id,
      label,
      onChange,
      value,
      autoComplete = false,
      autoFocus = false,
      error = false,
      helpText,
      inputProps = {},
      isDisabled = false,
      isRequired = false,
      name = '',
      onBlur = undefined,
      onClear = undefined,
      onFocus = undefined,
      options,
      placeholder = 'Select...',
      requiredIndicator = ' *',
      size = 'md',
    },
    ref,
  ) => {
    const placeholderOption = { value: '', label: placeholder };
    const optionsWithPlaceholder = [{ ...placeholderOption }, ...options];

    const responsiveClasses = generateResponsiveClasses('size', size);

    const inputWrapperClasses = classNames(
      'palmetto-components__variables__form-control',
      styles['text-input-wrapper'],
      ...responsiveClasses.map(c => styles[c]),
      {
        [styles.error]: error,
        [styles.disabled]: isDisabled,
        [styles['is-clearable']]: onClear,
      },
    );

    const clearBtnClasses = classNames(styles['clear-button'], styles.md);

    const renderClearIcon = (): ReactNode => {
      const handleKeyPress = (
        event: KeyboardEvent<HTMLButtonElement>,
      ): void => {
        if (event.keyCode === 13 && onClear) onClear(event);
      };

      return (
        <button
          type="button"
          onClick={onClear}
          onKeyUp={handleKeyPress}
          className={clearBtnClasses}
          data-testid="text-input-clear-button"
          aria-label="clear input"
        >
          <Icon name="remove-light" className="display-block" />
        </button>
      );
    };

    const computedInputProps: SelectInputInsetProps['inputProps'] = {
      ...inputProps, // These are spread first so that we don't have top level props overwritten by the user.
      'aria-required': isRequired,
      'aria-invalid': !!error,
      'aria-label': label,
      'aria-labelledby': label ? `${id}Label` : undefined,
      autoComplete: getAutoCompleteValue(autoComplete),
      autoFocus,
      disabled: isDisabled,
      id,
      name,
      onBlur,
      onChange,
      onFocus,
      required: isRequired,
      value: value ?? '',
      className: classNames(inputProps.className),
    };

    return (
      <div ref={ref}>
        <Box
          direction="row"
          flex="auto"
          position="relative"
          className={inputWrapperClasses}
        >
          <Box as="select" {...computedInputProps}>
            {optionsWithPlaceholder.map(option => (
              <Box
                as="option"
                key={option.value}
                value={option.value}
                disabled={option.value === ''}
                hidden={option.value === ''}
                color={option.value === '' ? 'grey-500' : 'grey-600'}
              >
                {option.label}
              </Box>
            ))}
          </Box>
          {!!onClear && !!value && renderClearIcon()}
          <label
            htmlFor={id}
            className={styles['select-input-label']}
            id={`${id}Label`}
          >
            {label}
            {isRequired && requiredIndicator && (
            <span>{requiredIndicator}</span>
            )}
          </label>
        </Box>
        {helpText && <HelpText>{helpText}</HelpText>}
        {error && error !== true && (
        <InputValidationMessage>{error}</InputValidationMessage>
        )}
      </div>
    );
  },
);
