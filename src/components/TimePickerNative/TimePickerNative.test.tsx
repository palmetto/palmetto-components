import React from 'react';
import {
  screen,
  render,
  fireEvent,
} from '@testing-library/react';
import { TimePickerNative } from './TimePickerNative';

describe('TimePickerNative', () => {
  describe('Default', () => {
    it('Renders a TimePickerNative (select) with default props', () => {
      render(
        <TimePickerNative
          name="timePicker"
          id="timePicker"
          onChange={() => null}
          value={null}
          label="Select Time"
        />,
      );

      const timePicker = screen.getByLabelText('Select Time');

      const expectedTimes = [
        '12:00 AM',
        '12:15 AM',
        '12:30 AM',
        '12:45 AM',
        '01:00 AM',
        '01:15 AM',
      ];
      expect(timePicker).toBeInTheDocument();
      expectedTimes.forEach(time => {
        expect(screen.queryByText(time)).toBeInTheDocument();
      });
    });
  });

  describe('Min/Max & Interval', () => {
    it('Renders correct options based on interval and start end times.', () => {
      render(
        <TimePickerNative
          name="timePicker"
          id="timePicker"
          onChange={() => null}
          value={null}
          label="Select Time"
          interval={3600}
          startTime={{ hour: 9, minute: 0 }}
          endTime={{ hour: 12, minute: 0 }}
        />,
      );

      const timePicker = screen.getByLabelText('Select Time');

      const expectedTimes = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
      ];

      const notExpected = [
        '12:00 PM',
        '12:45 AM',
        '01:00 AM',
        '01:15 AM',
      ];
      expect(timePicker).toBeInTheDocument();
      expectedTimes.forEach(time => {
        expect(screen.queryByText(time)).toBeInTheDocument();
      });

      notExpected.forEach(time => {
        expect(screen.queryByText(time)).toBe(null);
      });
    });
  });

  describe('Custom Date Display', () => {
    it('renders the times based on the options provided', () => {
      render(
        <TimePickerNative
          name="timePicker"
          id="timePicker"
          onChange={() => null}
          value={null}
          label="Select Time"
          dateDisplayOptions={{ hour12: false }}
          startTime={{ hour: 13, minute: 0 }}
          endTime={{ hour: 15, minute: 1 }}
          interval={3600}
        />,
      );

      const timePicker = screen.getByLabelText('Select Time');

      const expectedTimes = [
        '13:00:00',
        '14:00:00',
        '15:00:00',
      ];
      expect(timePicker).toBeInTheDocument();
      expectedTimes.forEach(time => {
        expect(screen.queryByText(time)).toBeInTheDocument();
      });
    });
  });

  describe('Callback Handling', () => {
    it('it fires an onchange callback with the correct value', async () => {
      const mockedHandleChange = jest.fn(() => {}); // eslint-disable-line

      render(
        <TimePickerNative
          name="timePicker"
          id="timePicker"
          onChange={mockedHandleChange}
          value={null}
          label="Select Time"
          dateDisplayOptions={{ hour12: false }}
          startTime={{ hour: 13, minute: 0 }}
          endTime={{ hour: 15, minute: 1 }}
          interval={3600}
        />,
      );

      const timePicker = screen.getByLabelText('Select Time');

      fireEvent.change(timePicker, { target: { value: 'hello' } });

      expect(mockedHandleChange).toBeCalledTimes(1);
    });
  });
});
