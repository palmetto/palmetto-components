import React, {
  FC,
  ChangeEvent,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  FocusEvent,
  ReactNode,
  Component,
  InputHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import Cleave from 'cleave.js/react';
import { ChangeEvent as CleaveChangeEvent } from 'cleave.js/react/props';
import { UnknownPropertiesObjType } from '../../types';
import * as InputMaskTypes from './TextInputMasks';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { FormControl } from '../FormControl/FormControl';
import { FormInput, inputPaddingSizes, inputRadiusSizes } from '../FormInput/FormInput';
import getAutoCompleteValue from '../../lib/getAutoCompleteValue';
import styles from './TextInput.module.scss';

export type InputMaskType = ('phone' | 'creditCard' | 'date') | UnknownPropertiesObjType;

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
  inputMask?: InputMaskType;
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
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
}
export interface TextInputProps extends TextInputBaseProps {
  /**
   * Callback function to call on change event.
   */
  onChange: (event: ChangeEvent<HTMLInputElement> | CleaveChangeEvent<HTMLInputElement>) => void;
  /**
   * The text value of the input. Required since our Input is a controlled component.
   */
  value: InputHTMLAttributes<HTMLInputElement>['value'];
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const TextInput: FC<TextInputProps> = forwardRef<HTMLInputElement & Component, TextInputProps>(
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
    const getInputMaskType = (
      mask: InputMaskType,
      availableInputMaskTypes: {
        phone: {
          numericOnly: boolean;
          blocks: number[];
          delimiters: string[];
        };
        creditCard: {
          creditCard: boolean;
        };
        date: {
          date: boolean;
          delimiter: string;
          datePattern: string[];
        };
      },
    ) => {
      if (typeof mask === 'string') {
        return availableInputMaskTypes[mask];
      }

      return mask;
    };

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
    };

    return (
      <FormControl
        helpText={helpText}
        error={error}
        label={label}
        id={id}
        isRequired={isRequired}
        isDisabled={isDisabled}
        hideLabel={hideLabel}
        ref={ref}
        {...restProps}
      >
        <FormInput direction="row">
          {prefix && (
            <Box color="grey-400" className="ws-nowrap">
              {prefix}
            </Box>
          )}
          {!inputMask ? (
            <Box
              as="input"
              borderWidth="0"
              width="100"
              radius={inputRadiusSizes[size]}
              {...inputProps}
            />
          ) : (
            <Cleave {...inputProps} options={getInputMaskType(inputMask, InputMaskTypes)} />
          )}
          {!!onClear && !!value && renderClearIcon()}
          {suffix && (
            <Box color="grey-400" className="ws-nowrap">
              {suffix}
            </Box>
          )}
        </FormInput>
      </FormControl>
    );
  },
);
