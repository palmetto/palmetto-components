import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import { TextareaInput, TextareaInputProps } from '../../TextareaInput/TextareaInput';

export interface FormikTextareaInputProps extends TextareaInputProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
}

export const FormikTextareaInput: FC<FormikTextareaInputProps> = ({
  field: {
    name,
    onBlur,
    onChange,
    value,
  },
  form: { touched, errors },
  ...props
}) => (
  <TextareaInput
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
