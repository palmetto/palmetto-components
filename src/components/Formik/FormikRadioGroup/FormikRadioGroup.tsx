import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
} from 'formik';
import { RadioGroup, RadioGroupProps } from '../../RadioGroup/RadioGroup';

export interface FormikRadioGroupProps extends RadioGroupProps {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
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
    {...props}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
  />
);
