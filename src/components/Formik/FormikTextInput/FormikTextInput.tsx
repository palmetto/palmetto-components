import React from 'react';
import { FormikTouched, FormikErrors, FieldAttributes, FormikValues } from 'formik';
import { TextInput } from '../../TextInput/TextInput';

export interface FormikTextInputProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikTextInput: React.FC<FormikTextInputProps> = (
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
