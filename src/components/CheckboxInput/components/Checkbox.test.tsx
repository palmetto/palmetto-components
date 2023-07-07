import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('Default', () => {
    test('It renders a checkbox input and checkbox-btn svg icon element', () => {
      render(
        <Checkbox
          id="testCheckbox"
          label="test checkbox"
          onChange={jest.fn(() => null)}
          isChecked={false}
        />,
      );

      const input = screen.getByLabelText('test checkbox');
      expect(input).toBeInTheDocument();
      expect(screen.getByTestId('icon-testid--checkbox-btn')).toBeInTheDocument();
    });
  });

  describe('Checked', () => {
    test('It renders a checked checkbox input element and checkbox-btn-checked svg icon', () => {
      render(
        <Checkbox
          id="testCheckbox"
          label="test checkbox"
          onChange={jest.fn(() => null)}
          isChecked
        />,
      );

      const input = screen.getByLabelText('test checkbox');
      expect(input).toHaveAttribute('checked');
      expect(screen.getByTestId('icon-testid--checkbox-btn-checked')).toBeInTheDocument();
    });
  });

  describe('Indeterminate', () => {
    test('It renders an indeterminate icon if isIndeterminate is true and checkbox is checked', () => {
      render(
        <Checkbox
          id="testCheckbox"
          label="test checkbox"
          onChange={jest.fn(() => null)}
          isChecked
          isIndeterminate
        />,
      );

      const input = screen.getByLabelText('test checkbox');
      expect(input).toHaveAttribute('checked');
      expect(screen.getByTestId('icon-testid--checkbox-btn-indeterminate')).toBeInTheDocument();
    });

    test('It renders an indeterminate icon if isIndeterminate is true and checkbox is unchecked', () => {
      render(
        <Checkbox
          id="testCheckbox"
          label="test checkbox"
          onChange={jest.fn(() => null)}
          isChecked={false}
          isIndeterminate
        />,
      );

      expect(screen.getByTestId('icon-testid--checkbox-btn-indeterminate')).toBeInTheDocument();
    });
  });

  describe('Disabled', () => {
    test('input element is disabled', () => {
      render(
        <Checkbox
          isChecked={false}
          id="testCheckbox"
          label="test checkbox"
          onChange={jest.fn(() => null)}
          isDisabled
        />,
      );

      const input = screen.getByLabelText('test checkbox');
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <Checkbox
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={mockedHandleChange}
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onChange and passes checked value in event', () => {
      let value = true;
      const mockedHandleChange = jest.fn(event => {
        value = event.target.checked;
      });

      const { getByLabelText } = render(
        <Checkbox
          id="testCheckbox"
          label="test checkbox"
          onChange={mockedHandleChange}
          isChecked={value}
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toBeCalledTimes(1);
      expect(value).toBe(false);
    });
  });

  describe('onFocus', () => {
    test('onFocus event fires callback function if defined', () => {
      const mockedHandleFocus = jest.fn(() => null);

      const { getByText, getByLabelText } = render(
        <div>
          <button type="button">focus</button>
          <Checkbox
            id="testCheckbox"
            label="test checkbox"
            isChecked={false}
            onChange={() => null}
            onFocus={mockedHandleFocus}
            onBlur={undefined}
          />
        </div>,
      );
      getByLabelText('test checkbox').focus();
      getByText('focus').focus();
      expect(mockedHandleFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur', () => {
    test('onBlur event fires callback function if defined', () => {
      const mockedHandleBlur = jest.fn(() => null);

      const { getByText, getByLabelText } = render(
        <div>
          <button type="button">focus</button>
          <Checkbox
            id="testCheckbox"
            label="test checkbox"
            isChecked={false}
            onChange={() => null}
            onBlur={mockedHandleBlur}
          />
        </div>,
      );
      getByLabelText('test checkbox').focus();
      getByText('focus').focus();
      expect(mockedHandleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Hidden', () => {
    test('the radio input is hidden', () => {
      const mockedHandleChange = jest.fn(() => {}); // eslint-disable-line

      render(
        <Checkbox
          id="mockId"
          name="mockName"
          onChange={mockedHandleChange}
          isHidden
          isChecked
          label="mockLabel"
        />,
      );

      const checkboxInputContainer = screen.getByRole('checkbox').closest('div');
      expect(checkboxInputContainer).toHaveClass('hidden');
    });
  });
});
