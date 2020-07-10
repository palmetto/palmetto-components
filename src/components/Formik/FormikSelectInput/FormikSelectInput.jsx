import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../../SelectInput/SelectInput';

const FormikSelectInput = (
  {
    field: {
      name,
      onBlur,
      onChange,
      value,
    },
    form: {
      errors, touched, submitCount = 0,
    },
    ...props
  },
) => (
  <SelectInput
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={(touched[name] || submitCount > 0) && errors[name]}
    {...props}
  />
);

FormikSelectInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default FormikSelectInput;
