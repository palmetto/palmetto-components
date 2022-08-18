import React, {
  FC, ChangeEvent, FocusEvent, ReactNode,
} from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { FormLabel } from '../FormLabel/FormLabel';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { getAutoCompleteValue } from '../../lib/getAutoCompleteValue';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './TextareaInput.module.scss';

export type TextareaInputSize = 'sm' | 'md' | 'lg';
export interface TextareaInputProps extends Omit<BoxProps, 'as' | 'width'> {
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
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
  error?: ReactNode;
  /**
   * Additional clarifying text to help describe the input
   */
  helpText?: ReactNode;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
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
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * Callback function to call on focus event.
   */
  onFocus?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /**
   * The input placeholder attribute.
   */
  placeholder?: string;
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
  size?: TextareaInputSize | ResponsiveProp<TextareaInputSize>;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const TextareaInput: FC<TextareaInputProps> = ({
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
  isDisabled = false,
  isRequired = false,
  maxLength = undefined,
  name = undefined,
  onBlur = undefined,
  onFocus = undefined,
  placeholder = '',
  requiredIndicator = ' *',
  resize = 'vertical',
  rows = 3,
  size = 'md',
  ...restProps
}) => {
  const responsiveClasses = generateResponsiveClasses('size', size);

  const inputWrapperClasses = classNames(
    'palmetto-components__variables__form-control',
    styles['textarea-input-wrapper'],
    ...responsiveClasses.map(c => (styles[c])),
    {
      [styles.error]: error,
      [styles.disabled]: isDisabled,
    },
  );

  const inputProps = {
    'aria-required': isRequired,
    'aria-invalid': !!error,
    'aria-label': label,
    'aria-labelledby': label && !hideLabel ? `${id}Label` : undefined,
    autoComplete: getAutoCompleteValue(autoComplete),
    autoFocus,
    className: classNames(styles[`textarea-resize-${resize}`]),
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
    value,
  };

  const labelProps = {
    inputId: id,
    helpText,
    className: styles['textarea-input-label'],
    isDisabled,
    isFieldRequired: isRequired,
    requiredIndicator,
  };

  return (
    <Box width="100%" className={className} {...restProps}>
      {label && !hideLabel && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Box
        display="block"
        className={inputWrapperClasses}
      >
        <Box as="textarea" {...inputProps} />
      </Box>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </Box>
  );
};
