import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from '../../SelectInput/SelectInput';

/**
 * @description Higher order function that provides a closure for the SelectInput onChange handler
 *  we need to set the values, this is necessary because the Formik Field onChange handler is expecting
 *  an event object while the SelectInput onChange is only providing the value as the argument
 *
 * @param {object} param
 * @param {string} param.name - Formik field name
 * @param {Function} param.setFieldValue - Formik form setFieldValue function
 * @returns {Function} - The onChange handler function passed to FormikSelectInput
 */
export const generateOnChangeHandler = ({ name, setFieldValue, onChange: userOnChange }) => value => {
  setFieldValue(name, value);
  if (userOnChange) {
    userOnChange(value);
  }
};

/**
 * @description Adapter component that connects the Formik Field component with the Palmetto CheckboxInput
 *
 */
const FormikSelectInput = (
  {
    field: {
      name,
      onBlur,
      onChange,
      value,
    },
    form: {
      errors, touched, setFieldValue, submitCount = 0,
    },
    ...props
  },
) => (
  <SelectInput
    name={name}
    onBlur={onBlur}
    onChange={generateOnChangeHandler({ name, setFieldValue, onChange })}
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
