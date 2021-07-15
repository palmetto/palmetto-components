import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import styles from './FormLabel.module.scss';

export interface FormLabelProps {
  /**
   * Content to be rendered inside the label.
   */
  children: ReactNode;
  /**
   * The id of the form control that the label is labeling
   */
  inputId: string;
  /**
   * Custom class to pass to label element.
   */
  className?: string;
  /**
   * Display label inline with surrounding elements
   */
  displayInline?: boolean;
  /**
   * Additional clarifying text to that helps describe the field
   */
  helpText?: ReactNode;
  /**
   * Mark the label has disabled
   */
  isDisabled?: boolean;
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired?: boolean;
  /**
   * Apply custom styling to labels for a radio input
   */
  isRadioInputLabel?: boolean;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const FormLabel: FC<FormLabelProps> = ({
  children,
  inputId,
  className = '',
  displayInline = false,
  display = 'block',
  helpText,
  isDisabled = false,
  isFieldRequired = false,
  isRadioInputLabel = false,
  margin = '0',
  padding = '0',
  ...restProps
}) => {
  const labelClasses = classNames(styles.label, className, {
    [styles.disabled]: isDisabled,
    [styles.disabled]: isDisabled,
    [styles.inline]: displayInline,
    [styles['radio-input-label']]: isRadioInputLabel,
  });

  return (
    <Box
      as="label"
      id={`${inputId}Label`}
      className={labelClasses}
      display={display}
      margin={margin}
      padding={padding}
      htmlFor={inputId}
      {...restProps}
    >
      {children}
      {isFieldRequired && <span> *</span>}
      {helpText && (
        <Box as="p" display="block" fontSize="sm" color="grey" className={styles['help-text']}>
          {helpText}
        </Box>
      )}
    </Box>
  );
};
