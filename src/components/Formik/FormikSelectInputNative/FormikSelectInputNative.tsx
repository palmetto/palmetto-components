import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues, getIn,
} from 'formik';
import {
  SelectInputNative,
  SelectInputNativeProps,
} from '../../SelectInputNative/SelectInputNative';

export interface FormikSelectInputNativeProps extends Omit<SelectInputNativeProps, 'onChange'> {
  field: FieldAttributes<HTMLSelectElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: SelectInputNativeProps['onChange'];
}

export const FormikSelectInputNative: React.FC<FormikSelectInputNativeProps> = (
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
    id,
    label,
    ...props
  },
) => (
  <SelectInputNative
    {...props}
    options={options}
    id={id}
    label={label}
    onChange={onChange ?? formikOnChange}
    name={name}
    onBlur={onBlur}
    value={value}
    error={getIn(touched, name) && getIn(errors, name)}
  />
);
