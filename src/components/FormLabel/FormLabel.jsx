import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './FormLabel.module.scss';

const propTypes = {
  /**
   * The id of the form control that the label is labeling
   */
  inputId: PropTypes.string.isRequired,
  /**
   * The label text
   */
  labelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  /**
   * Custom class to pass to label element.
   */
  className: PropTypes.string,
  /**
   * Mark the label has invalid
   */
  hasError: PropTypes.bool,
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired: PropTypes.bool,
};

const defaultProps = {
  hasError: false,
  isFieldRequired: false,
  className: '',
};

const FormLabel = ({
  inputId,
  labelText,
  className,
  hasError,
  isFieldRequired,
}) => {
  const labelClasses = classNames(
    styles.label,
    className,
    {
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

FormLabel.propTypes = propTypes;
FormLabel.defaultProps = defaultProps;

export default FormLabel;
