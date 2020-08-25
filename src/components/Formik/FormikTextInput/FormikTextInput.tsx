import React, {
  FC,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { Types } from '../../TextInput/TextInputTypes';
import TextInput from '../../TextInput/TextInput';

interface FormikTextInputProps {
  field: {
    id: string;
    label: string;
    name: string;
    type: Types;
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
  form: { [key: string]: any; }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormikTextInput: FC<FormikTextInputProps> = ({
  field: {
    id,
    label,
    name,
    type,
    onBlur,
    onChange,
    value,
  },
  form: { touched, errors },
  ...props
}) => (
  <TextInput
    id={id}
    label={label}
    name={name}
    type={type}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);

export default FormikTextInput;
