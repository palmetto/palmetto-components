import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import CheckboxInput from './CheckboxInput';
import FormLabel from '../FormLabel/FormLabel';

jest.mock('../FormLabel/FormLabel');

describe('CheckboxInput', () => {
  beforeEach(() => {
    FormLabel.mockReturnValue(<div />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('not disabled, checked, or invalid by default', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        isChecked={false}
        onChange={() => null}
      />,
    );
    const checkbox = getByLabelText('test checkbox');

    expect(checkbox.checked).toBe(false);
    expect(checkbox.disabled).toBe(false);
    expect(checkbox.getAttribute('aria-invalid')).toBe('false');
  });

  test('it calls FormLabel with the correct props', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        onChange={() => null}
        isChecked={false}
      />,
    );
    expect(getByLabelText('test checkbox')).toBeDefined();
    expect(FormLabel).toHaveBeenCalledTimes(1);
    expect(FormLabel).toHaveBeenCalledWith({
      inputId: 'testCheckbox',
      hasError: false,
      isFieldRequired: false,
      labelText: 'test checkbox',
      className: '',
    }, {});
  });

  test('it calls FormLabel with the correct props when checkbox is required', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
        onChange={() => null}
        isChecked={false}
        isRequired
      />,
    );
    expect(getByLabelText('test checkbox')).toBeDefined();
    expect(FormLabel).toHaveBeenCalledTimes(1);
    expect(FormLabel).toHaveBeenCalledWith({
      inputId: 'testCheckbox',
      hasError: false,
      isFieldRequired: true,
      labelText: 'test checkbox',
      className: '',
    }, {});
  });

  test('input is checked when isChecked is true', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testCheckbox"
        label="test checkbox"
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
        isChecked={false}
        onChange={() => null}
      />,
    );
    const checkbox = getByLabelText('test checkbox');
    expect(checkbox.checked).toEqual(false);
  });

  test('assigns the "aria-labelledby" attribute and calls FormLabel with expected props', () => {
    const { getByLabelText } = render(
      <CheckboxInput
        id="testInput"
        label="test label"
        value="hello"
        onChange={() => null}
      />,
    );
    expect(getByLabelText('test label')).toHaveAttribute('aria-labelledby', 'testInputLabel');
  });

  describe('error states', () => {
    test('renders error message if error exists and is not true', () => {
      const { getByText } = render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />,
      );
      expect(getByText('This is the error message')).toBeInTheDocument();
    });

    test('calls FormLabel with the correct properties when error is a string', () => {
      render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error="This is the error message"
        />,
      );
      expect(FormLabel).toHaveBeenCalledTimes(1);
      expect(FormLabel).toHaveBeenCalledWith({
        inputId: 'testCheckbox',
        hasError: true,
        isFieldRequired: false,
        labelText: 'test checkbox',
        className: '',
      }, {});
    });

    test('calls FormLabel with the correct properties when error is a true', () => {
      render(
        <CheckboxInput
          id="testCheckbox"
          label="test checkbox"
          isChecked={false}
          onChange={() => null}
          error
        />,
      );
      expect(FormLabel).toHaveBeenCalledTimes(1);
      expect(FormLabel).toHaveBeenCalledWith({
        inputId: 'testCheckbox',
        hasError: true,
        isFieldRequired: false,
        labelText: 'test checkbox',
        className: '',
      }, {});
    });
  });

  describe('onChange', () => {
    test('onChange event fires callback function', () => {
      const mockedHandleChange = jest.fn(() => null);

      const { getByLabelText } = render(
        <CheckboxInput
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
      const mockedHandleChange = jest.fn(event => { value = event.target.checked; });

      const { getByLabelText } = render(
        <CheckboxInput
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
          <CheckboxInput
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
          <CheckboxInput
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
