import React, { FC, useState } from 'react';
import format from 'date-fns/format';
import { DatePicker, DatePickerProps } from '../DatePicker/DatePicker';
import { TextInput, TextInputProps } from '../TextInput/TextInput';
import { Popover, PopoverProps } from '../Popover/Popover';

export interface DateInputProps {
  /**
   * Props object for DatePicker component.
   */
  datePickerProps: DatePickerProps;
  /**
   * Props object for TextInput component.
   */
  textInputProps: Omit<TextInputProps, 'onChange'>;
  /**
   * Format for final date to be displayed.
   * Relies on date-fns/format --> https://date-fns.org/v1.9.0/docs/format
   */
  dateFormat?: string;
  /**
   * Additional settings for formatting date.
   */
  dateOptions?: {
    /**
     * The user's locale.
     */
    locale?: globalThis.Locale | undefined;
    /**
     * Start of week.
     */
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    /**
     * Should determine which week is week 1 of a new year.
     */
    firstWeekContainsDate?: number | undefined;
    /**
     * Whether to accept unicode tokens in format.
     * See here --> https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     */
    useAdditionalWeekYearTokens?: boolean | undefined;
    /**
     * Whether to accept unicode tokens in format.
     * See here --> https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
     */
    useAdditionalDayOfYearTokens?: boolean | undefined;
  };
  /**
   * Props to pass down to the Popover component.
   */
  popoverProps?: Omit<PopoverProps, 'children' | 'content' | 'isOpen'>;
  /**
   * Additional props to be spread to the `TextInput` element.
   */
  [x: string]: any; // eslint-disable-line
}

const defaultDatePickerProps: Omit<DatePickerProps, 'onChange'> = {
  selected: null,
  selectsRange: false,
};

const defaultPopoverProps: Omit<PopoverProps, 'children' | 'content' | 'isOpen'> = {
  placement: 'bottom',
};

const defaultTextInputProps: Omit<TextInputProps, 'id'> = {
  label: 'Select Date',
};

export const DateInput: FC<DateInputProps> = ({
  datePickerProps,
  textInputProps,
  dateFormat = 'MM/dd/yyyy',
  dateOptions = undefined,
  popoverProps = { ...defaultPopoverProps },
  ...restProps
}) => {
  const mergedDatePickerProps = {
    ...defaultDatePickerProps,
    ...datePickerProps,
  };

  const mergedPopoverProps = {
    ...defaultPopoverProps,
    ...popoverProps,
  };

  const mergedTextInputProps = {
    ...defaultTextInputProps,
    ...textInputProps,
  };

  const getTextInputValue = () => {
    const {
      selectsRange,
      startDate,
      endDate,
      selected,
    } = mergedDatePickerProps;

    const formattedStartDate = startDate ? format(startDate, dateFormat, dateOptions) : '';
    const formattedEndDate = endDate ? format(endDate, dateFormat, dateOptions) : '';
    const formattedSelectedDate = selected ? format(selected, dateFormat, dateOptions) : '';

    if (selectsRange) {
      return `${formattedStartDate}${formattedStartDate || formattedEndDate ? ' - ' : ''}${formattedEndDate}`;
    }

    return formattedSelectedDate;
  };

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleTogglePopover = (newPopoverOpenState: boolean) => {
    setPopoverOpen(newPopoverOpenState);
  };

  const handleDatePickerChange = (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    mergedDatePickerProps.onChange(date, event);

    if (!mergedDatePickerProps.selectsRange && date) setPopoverOpen(false);
  };

  /**
   * This function is a one-off workaround to an edge case when detecting outside clicks.
   * in Popover.tsx, outside clicks are detected by seeing if the clicked element is a child
   * of the popover, which would mean it is NOT an outside click. However, when using min/max dates
   * in the Datepicker, the month navigation elements are removed from the DOM when the max/min date has been reached.
   * Because our outside click detector sees that the clicked element
   * is not a child of the popover (it doesn't exist in the DOM anymore)
   * It registers an outside click and closes the Popover.
   * With this code we specifically guard against closing the popover
   * if a user has clicked one of the month navigation arrows.
   * */
  const handleOnClickOutside = (event: MouseEvent | KeyboardEvent) => {
    const target = event.target as Element;

    if (target.className.includes('react-datepicker__navigation')) {
      return;
    }

    handleTogglePopover(false);
  };

  const renderDatePicker = () => (
    <DatePicker
      {...mergedDatePickerProps}
      onChange={handleDatePickerChange}
      selected={mergedDatePickerProps.selected}
      selectsRange={mergedDatePickerProps.selectsRange}
    />
  );

  return (
    <Popover
      {...mergedPopoverProps}
      isOpen={isPopoverOpen}
      content={renderDatePicker()}
      withPortal
      portalTarget={document.body}
      onClickOutside={handleOnClickOutside}
    >
      <TextInput
        {...mergedTextInputProps}
        id={mergedTextInputProps.id}
        name={mergedTextInputProps.name}
        label={mergedTextInputProps.label}
        value={getTextInputValue()}
        onChange={() => null} /* Empty function since we hijack the onChange event */
        onClick={() => handleTogglePopover(true)}
        readOnly
        {...restProps}
      />
    </Popover>
  );
};
