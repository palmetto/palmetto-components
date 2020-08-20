import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './FormLabel.module.scss';

interface FormLabelProps {
  /**
   * The id of the form control that the label is labeling
   */
  inputId: string;
  /**
   * Content to be rendered inside the label.
   */
  children: ReactNode;
  /**
   * Custom class to pass to label element.
   */
  className?: string;
  /**
   * Display label inline with surrounding elements
   */
  displayInline?: boolean;
  /**
   * Mark the label has invalid
   */
  hasError?: boolean;
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
}

const FormLabel: FC<FormLabelProps> = ({
  inputId,
  children,
  className = '',
  displayInline = false,
  hasError = false,
  isDisabled = false,
  isFieldRequired = false,
  isRadioInputLabel = false,
}) => {
  const labelClasses = classNames(
    styles.label,
    className,
    {
      [styles.disabled]: isDisabled,
      [styles.error]: hasError,
      [styles.disabled]: isDisabled,
      [styles.inline]: displayInline,
      [styles['radio-input-label']]: isRadioInputLabel,
    },
  );

  return (
    <label
      id={`${inputId}Label`}
      className={labelClasses}
      htmlFor={inputId}
    >
      {children}
      {isFieldRequired && <span>&nbsp;*</span>}
    </label>
  );
};

export default FormLabel;
