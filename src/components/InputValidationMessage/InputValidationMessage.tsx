import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './InputValidationMessage.module.scss';

/**
 * Used by form inputs such as TextInput, to display a validation message for an invalid input.
 */

interface InputValidationMessageProps {
  children: ReactNode;
}

const classes = classNames(
  styles['input-validation-message-reset'],
  'font-color-danger',
  'font-size-sm',
  'm-top-xs',
);

const InputValidationMessage: FC<InputValidationMessageProps> = ({ children }) => (
  <div className={classes}>
    {children}
  </div>
);

export default InputValidationMessage;
