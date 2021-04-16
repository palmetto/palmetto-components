/* eslint-disable */
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { Toggle } from '../../Toggle/Toggle';

const propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
  }).isRequired,
  form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const FormikToggle = ({
  field: {
    name,
    onBlur, // eslint-disable-line no-unused-vars
    onChange, // eslint-disable-line no-unused-vars
    value,
  },
  form: { touched, errors },
  ...props
}) => (
  <Toggle
    error={touched[name] && errors[name]}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange} // eslint-disable-line
    {...props}
  />
);

FormikToggle.propTypes = propTypes;
