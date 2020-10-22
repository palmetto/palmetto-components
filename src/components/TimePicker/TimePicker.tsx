import React, { FC } from 'react';
import SelectInput, { SelectInputProps } from '../SelectInput/SelectInput';

interface TimePickerProps extends SelectInputProps {
  /**
   * Interval of displayed times (in minutes). Defaults to 15 minutes.
   */
  interval?: number;
  /**
   * Start hour and minute
   */
  startTime?: { hour: number; minute: number; };
  /**
   * Start hour and minute
   */
  endTime?: { hour: number; minute: number; };
}

const TimePicker: FC<TimePickerProps> = ({
  id,
  name,
  label,
  onChange,
  value,
  endTime = undefined,
  interval = 900,
  placeholder = 'HH:MM',
  startTime = undefined,
  ...restProps
}) => {
  const generateTimes = () => {
    const first = new Date();
    first.setHours(startTime?.hour || 0);
    first.setMinutes(startTime?.minute || 0);
    first.setSeconds(0);

    const last = new Date();
    last.setHours(endTime?.hour || first.getHours() + 24);
    last.setMinutes(endTime?.minute || 0);
    last.setSeconds(0);

    const timeOptions = [];
    const currentTime: Date = new Date(first);

    while (currentTime < last) {
      timeOptions.push({
        value: currentTime.toISOString(),
        label: currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      });
      currentTime.setSeconds(first.getSeconds() + interval);
    }

    return timeOptions;
  };

  return (
    <SelectInput
      {...restProps}
      id={id}
      name={name}
      label={label}
      onChange={onChange}
      options={generateTimes()}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TimePicker;
