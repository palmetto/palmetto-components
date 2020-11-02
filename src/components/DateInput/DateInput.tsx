import React, { ChangeEvent, FC, useState } from 'react';
import classNames from 'classnames';
import DatePicker, { DatePickerProps } from '../DatePicker/DatePicker';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import Popover, { PopoverProps } from '../Popover/Popover';

interface DateInputProps {
  datePickerProps?: DatePickerProps;
  textInputProps?: TextInputProps;
  popoverProps?: Omit<PopoverProps, 'children' | 'content' | 'isOpen'>;
}

const defaultDatePickerProps: Omit<DatePickerProps, 'onChange'> = {
  selected: null,
  selectsRange: false,
};

const defaultPopoverProps: Omit<PopoverProps, 'children' | 'content' | 'isOpen'> = {
  placement: 'bottom',
};

const defaultTextInputProps: Omit<TextInputProps,
  'value' |
  'onChange' |
  'id' |
  'name'
> = {
  label: 'Select Date',
};

const DateInput: FC<DateInputProps> = ({
  datePickerProps = { ...defaultDatePickerProps },
  popoverProps = { ...defaultPopoverProps },
  textInputProps = { ...defaultTextInputProps },
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
    const { value } = mergedTextInputProps;
    if (value) return value;

    const {
      selectsRange,
      startDate,
      endDate,
      selected,
    } = mergedDatePickerProps;

    if (selectsRange && (startDate || endDate)) {
      return `${startDate?.toISOString() || ''} - ${endDate?.toISOString() || ''}`;
    }

    return selected?.toISOString() || '';
  };

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (mergedTextInputProps.onChange) {
      mergedTextInputProps.onChange(event);
    }
  };

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
        onChange={handleInputChange}
        onClick={setPopoverOpen}
      />
    </Popover>
  );
};

export default DateInput;
