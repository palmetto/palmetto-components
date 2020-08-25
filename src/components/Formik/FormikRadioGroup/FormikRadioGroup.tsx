import React, {
  FC,
  ChangeEvent,
  FocusEvent,
} from 'react';
import RadioGroup from '../../RadioGroup/RadioGroup';
import { Option } from '../../RadioGroup/RadioGroupTypes';

interface RadioGroupProps {
  field: {
    name: string;
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    options: Option[];
  };
  form: { [key: string]: any; }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormikRadioGroup: FC<RadioGroupProps> = ({
  field: {
    name,
    onBlur,
    onChange,
    value,
    options,
  },
  form: { touched, errors },
  ...props
}) => (
  <RadioGroup
    name={name}
    onBlur={onBlur}
    onChange={onChange}
    value={value}
    error={touched[name] && errors[name]}
    options={options}
    {...props}
  />
);

export default FormikRadioGroup;
