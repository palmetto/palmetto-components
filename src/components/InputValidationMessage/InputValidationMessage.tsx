import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './InputValidationMessage.module.scss';

/**
 * Used by form inputs such as TextInput, to display a validation message for an invalid input.
 */

export interface InputValidationMessageProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md';
}

export const InputValidationMessage: FC<InputValidationMessageProps> = ({
  children,
  size = 'sm',
}) => {
  const classes = classNames(
    'palmetto-components__variables__form-control',
    styles['input-validation-message'],
    'font-color-danger',
    `font-size-${size}`,
    'm-top-xs',
  );

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
