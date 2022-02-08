import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues, getIn,
} from 'formik';
import { RadioGroup, RadioGroupProps } from '../../RadioGroup/RadioGroup';

export interface FormikRadioGroupProps extends Omit<RadioGroupProps, 'onChange'> {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: RadioGroupProps['onChange'];
}

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = (
  {
    field: {
      name,
      onBlur,
      onChange: formikOnChange,
      value,
    },
    form: { touched, errors },
    onChange,
    options,
    ...props
  },
) => (
  <RadioGroup
    {...props}
    options={options}
    name={name}
    onBlur={onBlur}
    onChange={onChange ?? formikOnChange}
    value={value}
    error={getIn(touched, name) && getIn(errors, name)}
  />
);
