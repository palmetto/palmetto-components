import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
} from 'formik';
import { SelectInput, SelectInputOptions, SelectInputBaseProps } from '../../SelectInput/SelectInput';

export interface FormikSelectInputProps extends SelectInputBaseProps {
  field: FieldAttributes<HTMLTextAreaElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  options: SelectInputOptions;
  /**
   * Additional props to be spread.
   */
  [x: string]: any; // eslint-disable-line
}

export const FormikSelectInput: React.FC<FormikSelectInputProps> = (
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
  <SelectInput
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    options={options}
    {...props}
  />
);
