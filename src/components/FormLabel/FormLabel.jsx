import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormLabel.scss';

const FormLabel = ({
  hasError,
  inputId,
  isFieldRequired,
  labelText,
}) => {
  const labelClasses = classNames(
    'Palmetto-FormLabel',
    {
      error: hasError,
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
  /**
   * Mark the label has invalid
   */
  hasError: PropTypes.bool,
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
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired: PropTypes.bool,
};

FormLabel.defaultProps = {
  hasError: false,
  isFieldRequired: false,
};

export default FormLabel;
