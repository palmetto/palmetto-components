import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../../SelectInput/SelectInput';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const FormikSelectInput = (
  {
    field: {
      name,
      onBlur,
      onChange,
      value,
    },
    form: { touched, errors },
    ...props
  },
) => (
  <SelectInput
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);

<<<<<<< HEAD
FormikSelectInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.object),
    ]),
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
=======
FormikSelectInput.propTypes = propTypes;
>>>>>>> develop

export default FormikSelectInput;
