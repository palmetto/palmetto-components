import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import { TextareaInput, TextareaInputBaseProps } from '../../TextareaInput/TextareaInput';

export interface FormikTextareaInputProps extends TextareaInputBaseProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const FormikTextareaInput: FC<FormikTextareaInputProps> = ({
  field: {
    name,
    onBlur,
    onChange,
    value,
  },
  form: { touched, errors },
  id,
  label,
  ...props
}) => (
  <TextareaInput
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    id={id}
    label={label}
    {...props}
  />
);
