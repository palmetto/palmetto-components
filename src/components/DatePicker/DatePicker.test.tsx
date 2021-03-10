import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  describe('Default', () => {
    it('renders a datepicker with default props', () => {
      const mockedOnChange = jest.fn();
      const { container } = render(<DatePicker onChange={mockedOnChange} />);
      const datePicker = container.querySelector('.react-datepicker');
      expect(datePicker).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('Fires the expected callback when date is selected', () => {
      const openToDate = new Date('1995, 11, 14');
      const mockedOnChange = jest.fn();
      render(
        <DatePicker
          onChange={mockedOnChange}
          openToDate={openToDate}
        />,
      );
      const fourteenth = screen.getByText('14');
      expect(fourteenth).toBeInTheDocument();
      fireEvent.click(fourteenth);
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
