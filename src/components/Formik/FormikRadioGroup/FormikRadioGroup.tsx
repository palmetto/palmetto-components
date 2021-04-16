/* eslint-disable */
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '../../RadioGroup/RadioGroup';

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

export const FormikRadioGroup = (
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
  <RadioGroup
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);

FormikRadioGroup.propTypes = propTypes;
