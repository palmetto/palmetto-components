import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FormLabel.scss';

const FormLabel = ({
  error,
  inputId,
  isFieldRequired,
  labelText,
}) => {
  const labelClasses = classNames(
    error ? 'error' : null,
    'label',
  );

  return (
    <label className={labelClasses} htmlFor={inputId}>
      {labelText}
      {isFieldRequired && <span className="font-size-sm">&nbsp;*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  error: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  isFieldRequired: PropTypes.bool,
};

FormLabel.defaultProps = {
  error: false,
  isFieldRequired: false,
};

export default FormLabel;
