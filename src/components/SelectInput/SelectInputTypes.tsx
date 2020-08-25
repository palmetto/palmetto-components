import { ValueType, OptionTypeBase } from 'react-select';

export interface SimulatedEventPayload {
  target: {
    name: string;
    value: ValueType<OptionTypeBase>;
  };
}

export interface Option {
  value: string;
  label: string;
}
