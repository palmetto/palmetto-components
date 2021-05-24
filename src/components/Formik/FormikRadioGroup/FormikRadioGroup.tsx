// @ts-nocheck

import React from 'react';
import { FormikTouched, FormikErrors, FieldAttributes, FormikValues } from 'formik';
import { RadioGroup } from '../../RadioGroup/RadioGroup';

export interface FormikRadioGroupProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
}

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = (
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
  <RadioGroup
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);
