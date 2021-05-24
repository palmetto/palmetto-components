import React from 'react';
import { FormikTouched, FormikErrors, FieldAttributes, FormikValues } from 'formik';
import { SelectInput, SelectInputOptions } from '../../SelectInput/SelectInput';

export interface FormikSelectInputProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
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
    options,
    ...props
  },
) => (
  <SelectInput
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    options={options}
    {...props}
  />
);
