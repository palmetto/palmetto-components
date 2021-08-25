import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { CheckboxInput, CheckboxInputProps } from '../../CheckboxInput/CheckboxInput';

export interface FormikCheckboxInputProps extends Omit<CheckboxInputProps, 'onChange'> {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: CheckboxInputProps['onChange'];
}

export const FormikCheckboxInput: React.FC<FormikCheckboxInputProps> = (
  {
    field: {
      name,
      onBlur,
      onChange: formikOnChange,
      value,
    },
    form: { touched, errors },
    onChange,
    id,
    label,
    ...props
  },
) => (
  <CheckboxInput
    {...props}
    id={id}
    label={label}
    error={getIn(touched, name) && getIn(errors, name)}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange ?? formikOnChange} // eslint-disable-line
  />
);
