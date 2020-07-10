import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from '../../CheckboxInput/CheckboxInput';

const FormikCheckboxInput = (
  {
    field: {
      name,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      value,
    },
    form: { touched, setFieldValue, errors },
    ...props
  },
) => (
  <CheckboxInput
    {...props}
    error={touched[name] && errors[name]}
    isChecked={value}
    onChange={newValue => setFieldValue(name, newValue)}
  />
);

FormikCheckboxInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default FormikCheckboxInput;
