import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  test('not disabled, checked, or invalid by default', () => {
    const { getByLabelText } = render(
      <Toggle id="testCheckbox" label="test checkbox" isChecked={false} onChange={() => null} />,
    );
    const checkbox = getByLabelText('test checkbox');

    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
    expect(checkbox.getAttribute('aria-invalid')).toBe('false');
  });

  test('input is checked when isChecked is true', () => {
    const { getByLabelText } = render(
      <Toggle id="testCheckbox" label="test checkbox" onChange={() => null} isChecked />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(true);
  });

  test('input is not checked when isChecked is false', () => {
    const { getByLabelText } = render(
      <Toggle id="testCheckbox" label="test checkbox" isChecked={false} onChange={() => null} />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(false);
  });

  test('assigns the "aria-labelledby" attribute', () => {
    const { getByLabelText } = render(
      <Toggle id="testInput" label="test label" value="hello" onChange={() => null} />,
    );
    expect(getByLabelText('test label')).toHaveAttribute('aria-labelledby', 'testInputLabel');
  });

  describe('error states', () => {
    test('renders error message if error exists and is not true', () => {
      const { getByText } = render(
        <Toggle
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />,
      );
      expect(getByText('This is the error message')).toBeInTheDocument();
    });
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <Toggle
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
        <Toggle
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
          <Toggle
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
          <Toggle
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
});
