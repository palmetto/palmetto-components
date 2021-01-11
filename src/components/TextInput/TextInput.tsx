import React, {
  FC,
  ChangeEvent,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  ReactNode,
  Component,
} from 'react';
import classNames from 'classnames';
import Cleave from 'cleave.js/react';
import { ChangeEvent as CleaveChangeEvent } from 'cleave.js/react/props';
import { UnknownPropertiesObjType } from '../../types';
import * as InputMasks from './TextInputMasks';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import getAutoCompleteValue from '../../lib/getAutoCompleteValue';
import styles from './TextInput.module.scss';

type inputMaskType = ('phone' | 'creditCard') | UnknownPropertiesObjType;

export interface TextInputBaseProps {
  /**
   * The input's id attribute. Used to programmatically tie the input with its label.
   */
  id: string;
  /**
   * Custom content to be displayed above the input. If the label is hidden, will be used to set aria-label attribute.
   */
  label: string;
  /**
   * The input's 'autocomplete' attribute.
   */
  autoComplete?: boolean | string;
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
   * Pass a value to apply a mask to the input value.
   * Can be one of the existing present strings, or a custom object with options.
   * For options object formats See https://github.com/nosir/cleave.js.
   */
  inputMask?: inputMaskType;
  /**
   * The input's disabled attribute
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
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
  onClear?: (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>) => void;
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
   * The size of the text input.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * An input helper rendered after the input field value
   */
  suffix?: ReactNode;
  /**
   * The input 'type' value. Defaults to type 'text'.
   */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
}
export interface TextInputProps extends TextInputBaseProps {
  /**
   * Callback function to call on change event.
   */
  onChange: (event: ChangeEvent<HTMLInputElement> | CleaveChangeEvent<HTMLInputElement>) => void;
  /**
   * The text value of the input. Required since our Input is a controlled component.
   */
  value: string;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const TextInput: FC<TextInputProps> = forwardRef<HTMLInputElement & Component, TextInputProps>(
  (
    {
      id,
      label,
      onChange,
      value,
      autoComplete = false,
      autoFocus = false,
      className = undefined,
      error = false,
      helpText,
      hideLabel = false,
      inputMask = undefined,
      isDisabled = false,
      isRequired = false,
      maxLength = undefined,
      name = '',
      onBlur = undefined,
      onClear = undefined,
      onFocus = undefined,
      prefix = undefined,
      placeholder = '',
      suffix = undefined,
      size = 'md',
      type = 'text',
      ...restProps
    },
    ref,
  ) => {
    const getInputMask = (
      mask: inputMaskType,
      availableInputMasks: {
        phone: {
          numericOnly: boolean;
          blocks: number[];
          delimiters: string[];
        };
        creditCard: {
          creditCard: boolean;
        };
      },
    ) => {
      if (typeof mask === 'string') {
        return availableInputMasks[mask];
      }

      return mask;
    };

    const inputWrapperClasses = classNames(styles['text-input-wrapper'], styles[size], {
      [styles.error]: error,
      [styles.disabled]: isDisabled,
    });

    const clearBtnClasses = classNames(styles['clear-button'], styles.md);

    const renderClearIcon = (): ReactNode => {
      const handleKeyPress = (event: KeyboardEvent<HTMLButtonElement>): void => {
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

    const inputProps = {
      'aria-required': isRequired,
      'aria-invalid': !!error,
      'aria-label': label,
      'aria-labelledby': label && !hideLabel ? `${id}Label` : undefined,
      autoComplete: getAutoCompleteValue(autoComplete),
      autoFocus,
      className: classNames({
        'p-left-xs': prefix,
        'p-right-xs': suffix,
        'p-h-0': !suffix && !prefix,
      }),
      disabled: isDisabled,
      id,
      maxLength,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      type,
      value,
      ...restProps,
    };

    const labelProps = {
      isFieldRequired: isRequired,
      inputId: id,
      hasError: !!error,
      helpText,
      className: styles['text-input-label'],
      isDisabled,
    };

    return (
      <Box width="100%" className={className}>
        {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Box direction="row" className={inputWrapperClasses}>
          {prefix && (
            <Box color="grey-400" className="ws-nowrap">
              {prefix}
            </Box>
          )}
          {!inputMask ? (
            <input {...inputProps} ref={ref} />
          ) : (
            <Cleave {...inputProps} options={getInputMask(inputMask, InputMasks)} />
          )}
          {!!onClear && !!value && renderClearIcon()}
          {suffix && (
            <Box color="grey-400" className="ws-nowrap">
              {suffix}
            </Box>
          )}
        </Box>
        {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
      </Box>
    );
  },
);

export default TextInput;
