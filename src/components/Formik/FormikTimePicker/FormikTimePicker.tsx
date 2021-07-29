import React, { FC } from 'react';
import {
  FormikTouched,
  FormikErrors,
  FormikValues,
  FieldAttributes,
  getIn,
} from 'formik';
import { TimePicker, TimePickerProps } from '../../TimePicker/TimePicker';

export interface FormikTimePickerProps extends Omit<TimePickerProps, 'onChange'> {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: TimePickerProps['onChange'];
}

export const FormikTimePicker: FC<FormikTimePickerProps> = (
  {
    field: {
      name,
      onBlur,
      onChange: formikOnChange,
      value,
    },
    form: { touched, errors },
    options,
    onChange,
    ...props
  },
) => (
  <TimePicker
    {...props}
    name={name}
    onBlur={onBlur}
    onChange={onChange ?? formikOnChange}
    value={value}
    error={getIn(touched, name) && getIn(errors, name)}
    options={options}
  />
);
