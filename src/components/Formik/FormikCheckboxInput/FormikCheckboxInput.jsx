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
<<<<<<< HEAD
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
=======
    value: PropTypes.bool,
>>>>>>> 8f7fafbb8c5c86b4c70b05ac66cf140b88f8e81d
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default FormikCheckboxInput;
