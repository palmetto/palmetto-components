import React, { FC, ChangeEvent, FocusEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ResponsiveProp } from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import { InputValidationMessage } from '../InputValidationMessage/InputValidationMessage';
import { FormLabel } from '../FormLabel/FormLabel';
import { Box, BoxProps } from '../Box/Box';
import { HelpText } from '../HelpText/HelpText';
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
   * The required and aria-required attributes on the input
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
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: React.ReactNode;
  /**
   * The size of the toggle.
   */
  size?: ToggleSize | ResponsiveProp<ToggleSize>;
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
  requiredIndicator = ' *',
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

  const wrapperClasses = classNames(
    'palmetto-components__variables__form-control',
    { [styles.disabled]: isDisabled },
  );
  const trackClasses = classNames(
    styles['toggle-track'],
    ...generateResponsiveClasses('track-size', size).map(c => styles[c]),
    {
      [styles.error]: error,
    },
  );
  const thumbClasses = classNames(
    styles['toggle-thumb'],
    ...generateResponsiveClasses('thumb-size', size).map(c => styles[c]),
  );

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
    required: isRequired,
    type: 'checkbox',
    className: styles['toggle-input'],
  };

  const labelProps = {
    inputId: id,
    isDisabled,
    display: 'flex' as BoxProps['display'],
    direction: 'row' as BoxProps['direction'],
    childGap: 'xs' as BoxProps['childGap'],
    alignItems: 'flex-start' as BoxProps['alignItems'],
    isFieldRequired: isRequired,
    requiredIndicator,
  };

  const getLabelTopMargin = (toggleSize: ToggleSize) => {
    if (toggleSize === 'lg') return 'xs 0 0 0';
    if (toggleSize === 'md') return '2xs 0 0 0';
    return '0';
  };

  const labelTopMargin = typeof size === 'object'
    ? Object.keys(size).reduce(
      (a, v) => ({
        ...a,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // not sure how to fix this type error?
        [v]: getLabelTopMargin(size[v]),
      }),
      {},
    )
    : getLabelTopMargin(size);

  return (
    <Box className={className}>
      <Box className={wrapperClasses}>
        <FormLabel {...labelProps}>
          <input {...inputProps} />
          <span
            aria-hidden="true"
            className={trackClasses}
            data-testid="toggleTrack"
          >
            <span className={thumbClasses} data-testid="toggleThumb" />
          </span>
          {!hideLabel && (
            <Box margin={labelTopMargin}>
              {label && <div>{label}</div>}
              {helpText && <HelpText>{helpText}</HelpText>}
            </Box>
          )}
        </FormLabel>
      </Box>
      {error && error !== true && (
        <InputValidationMessage>{error}</InputValidationMessage>
      )}
    </Box>
  );
};
