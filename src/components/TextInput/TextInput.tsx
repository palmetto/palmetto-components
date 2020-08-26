import React, {
  FC,
  ChangeEvent,
  FocusEvent,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import Cleave from 'cleave.js/react';
import * as InputMasks from './TextInputMasks';
import { MasksType, InputType } from './TextInputTypes';
import FormLabel from '../FormLabel/FormLabel';
import InputValidationMessage from '../InputValidationMessage/InputValidationMessage';
import styles from './TextInput.module.scss';

interface TextInputProps {
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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * The text value of the input. Required since our Input is a controlled component.
   */
  value: string;
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
  error?: ReactNode | boolean | string;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * Pass a value to apply a mask to the input value.
   * Can be one of the existing present strings, or a custom object with options.
   * For options object formats See https://github.com/nosir/cleave.js.
   */
  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputMask?: ('phone' | 'creditCard') | { [key: string]: any; };
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
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * The input placeholder attribute.
   */
  placeholder?: string;
  /**
   * The input 'type' value. Defaults to type 'text'.
   */
  type: InputType;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  onChange,
  value,
  autoComplete = false,
  autoFocus = false,
  className = undefined,
  error = false,
  hideLabel = false,
  inputMask = undefined,
  isDisabled = false,
  isRequired = false,
  maxLength = undefined,
  name = '',
  onBlur = undefined,
  onFocus = undefined,
  placeholder = '',
  type = 'text',
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
    // Selects input content allowing immediate edit. @TODO Confirm if desired functionality.
    event.currentTarget.select();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const inputClasses = classNames(
    styles['text-input'],
    { [styles.error]: error },
  );

  const getInputMask = (
    mask: ('phone' | 'creditCard') | { [key: string]: any; }, // eslint-disable-line @typescript-eslint/no-explicit-any
    availableInputMasks: MasksType,
  ) => {
    if (typeof mask === 'string') {
      return availableInputMasks[mask];
    }

    return mask;
  };

  const getAutoCompleteValue = () => {
    if (
      !autoComplete
      || (typeof autoComplete !== 'boolean' && typeof autoComplete !== 'string')) {
      return 'off';
    }

    if (typeof autoComplete === 'boolean' && autoComplete) {
      return 'on';
    }

    return autoComplete;
  };

  const inputProps = {
    'aria-required': isRequired,
    'aria-invalid': !!error,
    'aria-label': label,
    'aria-labelledby': label && !hideLabel ? `${id}Label` : undefined,
    autoComplete: getAutoCompleteValue(),
    autoFocus,
    className: inputClasses,
    disabled: isDisabled,
    id,
    maxLength,
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    placeholder,
    type,
    value,
  };

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    hasError: !!error,
    className: styles['text-input-label'],
    isDisabled,
  };

  return (
    <div className={className}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      {!inputMask ? (
        <input {...inputProps} />
      ) : (
        <Cleave {...inputProps} options={getInputMask(inputMask, InputMasks)} />
      )}
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </div>
  );
};

export default TextInput;
