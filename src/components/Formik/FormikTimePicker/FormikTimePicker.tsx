import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import { TimePicker, TimePickerProps } from '../../TimePicker/TimePicker';

export interface FormikTimePickerProps extends TimePickerProps {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikTimePicker: FC<FormikTimePickerProps> = (
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
  <TimePicker
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    options={options}
  />
);
