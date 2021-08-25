import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { Toggle } from '../../Toggle/Toggle';

export interface FormikToggleProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikToggle: React.FC<FormikToggleProps> = ({
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
    error={getIn(touched, name) && getIn(errors, name)}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange} // eslint-disable-line
    {...props}
  />
);
