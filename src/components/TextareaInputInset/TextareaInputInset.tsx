import React, {
  ChangeEvent,
  forwardRef,
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
import { HelpText } from '../HelpText/HelpText';
import { getAutoCompleteValue } from '../../lib/getAutoCompleteValue';
import styles from './TextareaInputInset.module.scss';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';

export type TextareaInputInsetSize = 'md' | 'lg';
export interface TextareaInputInsetProps {
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
   * Textarea resize behavior
   */
  resize?: 'vertical' | 'horizontal' | 'none' | 'both';
  /**
   * number of visible text lines for the control.
   */
  rows?: number;
  /**
   * The size of the text input.
   */
  size?: TextareaInputInsetSize | ResponsiveProp<TextareaInputInsetSize>;
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

export const TextareaInputInset: ForwardRefExoticComponent<TextareaInputInsetProps> =
  forwardRef<HTMLDivElement, TextareaInputInsetProps>(
    (
      {
        id,
        label,
        onChange,
        value,
        autoComplete = false,
        autoFocus = false,
        className,
        error = false,
        helpText,
        inputProps = {},
        isDisabled = false,
        isRequired = false,
        maxLength = undefined,
        name = '',
        onBlur = undefined,
        onFocus = undefined,
        placeholder = ' ',
        requiredIndicator = ' *',
        resize = 'vertical',
        rows = 5,
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
          [styles.disabled]: isDisabled,
        },
      );

      const computedInputProps: TextareaInputInsetProps['inputProps'] = {
        ...inputProps, // These are spread first so that we don't have top level props overwritten by the user.
        'aria-required': isRequired,
        'aria-invalid': !!error,
        'aria-label': label,
        'aria-labelledby': label ? `${id}Label` : undefined,
        autoComplete: getAutoCompleteValue(autoComplete),
        autoFocus,
        className: classNames(styles[`textarea-resize-${resize}`], {
          [styles.error]: error,
        }),
        disabled: isDisabled,
        id,
        maxLength,
        name,
        onBlur,
        onChange,
        onFocus,
        placeholder,
        required: isRequired,
        rows,
        type,
        value,
      };

      return (
        <Box width="100" ref={ref} className={className}>
          <Box
            display="block"
            position="relative"
            className={inputWrapperClasses}
          >
            <Box as="textarea" {...computedInputProps} />
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
          {helpText && <HelpText>{helpText}</HelpText>}
          {error && error !== true && (
            <InputValidationMessage>{error}</InputValidationMessage>
          )}
        </Box>
      );
    },
  );
