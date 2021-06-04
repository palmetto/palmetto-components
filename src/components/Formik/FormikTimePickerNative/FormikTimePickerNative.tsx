import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
} from 'formik';
import { TimePickerNative, TimePickerNativeProps } from '../../TimePickerNative/TimePickerNative';

export interface FormikTimePickerNativeProps extends Omit<TimePickerNativeProps, 'onChange'> {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange: TimePickerNativeProps['onChange'];
}

export const FormikTimePickerNative: FC<FormikTimePickerNativeProps> = (
  {
    field: {
      name,
      onBlur,
      onChange: formikOnChange,
      value,
    },
    form: { touched, errors },
    onChange,
    ...props
  },
) => (
  <TimePickerNative
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange ? onChange : formikOnChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
