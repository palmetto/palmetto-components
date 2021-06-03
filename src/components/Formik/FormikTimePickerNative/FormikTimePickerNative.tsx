import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import { TimePickerNative, TimePickerNativeProps } from '../../TimePickerNative/TimePickerNative';

export interface FormikTimePickerNativeProps extends TimePickerNativeProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikTimePickerNative: FC<FormikTimePickerNativeProps> = (
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
  <TimePickerNative
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
