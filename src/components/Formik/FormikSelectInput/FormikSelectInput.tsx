import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
} from 'formik';
import { SelectInput, SelectInputOptions, SelectInputProps } from '../../SelectInput/SelectInput';

export interface FormikSelectInputProps extends SelectInputProps {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  options: SelectInputOptions;
}

export const FormikSelectInput: React.FC<FormikSelectInputProps> = (
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
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
