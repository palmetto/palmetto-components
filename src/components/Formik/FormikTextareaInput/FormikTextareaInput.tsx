import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import TextareaInput from '../../TextareaInput/TextareaInput';

interface FormikTextareaInputProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

const FormikTextInput: FC<FormikTextareaInputProps> = ({
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

export default FormikTextInput;
