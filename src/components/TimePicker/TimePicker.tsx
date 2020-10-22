import React, { FC } from 'react';
import SelectInput, { SelectInputProps } from '../SelectInput/SelectInput';

interface TimePickerProps extends Omit<SelectInputProps, 'isMulti'> {
  /**
   * Interval of displayed times (in seconds). Defaults to 900 (15 minutes).
   */
  interval: number;
  /**
   * Input placeholder
   */
  placeholder?: string;
}

const TimePicker: FC<TimePickerProps> = ({
  interval = 900,
  placeholder = 'HH:MM',
  ...restProps
}) => {
  const generateTimes = () => {
    const SECONDS_IN_A_DAY = 86400;

    return times;
  };

  return (
    <SelectInput
      {...restProps}
      isMulti={false}
      options={times}
      placeholder={placeholder}
    />
  );
};

export default TimePicker;