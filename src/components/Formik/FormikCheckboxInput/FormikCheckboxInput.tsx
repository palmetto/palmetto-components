import React, {
  FC,
  ChangeEvent,
  FocusEvent,
} from 'react';
import CheckboxInput from '../../CheckboxInput/CheckboxInput';

interface FormikCheckboxInputProps {
  field: {
    name: string;
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: boolean;
  };
  form: { [key: string]: any; }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormikCheckboxInput: FC<FormikCheckboxInputProps> = ({
  field: {
    name,
    onBlur,
    onChange,
    value = false,
  },
  form: { touched, errors },
  ...props
}) => (
  <CheckboxInput
    error={touched[name] && errors[name]}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange} // eslint-disable-line
    {...props}
  />
);

export default FormikCheckboxInput;
