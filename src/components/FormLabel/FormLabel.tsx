import React, { FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './FormLabel.module.scss';

interface Props {
  /**
   * The id of the form control that the label is labeling
   */
  inputId: string;
  /**
   * The label text
   */
  labelText: React.ReactNode;
  /**
   * Custom class to pass to label element.
   */
  className?: string;
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
}

const FormLabel: FC<Props> = ({
  inputId,
  labelText,
  className = undefined,
  hasError = false,
  isDisabled = false,
  isFieldRequired = false,
}) => {
  const labelClasses = classNames(
    styles.label,
    className,
    {
      [styles.disabled]: isDisabled,
      [styles.error]: hasError,
    },
  );

  return (
    <label
      id={`${inputId}Label`}
      className={labelClasses}
      htmlFor={inputId}
    >
      {labelText}
      {isFieldRequired && <span className="font-size-sm">&nbsp;*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFieldRequired: PropTypes.bool,
};

export default FormLabel;
