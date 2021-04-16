/* eslint-disable */
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxInput } from '../../CheckboxInput/CheckboxInput';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const FormikCheckboxInput = (
  {
    field: {
      name,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      value,
    },
    form: { touched, errors },
    ...props
  },
) => (
  <CheckboxInput
    error={touched[name] && errors[name]}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange} // eslint-disable-line
    {...props}
  />
);

FormikCheckboxInput.propTypes = propTypes;
