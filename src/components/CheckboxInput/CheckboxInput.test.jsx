import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CheckboxInput from './CheckboxInput';

describe('CheckboxInput', () => {
  test('not disabled, checked, or invalid by default', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        value="hello"
        onChange={() => null}
      />,
    );
    const checkbox = getByLabelText('test checkbox');

    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
    expect(checkbox.getAttribute('aria-invalid')).toBe('false');
  });

  test('it renders the label if provided', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        value="hello"
        onChange={() => null}
      />,
    );
    expect(getByLabelText('test checkbox')).toBeDefined();
  });

  test('input is checked when isChecked is true', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        value="hello"
        onChange={() => null}
        isChecked
      />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(true);
  });

  test('input is not checked when isChecked is false', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        value="hello"
        onChange={() => null}
        isChecked={false}
      />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(false);
  });

  test('assigns the "aria-labelledby" attribute and renders a label with correct id, when a label is provided', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testInput"
        label="test label"
        value="hello"
        onChange={() => null}
      />,
    );
    expect(getByLabelText('test label')).toHaveAttribute('aria-labelledby', 'testInputLabel');
    expect(document.getElementById('testInputLabel')).toBeInTheDocument();
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          value="hello"
          onChange={mockedHandleChange}
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onChange with true when isCheck is false', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          value="hello"
          onChange={mockedHandleChange}
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toHaveBeenCalledWith(true);
    });

    test('calls onChange with false when isChecked when true', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          value="hello"
          onChange={mockedHandleChange}
          isChecked
        />,
      );
      const checkbox = getByLabelText('test checkbox');
      fireEvent.click(checkbox);
      expect(mockedHandleChange).toHaveBeenCalledWith(false);
    });
  });
});
