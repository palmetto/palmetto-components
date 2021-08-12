import React, {
  FC,
  useState,
  useRef,
  FocusEvent,
  useEffect,
} from 'react';
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
  popoverProps?: Omit<PopoverProps, 'children' | 'content' | 'isOpen'>;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
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
  onBlur,
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
  const prevIsPopoverOpen = useRef(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleTogglePopover = (newPopoverOpenState: boolean) => {
    setPopoverOpen(newPopoverOpenState);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (mergedTextInputProps.onBlur) mergedTextInputProps.onBlur(event);

    if (isPopoverOpen || !onBlur) return;

    onBlur(event);
  };

  useEffect(() => {
    // These events are to trigger a blur event on the input at the correct time (for form validation)
    // The input is technically blurred whenever calendar popover is interacted with but we don't want that to
    // trigger a blur so we swallow it, and only bubble the blur event back to the parent when the popover is closed
    // which is then the user is done interacting with the component.
    if (prevIsPopoverOpen.current && !isPopoverOpen) {
      (textInputRef?.current as HTMLInputElement).focus();
      (textInputRef?.current as HTMLInputElement).blur();
    }

    if (isPopoverOpen !== prevIsPopoverOpen.current) {
      prevIsPopoverOpen.current = isPopoverOpen;
    }
  }, [isPopoverOpen]);

  const handleDatePickerChange = (
    date: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => {
    mergedDatePickerProps.onChange(date, event);

    if (!mergedDatePickerProps.selectsRange && date) setPopoverOpen(false);
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
      onClickOutside={() => handleTogglePopover(false)}
    >
      <TextInput
        {...mergedTextInputProps}
        id={mergedTextInputProps.id}
        name={mergedTextInputProps.name}
        label={mergedTextInputProps.label}
        value={getTextInputValue()}
        onChange={() => null}
        onClick={() => handleTogglePopover(true)}
        onBlur={handleBlur}
        readOnly
        inputProps={{
          ref: textInputRef,
        }}
        {...restProps}
      />
    </Popover>
  );
};
