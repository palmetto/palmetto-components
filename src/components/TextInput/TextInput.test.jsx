import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput from './TextInput';

describe('TextInput', () => {
  /**
   * Props Validation
   */
  test('Throws error if required prop "value" is not supplied to component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<TextInput onChange={() => null} />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `value`');
  });

  test('Throws error if required prop "onChange" is not supplied to component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<TextInput value="hello" />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `onChange`');
  });

  test('Throws an error if "type" prop is anything other than allowed values', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<TextInput onChange={() => null} value="hello" type="notOnTheList" />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: Invalid prop `type`');
  });

  /**
   * Component Functionality
   */
  test('onChange event fires callback function', () => {
    const onChangeMock = jest.fn(() => null);

    render(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value="hello"
        onChange={onChangeMock}
      />,
    );
    const inputElement = screen.getByDisplayValue('hello');

    fireEvent.change(inputElement, { target: { value: 'good bye' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  test('Input value is updated properly when upper state changes', () => {
    let value = 'hello';
    const onChangeMock = jest.fn(event => { value = event.target.value; });
    const { rerender } = render(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value={value}
        onChange={onChangeMock}
      />,
    );

    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement.value).toBe('hello');

    fireEvent.change(inputElement, { target: { value: 'good bye' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    rerender(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value={value}
        onChange={onChangeMock}
      />,
    );
    expect(inputElement.value).toBe('good bye');
  });

  test('Input fires onFocus callback', () => {
    const mockedOnFocus = jest.fn();
    render(<TextInput value="hello" onChange={() => null} onFocus={mockedOnFocus} />);
    const inputElement = screen.getByDisplayValue('hello');
    fireEvent.focus(inputElement);
    expect(mockedOnFocus).toBeCalledTimes(1);
  });

  test('Input fires onBlur callback', () => {
    const mockedOnBlur = jest.fn();
    render(<TextInput value="hello" onChange={() => null} onBlur={mockedOnBlur} />);
    const inputElement = screen.getByDisplayValue('hello');
    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
    expect(mockedOnBlur).toBeCalledTimes(1);
  });

  test('Input autofocuses if "autoFocus" prop is set to true', () => {
    render(<TextInput value="hello" onChange={() => null} autoFocus />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(document.activeElement).toEqual(inputElement);
  });

  /**
   * Snapshots
   * NOTE: Even though 'id' is not a required prop for this component we must provide it for the test
   * to pass since the component will otherwise generate a uuid which means the snapshot is different every time.
   */
  test('Matches the snapshot for component with default props', () => {
    const { asFragment } = render(<TextInput value="" onChange={() => null} id="myId" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Matches the snapshot for a disabled input', () => {
    const { asFragment } = render(<TextInput value="" onChange={() => null} id="myId" isDisabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Matches the snapshot for a required input', () => {
    const { asFragment } = render(<TextInput value="" onChange={() => null} id="myId" isRequired />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Matches the snapshot for an input with an error but no validation message', () => {
    const { asFragment } = render(<TextInput value="" onChange={() => null} id="myId" error />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Matches the snapshot for an input with an error and a validation message', () => {
    const { asFragment } = render(<TextInput value="" onChange={() => null} id="myId" error="You silly goose" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
