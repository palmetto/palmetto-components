import React from 'react';
import {
  screen,
  render,
} from '@testing-library/react';
import TimePicker from './TimePicker';

describe('TimePicker', () => {
  describe('Default', () => {
    it('Renders a TimePicker (select) with default props', () => {
      render(<TimePicker
        name="timePicker"
        id="timePicker"
        onChange={() => null}
        value={null}
        label="Select Time"
      />);

      const timePicker = screen.getByLabelText('Select Time');

      expect(timePicker).toBeInTheDocument();
    });
  });
});
