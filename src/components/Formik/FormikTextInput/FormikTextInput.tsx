import React from 'react';
import {
  FormikTouched,
  FormikErrors,
  FieldAttributes,
  FormikValues,
  getIn,
} from 'formik';
import { TextInput, TextInputProps } from '../../TextInput/TextInput';

export interface FormikTextInputProps extends Omit<TextInputProps, 'onChange'> {
  field: FieldAttributes<HTMLInputElement>;
  form: {
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
  };
  onChange?: TextInputProps['onChange'];
}

export const FormikTextInput: React.FC<FormikTextInputProps> = (
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
  <TextInput
    {...props}
    id={id}
    label={label}
    name={name}
    onBlur={onBlur}
    onChange={(e) => {
      const trimmedValue = e.target.value.trim();
      if (onChange) {
        onChange({
          target: {
            value: trimmedValue,
            name: e.target.name,
          },
          type: e.type,
        });
      } else {
        formikOnChange({
          target: {
            value: trimmedValue,
            name: e.target.name,
          },
          type: e.type,
        });
      }
    }}
    value={value.trim()}
    error={getIn(touched, name) && getIn(errors, name)}
  />
);
