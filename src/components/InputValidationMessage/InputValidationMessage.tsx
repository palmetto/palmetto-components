import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

/**
 * Used by form inputs such as TextInput, to display a validation message for an invalid input.
 */

export interface InputValidationMessageProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md';
}

const InputValidationMessage: FC<InputValidationMessageProps> = ({
  children,
  size = 'sm',
}) => {
  const classes = classNames(
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

export default InputValidationMessage;
