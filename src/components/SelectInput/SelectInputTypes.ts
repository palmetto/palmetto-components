import { ValueType, OptionTypeBase } from 'react-select';

export type SimulatedEventPayloadType = {
  target: {
    name: string;
    value: ValueType<OptionTypeBase>;
  };
}

export type OptionType = {
  value: string;
  label: string;
}
