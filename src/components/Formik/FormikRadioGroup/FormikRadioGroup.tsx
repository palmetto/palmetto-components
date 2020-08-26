import React, {
  FC,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { UnknownPropertiesObj } from '../../../types/types';
import { OptionType } from '../../RadioGroup/RadioGroupTypes';
import RadioGroup from '../../RadioGroup/RadioGroup';

interface RadioGroupProps {
  field: {
    name: string;
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    options: OptionType[];
  };
  form: UnknownPropertiesObj;
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
