import React, {
  ChangeEvent,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  ReactNode,
  HTMLProps,
  InputHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { ChangeEvent as CleaveChangeEvent } from 'cleave.js/react/props';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';

import { Box, BoxProps } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { getAutoCompleteValue } from '../../lib/getAutoCompleteValue';
import styles from './TextInputFloating.module.scss';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';

export type TextInputFloatingSize = 'md' | 'lg';
export interface TextInputFloatingProps {
  /**
   * The input's id attribute. Used to programmatically tie the input with its label.
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * Callback function to call on change event.
   */
  onChange: (
    event: ChangeEvent<HTMLInputElement> | CleaveChangeEvent<HTMLInputElement>,
  ) => void;
  /**
   * The text value of the input. Required since our Input is a controlled component.
   */
  value: InputHTMLAttributes<HTMLInputElement>['value'];
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
   * Visually hide the label.
   */
  hideLabel?: boolean;
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
   * The input's 'maxlength' attribute.
   * NOTE: initializing the input with a value longer than the desired maxlength will not trim this value.
   */
  maxLength?: number;
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
   * An input helper rendered before the input field value
   */
  prefix?: ReactNode;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
  /**
   * The size of the text input.
   */
  size?: TextInputFloatingSize | ResponsiveProp<TextInputFloatingSize>;
  /**
   * An input helper rendered after the input field value
   */
  suffix?: ReactNode;
  /**
   * The input 'type' value. Defaults to type 'text'.
   */
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const TextInputFloating: ForwardRefExoticComponent<TextInputFloatingProps> = forwardRef<HTMLDivElement, TextInputFloatingProps>(
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
      hideLabel = false,
      inputProps = {},
      isDisabled = false,
      isRequired = false,
      maxLength = undefined,
      name = '',
      onBlur = undefined,
      onClear = undefined,
      onFocus = undefined,
      prefix = undefined,
      placeholder = '',
      requiredIndicator = ' *',
      suffix = undefined,
      size = 'md',
      type = 'text',
    },
    ref,
  ) => {
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
          <Icon name="remove" className="display-block" />
        </button>
      );
    };

    const computedInputProps: TextInputFloatingProps['inputProps'] = {
      ...inputProps, // These are spread first so that we don't have top level props overwritten by the user.
      'aria-required': isRequired,
      'aria-invalid': !!error,
      'aria-label': label,
      'aria-labelledby': label && !hideLabel ? `${id}Label` : undefined,
      autoComplete: getAutoCompleteValue(autoComplete),
      autoFocus,
      disabled: isDisabled,
      id,
      maxLength,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      required: isRequired,
      type,
      value,
      className: classNames(inputProps.className),
    };

    return (
      <div ref={ref}>
        <Box direction="row" className={inputWrapperClasses}>
          {prefix && (
          <Box
            color="grey-600"
            alignItems="center"
            justifyContent="center"
            className={classNames(styles.prefix, 'ws-nowrap')}
          >
            {prefix}
          </Box>
          )}
          <Box
            direction="row"
            position="relative"
            className="label-input-wrapper"
            flex="auto"
          >
            <Box as="input" {...computedInputProps} />
            {!!onClear && !!value && renderClearIcon()}
            <label
              htmlFor={id}
              className={styles['text-input-label']}
              id={`${id}Label`}
            >
              {label}
              {isRequired && requiredIndicator && (
              <span>{requiredIndicator}</span>
              )}
            </label>
          </Box>
          {suffix && (
          <Box
            color="grey-600"
            className={classNames(styles.suffix, 'ws-nowrap')}
          >
            {suffix}
          </Box>
          )}
        </Box>
        {helpText && (
        <Box margin="xs 0 0 0" as="p" fontSize="xs" color="grey-500">
          {helpText}
        </Box>
        )}
        {error && error !== true && (
        <InputValidationMessage>{error}</InputValidationMessage>
        )}
      </div>
    );
  },
);
