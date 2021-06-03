import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
} from 'formik';
import { TextInput, TextInputProps } from '../../TextInput/TextInput';

export interface FormikTextInputProps extends TextInputProps {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
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
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
