import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
} from 'formik';
import {
  SelectInputNative,
  SelectInputNativeProps,
} from '../../SelectInputNative/SelectInputNative';

export interface FormikSelectInputNativeProps extends SelectInputNativeProps {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  /**
   * Additional props to be spread.
   */
  [x: string]: any; // eslint-disable-line
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
    {...props}
    name={name}
    onBlur={onBlur}
    value={value}
    error={touched[name] && errors[name]}
    onChange={onChange}
  />
);
