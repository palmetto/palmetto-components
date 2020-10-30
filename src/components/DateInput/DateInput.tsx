import React, { FC, useState } from 'react';
import classNames from 'classnames';
import DatePicker, { DatePickerProps } from '../DatePicker/DatePicker';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import Popover, { PopoverProps } from '../Popover/Popover';

interface DateInputProps {
  datePickerProps?: DatePickerProps;
  textInputProps?: TextInputProps;
  popoverProps?: PopoverProps;
  onChange: (date: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => void;
}

const DateInput: FC<DateInputProps> = ({
  onChange,
  datePickerProps = {
    selected: null,
    onChange: undefined,
  },
  popoverProps = {
    placement: 'bottom',
  },
}) => {
  const textInputValue = datePickerProps.selected?.toISOString() || '';
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleInputChange = (event) => {
    event.stopPropagation();
    console.log('hello');
  };

  const renderDatePicker = () => (
    <DatePicker
      onChange={onChange}
      selected={datePickerProps.selected}
    />
  );

  return (
    <Popover
      isOpen={isPopoverOpen}
      placement={popoverProps.placement}
      content={renderDatePicker()}
      withPortal
      onClickOutside={() => setPopoverOpen(false)}
    >
      <TextInput
        id="test"
        name="test"
        label="Choose Date"
        value={textInputValue}
        onChange={handleInputChange}
        onClick={setPopoverOpen}
      />
    </Popover>
  );
};

export default DateInput;
