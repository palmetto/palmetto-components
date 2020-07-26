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
   * Display label inline with surrounding elements
   */
  displayInline?: boolean,
  /**
   * Mark the label has invalid
   */
  hasError?: boolean;
  /**
   * Grey out label if associated control is disabled
   */
  isDisabled?: boolean,
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired?: boolean;
}

const propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  className: PropTypes.string,
  displayInline: PropTypes.bool,
  hasError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFieldRequired: PropTypes.bool,
};

const FormLabel: FC<Props> = ({
  inputId,
  labelText,
  className = '',
  displayInline = false,
  hasError = false,
  isDisabled = false,
  isFieldRequired = false,
}) => {
  const labelClasses = classNames(
    styles.label,
    className,
    {
      error: hasError,
      disabled: isDisabled,
      inline: displayInline,
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

FormLabel.propTypes = propTypes;

export default FormLabel;
