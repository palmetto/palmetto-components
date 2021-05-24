// @ts-nocheck

import React from 'react';
import { FormikTouched, FormikErrors, FieldAttributes, FormikValues } from 'formik';
import { SelectInputNative } from '../../SelectInputNative/SelectInputNative';


export interface FormikSelectInputNativeProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikSelectInputNative: React.FC<FormikSelectInputNativeProps> = (
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
  <SelectInputNative
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);

FormikSelectInputNative.propTypes = propTypes;
