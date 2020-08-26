import React, {
  FC,
  FocusEvent,
} from 'react';
import { UnknownPropertiesObjType } from '../../../lib/types';
import { SimulatedEventPayloadType, OptionType } from '../../SelectInput/SelectInputTypes';
import SelectInput from '../../SelectInput/SelectInput';

interface FormikSelectInputProps {
  field: {
    id: string;
    label: string;
    name: string;
    options: OptionType[];
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: SimulatedEventPayloadType) => void;
    value?: UnknownPropertiesObjType | string | UnknownPropertiesObjType[];
  };
  form: UnknownPropertiesObjType;
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
