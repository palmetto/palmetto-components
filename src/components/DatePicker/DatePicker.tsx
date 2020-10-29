import React, { FC, SyntheticEvent } from 'react';
import classNames from 'classnames';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
  /**
   * Custom classname to be applied to the DatePicker container.
   */
  className?: string;
  /**
   * Callback that fires when a date is changed/selected.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => void;
  /**
   * Callback that fires when a date is clicked.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: ((date: Date, event: SyntheticEvent<any, Event> | undefined) => void) | undefined;
  /**
   * Custom Class to be applied to a single day element based on a date.
   */
  dayClassName?: ((date: Date) => string | null) | undefined;
  /**
   * Custom Class to be applied to a single week element based on a date.
   */
  weekClassName?: ((date: Date) => string | null) | undefined;
  /**
   * Custom Class to be applied to a single month element based on a date.
   */
  monthClassName?: ((date: Date) => string | null) | undefined;
  /**
   * Custom Class to be applied to a specific time.
   */
  timeClassName?: ((date: Date) => string | null) | undefined;
}

const DatePicker: FC<DatePickerProps> = ({
  className,
  ...restProps
}) => {
  const datePickerClasses = classNames(
    styles['react-datepicker'],
    className,
  );

  return (
    <ReactDatePicker
      inline
      calendarClassName={datePickerClasses}
      {...restProps}
    />
  );
};

export default DatePicker;
