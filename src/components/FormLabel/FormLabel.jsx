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
    'label',
    {
      error: hasError,
    },
  );

  return (
    <label className={labelClasses} htmlFor={inputId}>
      {labelText}
      {isFieldRequired && <span className="font-size-sm">&nbsp;*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  hasError: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  isFieldRequired: PropTypes.bool,
};

FormLabel.defaultProps = {
  hasError: false,
  isFieldRequired: false,
};

export default FormLabel;
