import React, { FC, SyntheticEvent, ReactNode } from 'react';
import classNames from 'classnames';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import styles from './DatePicker.module.scss';

export interface DatePickerProps extends ReactDatePickerProps {
  /**
   * React children (to be rendered below the calendar dates).
   */
  children?: ReactNode;
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
  /**
   * Custom format for weekday.
   */
  formatWeekDay?: (formattedDate: string) => string;
  /**
   * Last allowable/shown date
   */
  maxDate?: Date | null;
  /**
   * First allowable/shown date
   */
  minDate?: Date | null;
  /**
   * Months to be shown at one time
   */
  monthsShown?: number;
  /**
   * Date that the calendar will open to by default.
   */
  openToDate?: Date;
  /**
   * Currently selected date.
   */
  selected?: Date | null;
  /**
   * Whether or not the picker will return a range of dates.
   */
  selectsRange?: boolean;
  /**
   * Start date in a range
   */
  startDate?: Date | null;
  /**
   * Show month picker in two columns
   */
  showTwoColumnMonthYearPicker?: boolean;
  /**
   * See full month name in the month picker
   */
  showFullMonthYearPicker?: boolean;
  /**
   * Use the month picker
   */
  showMonthYearPicker?: boolean;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const DatePicker: FC<DatePickerProps> = ({
  children = null,
  dayClassName = undefined,
  maxDate = undefined,
  minDate = undefined,
  monthsShown = undefined,
  openToDate = undefined,
  startDate = undefined,
  selected = undefined,
  selectsRange = undefined,
  showTwoColumnMonthYearPicker = false,
  showFullMonthYearPicker = false,
  showMonthYearPicker = false,
  className = undefined,
  formatWeekDay = formattedDate => formattedDate[0], // Make days show as 1 character.
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
      formatWeekDay={formatWeekDay}
      maxDate={maxDate}
      minDate={minDate}
      monthsShown={monthsShown}
      openToDate={openToDate}
      selected={selected}
      startDate={startDate}
      selectsRange={selectsRange}
      showTwoColumnMonthYearPicker={showTwoColumnMonthYearPicker}
      showFullMonthYearPicker={showFullMonthYearPicker}
      showMonthYearPicker={showMonthYearPicker}
      dayClassName={dayClassName}
      {...restProps}
    >
      {children}
    </ReactDatePicker>
  );
};

export default DatePicker;
