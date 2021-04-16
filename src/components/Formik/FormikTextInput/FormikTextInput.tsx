/* eslint-disable */
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../TextInput/TextInput';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

// eslint-disable-line import/prefer-default-export
export const FormikTextInput = (
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
  <TextInput
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);

FormikTextInput.propTypes = propTypes;
