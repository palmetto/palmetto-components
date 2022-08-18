import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import styles from './FormLabel.module.scss';

export interface FormLabelProps extends BoxProps {
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
   * Additional clarifying text to that helps describe the field
   */
  helpText?: ReactNode;
  /**
   * Mark the label has disabled
   */
  isDisabled?: boolean;
  /**
   * prop deprecated: no longer in use and will be remove in next major release.
   */
  isFieldRequired?: boolean;
  /**
   * Apply custom styling to labels for a radio input
   */
  isRadioInputLabel?: boolean;
  /**
   * Visual indicator that the field is required, that gets appended to the label
   */
  requiredIndicator?: ReactNode;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const FormLabel: FC<FormLabelProps> = ({
  children,
  inputId,
  className = '',
  display = 'block',
  helpText,
  isDisabled = false,
  isFieldRequired = false,
  isRadioInputLabel = false,
  requiredIndicator = ' *',
  margin = '0',
  padding = '0',
  ...restProps
}) => {
  const labelClasses = classNames(
    'palmetto-components__variables__form-control',
    styles.label,
    className,
    {
      [styles.disabled]: isDisabled,
      [styles.disabled]: isDisabled,
      [styles['radio-input-label']]: isRadioInputLabel,
    },
  );

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
      {isFieldRequired && requiredIndicator && <span>{requiredIndicator}</span>}
      {helpText && (
        <Box
          as="p"
          display="block"
          fontSize="sm"
          color="grey"
          className={styles['help-text']}
        >
          {helpText}
        </Box>
      )}
    </Box>
  );
};
