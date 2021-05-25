import React from 'react';
import { FormikTouched, FormikErrors, FieldAttributes, FormikValues } from 'formik';
import { SelectInputNative, SelectInputNativeBaseProps, SelectInputNativeProps } from '../../SelectInputNative/SelectInputNative';


export interface FormikSelectInputNativeProps extends SelectInputNativeBaseProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  id: string;
  label: string;
  onChange?: SelectInputNativeProps['onChange'];
  options: SelectInputNativeProps['options'];
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
    value={value}
    error={touched[name] && errors[name]}
    onChange={onChange}
    {...props}
  />
);
