import React, {
  FC,
  FocusEvent,
} from 'react';
import SelectInput from '../../SelectInput/SelectInput';
import { SimulatedEventPayload, Option } from '../../SelectInput/SelectInputTypes';

interface FormikSelectInputProps {
  field: {
    id: string;
    label: string;
    name: string;
    options: Option[];
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: SimulatedEventPayload) => void;
    value?: { [key: string]: any; } | string | { [key: string]: any; }[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  form: { [key: string]: any; }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormikSelectInput: FC<FormikSelectInputProps> = ({
  field: {
    id,
    label,
    name,
    options,
    onBlur,
    onChange,
    value,
  },
  form: { touched, errors },
  ...props
}) => (
  <SelectInput
    id={id}
    label={label}
    name={name}
    options={options}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    {...props}
  />
);

export default FormikSelectInput;
