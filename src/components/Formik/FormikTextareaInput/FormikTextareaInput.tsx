import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import { TextareaInput, TextareaInputProps } from '../../TextareaInput/TextareaInput';

export interface FormikTextareaInputProps extends Omit<TextareaInputProps, 'onChange'> {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: TextareaInputProps['onChange'];
}

export const FormikTextareaInput: FC<FormikTextareaInputProps> = ({
  field: {
    name,
    onBlur,
    onChange: formikOnChange,
    value,
  },
  form: { touched, errors },
  onChange,
  id,
  label,
  ...props
}) => (
  <TextareaInput
    {...props}
    id={id}
    label={label}
    name={name}
    onBlur={onBlur}
    onChange={onChange ? onChange : formikOnChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
