import React from 'react';
import PropTypes from 'prop-types';
import './FormLabel.scss';

const FormLabel = ({
  inputId,
  isFieldRequired,
  labelText,
}) => {
  return (
    <label className="label" htmlFor={inputId}>
      {labelText}{isFieldRequired && <span className="font-color-danger font-size-sm">&nbsp;*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  inputId: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  isFieldRequired: PropTypes.bool,
}

FormLabel.defaultProps = {
  isInputRequired: false,
}

export default FormLabel;