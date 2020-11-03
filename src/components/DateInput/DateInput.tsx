import React, { FC, useState } from 'react';
import format from 'date-fns/format';
import DatePicker, { DatePickerProps } from '../DatePicker/DatePicker';
import TextInput, { TextInputBaseProps } from '../TextInput/TextInput';
import Popover, { PopoverProps } from '../Popover/Popover';

interface DateInputProps {
  datePickerProps: DatePickerProps;
  textInputProps: TextInputBaseProps;
  dateFormat?: string;
  dateOptions?: {
    locale?: globalThis.Locale | undefined;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    firstWeekContainsDate?: number | undefined;
    useAdditionalWeekYearTokens?: boolean | undefined;
    useAdditionalDayOfYearTokens?: boolean | undefined;
  };
  popoverProps?: Omit<PopoverProps, 'children' | 'content' | 'isOpen'>;
}

const defaultDatePickerProps: Omit<DatePickerProps, 'onChange'> = {
  selected: null,
  selectsRange: false,
};

const defaultPopoverProps: Omit<PopoverProps, 'children' | 'content' | 'isOpen'> = {
  placement: 'bottom',
};

const defaultTextInputProps: Omit<TextInputBaseProps, 'id'> = {
  label: 'Select Date',
};

const DateInput: FC<DateInputProps> = ({
  datePickerProps,
  textInputProps,
  dateFormat = 'MM/dd/yyyy',
  dateOptions = undefined,
  popoverProps = { ...defaultPopoverProps },
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
      return `${formattedStartDate} - ${formattedEndDate}`;
    }

    return formattedSelectedDate;
  };

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const renderDatePicker = () => (
    <DatePicker
      {...mergedDatePickerProps}
      onChange={mergedDatePickerProps.onChange}
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
      onClickOutside={() => setPopoverOpen(false)}
    >
      <TextInput
        {...mergedTextInputProps}
        id={mergedTextInputProps.id}
        name={mergedTextInputProps.name}
        label={mergedTextInputProps.label}
        value={getTextInputValue()}
        onChange={() => null}
        onClick={setPopoverOpen}
      />
    </Popover>
  );
};

export default DateInput;
