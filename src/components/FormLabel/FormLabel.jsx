import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormLabel.scss';

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
   * Mark the label has invalid
   */
  hasError: PropTypes.bool,
  /**
   * Render an asterisk after the label to mark it as required
   */
  isFieldRequired: PropTypes.bool,
  /**
   * Grey out label if associated control is disabled
   */
  isDisabled: PropTypes.bool,
};

const defaultProps = {
  hasError: false,
  isFieldRequired: false,
  isDisabled: false,
};

const FormLabel = ({
  hasError,
  inputId,
  isFieldRequired,
  labelText,
  isDisabled,
  displayInline,
}) => {
  const labelClasses = classNames(
    'Palmetto-FormLabel',
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
FormLabel.defaultProps = defaultProps;

export default FormLabel;
