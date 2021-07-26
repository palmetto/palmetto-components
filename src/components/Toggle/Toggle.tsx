import React, {
  FC, ChangeEvent, FocusEvent, ReactNode,
} from 'react';
import classNames from 'classnames';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { FormLabel } from '../FormLabel/FormLabel';
import { Box } from '../Box/Box';
import styles from './Toggle.module.scss';

export type ToggleSize = 'sm' | 'md' | 'lg';
export interface ToggleProps {
  /**
   * The id attribute of the input.
   */
  id: string;
  /**
   * The toggle input "checked" attribute.
   */
  isChecked: boolean;
  /**
   * Custom content to be displayed to right of toggle.
   */
  label: string;
  /**
   * Callback function when input is changed.
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Additional classes to add.
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
   * Determines if the label is not shown for stylistic reasons.
   * Note the label is still a required prop and will be used as the aria-label for accessibility reasons.
   */
  hideLabel?: boolean;
  /**
   * If the input should be disabled and not focusable.
   */
  isDisabled?: boolean;
  /**
   * Determines if input is required or not. (Label will have an asterisk if required).
   */
  isRequired?: boolean;
  /**
   * Callback function when input is blurred.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * Callback function when input is focused.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  /**
   * The size of the toggle.
   */
  size?: ToggleSize;
}

export const Toggle: FC<ToggleProps> = ({
  id,
  isChecked,
  label,
  onChange,
  className = '',
  error = false,
  hideLabel = false,
  helpText,
  isDisabled = false,
  isRequired = false,
  onBlur = undefined,
  onFocus = undefined,
  size = 'md',
}) => {
  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    if (onBlur) onBlur(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    if (onFocus) onFocus(event);
  };

  const wrapperClasses = classNames({ [styles.disabled]: isDisabled });
  const trackClasses = classNames(styles['toggle-track'], styles[`track-${size}`], {
    [styles.error]: error,
  });
  const thumbClasses = classNames(styles['toggle-thumb'], styles[`thumb-${size}`]);

  const inputProps = {
    'aria-required': isRequired,
    'aria-invalid': !!error,
    'aria-label': label,
    'aria-labelledby': label && !hideLabel ? `${id}Label` : undefined,
    id,
    checked: !!isChecked,
    disabled: isDisabled,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    type: 'checkbox',
    className: styles['toggle-input'],
  };

  const labelProps = {
    isFieldRequired: isRequired,
    inputId: id,
    isDisabled,
    display: 'flex',
    direction: 'row',
    childGap: 'xs',
    alignItems: helpText ? 'flex-start' : 'center',
  };

  return (
    <Box className={className}>
      <Box className={wrapperClasses}>
        <FormLabel {...labelProps}>
          <input {...inputProps} />
          <span aria-hidden="true" className={trackClasses} data-testid="toggleTrack">
            <span className={thumbClasses} data-testid="toggleThumb" />
          </span>
          {!hideLabel && (
            <Box
              childGap="2xs"
              className={helpText && (size === 'md' || size === 'lg') ? 'm-top-2xs' : ''}
            >
              {label && <div>{label}</div>}
              {helpText && (
                <Box as="p" display="block" fontSize="sm" fontWeight="regular" color="grey">
                  {helpText}
                </Box>
              )}
            </Box>
          )}
        </FormLabel>
      </Box>
      {error && error !== true && <InputValidationMessage>{error}</InputValidationMessage>}
    </Box>
  );
};
