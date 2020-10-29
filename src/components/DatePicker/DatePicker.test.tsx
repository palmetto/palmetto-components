import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import DatePicker from './DatePicker';

describe('DatePicker', () => {
  describe('Default', () => {
    it('renders a datepicker with default props', () => {
      const mockedOnChange = jest.fn();
      const { container } = render(<DatePicker onChange={mockedOnChange} />);
      const datePicker = container.querySelector('.react-datepicker');
      expect(datePicker).toBeInTheDocument();
    });
  });
});
