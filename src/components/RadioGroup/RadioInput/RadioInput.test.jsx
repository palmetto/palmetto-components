import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import { RadioInput } from './RadioInput';

const mockOption = {
  id: 'chocolate',
  value: 'chocolate',
  label: 'Chocolate',
};

const mockedHandleChange = jest.fn();

describe('RadioInput', () => {
  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
          />,
        );

        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.click(radioInput);
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });

      test('calls onChange and passes checked value in event', () => {
        let value = null;
        const mockedHandleChangeWithValue = jest.fn(event => { value = event.target.value; });

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChangeWithValue}
            option={mockOption}
          />,
        );
        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.click(radioInput);
        expect(mockedHandleChange).toBeCalledTimes(1);
        expect(value).toBe('chocolate');
      });
    });

    describe('onFocus', () => {
      test('onFocus event fires callback function', () => {
        const mockedHandleFocus = jest.fn();

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
            onFocus={mockedHandleFocus}
          />,
        );
        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.focus(radioInput);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('onBlur event fires callback function', () => {
        const mockedHandleBlur = jest.fn();

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
            onBlur={mockedHandleBlur}
          />,
        );
        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.blur(radioInput);
        expect(mockedHandleBlur).toBeCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders a radio input', () => {
        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
          />,
        );

        const radioInputElement = screen.getByRole('radio');
        expect(radioInputElement).toBeInTheDocument();
      });

      test('it renders a label', () => {
        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
          />,
        );

        const radioInputLabel = screen.getByLabelText('Chocolate');
        expect(radioInputLabel).toBeInTheDocument();
      });
    });

    describe('Disabled', () => {
      test('the radio input is disabled', () => {
        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
            isDisabled
          />,
        );

        const radioInputElement = screen.getByRole('radio');
        expect(radioInputElement).toBeDisabled();
      });
    });

    describe('Hidden', () => {
      test('the radio input is hidden', () => {
        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
            isHidden
          />,
        );

        const radioInputContainer = screen.getByRole('radio').closest('div');
        expect(radioInputContainer).toHaveClass('hidden');
      });
    });
  });
});
