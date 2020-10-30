import React, { FC, useState } from 'react';
import classNames from 'classnames';
import DatePicker, { DatePickerProps } from '../DatePicker/DatePicker';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import Popover, { PopoverProps } from '../Popover/Popover';
import { PopperProps } from 'react-popper';

interface DateInputProps {
  datePickerProps?: Omit<DatePickerProps, 'onChange'>;
  textInputProps?: TextInputProps;
  popoverProps?: Omit<PopoverProps, 'children' | 'content' | 'isOpen'>;
  onChange: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => void;
}

const defaultDatePickerProps: Omit<DatePickerProps, 'onChange'> = {
  selected: null,
  selectsRange: false,
};

const defaultPopoverProps: Omit<PopoverProps, 'children' | 'content' | 'isOpen'> = {
  placement: 'bottom',
};

const DateInput: FC<DateInputProps> = ({
  onChange,
  datePickerProps = { ...defaultDatePickerProps },
  popoverProps = { ...defaultPopoverProps },
}) => {
  const getTextInputValue = () => {
    if (datePickerProps.selectsRange) {
      return `${datePickerProps?.startDate?.toISOString() || ''} - ${datePickerProps?.endDate?.toISOString() || ''}`;
    }

    return datePickerProps.selected?.toISOString() || '';
  };

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleInputChange = (event) => {
    event.stopPropagation();
    console.log('hello');
  };

  const mergedDatePickerProps = {
    ...defaultDatePickerProps,
    ...datePickerProps,
  };

  const renderDatePicker = () => (
    <DatePicker
      {...mergedDatePickerProps}
      onChange={onChange}
      selected={datePickerProps.selected}
      selectsRange={datePickerProps.selectsRange}
    />
  );

  const mergedPopoverProps = {
    ...defaultPopoverProps,
    ...popoverProps,
  };

  return (
    <Popover
      {...mergedPopoverProps}
      isOpen={isPopoverOpen}
      content={renderDatePicker()}
      withPortal
      onClickOutside={() => setPopoverOpen(false)}
    >
      <TextInput
        id="test"
        name="test"
        label="Choose Date"
        value={getTextInputValue()}
        onChange={handleInputChange}
        onClick={setPopoverOpen}
      />
    </Popover>
  );
};

export default DateInput;
