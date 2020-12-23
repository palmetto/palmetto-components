import React, { FC } from 'react';
import SelectInput, { BaseSelectInputProps } from '../SelectInput/SelectInput';

export interface TimePickerProps extends BaseSelectInputProps {
  /**
   * Options to govern the display of the option labels in the select.
   * This is a direct passthrough to the second argument of JS `toLocaleTimeString`.
   * [More](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)
   */
  dateDisplayOptions?: Intl.DateTimeFormatOptions;
  /**
   * End hour and minute
   */
  endTime?: { hour: number; minute: number; };
  /**
   * Interval of displayed times (in seconds). Defaults to 900 seconds (15 minutes).
   */
  interval?: number;
  /**
   * Locale(s) to be passed down in order to format the label values in the select.
   * This corresponds to the first argument of JS `toLocaleTimeString`.
   * [More](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)
   */
  locales?: string | string[];
  /**
   * Start hour and minute
   */
  startTime?: { hour: number; minute: number; };
}

const TimePicker: FC<TimePickerProps> = ({
  id,
  name,
  label,
  onChange,
  value,
  dateDisplayOptions = { hour: '2-digit', minute: '2-digit' },
  endTime = undefined,
  interval = 900,
  locales = 'en-US',
  placeholder = 'HH:MM',
  startTime = undefined,
  ...restProps
}) => {
  const generateTimes = () => {
    const first = new Date();
    first.setHours(startTime?.hour || 0, startTime?.minute || 0, 0, 0);

    const last = new Date();
    last.setHours(endTime?.hour || first.getHours() + 24, endTime?.minute || 0, 0, 0);

    const timeOptions = [];
    const currentTime: Date = new Date(first);

    while (currentTime < last) {
      timeOptions.push({
        value: currentTime.toISOString(),
        label: currentTime.toLocaleTimeString(locales, dateDisplayOptions),
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
