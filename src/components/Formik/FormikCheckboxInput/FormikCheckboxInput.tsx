import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
} from 'formik';
import { CheckboxInput, CheckboxInputProps } from '../../CheckboxInput/CheckboxInput';

export interface FormikCheckboxInputProps extends CheckboxInputProps {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
}

export const FormikCheckboxInput: React.FC<FormikCheckboxInputProps> = (
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
    {...props}
    error={touched[name] && errors[name]}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange} // eslint-disable-line
  />
);
