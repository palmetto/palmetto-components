import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput from './TextInput';

describe('TextInput', () => {
  /**
   * Props Validation
   */
  test('Throws error if required prop "value" is not supplied to component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<TextInput onChange={() => null} id="myId" />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `value`');
  });

  test('Throws error if required prop "onChange" is not supplied to component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<TextInput value="hello" id="myId" />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `onChange`');
  });

  test('Throws error if required prop "id" is not supplied to component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<TextInput value="hello" onChange={() => null} />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `id`');
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
    const mockedHandleChange = jest.fn(() => null);

    render(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value="hello"
        onChange={mockedHandleChange}
      />,
    );
    const inputElement = screen.getByDisplayValue('hello');

    fireEvent.change(inputElement, { target: { value: 'good bye' } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  });

  test('Input value is updated properly when upper state changes', () => {
    let value = 'hello';
    const mockedHandleChange = jest.fn(event => { value = event.target.value; });
    const { rerender } = render(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value={value}
        onChange={mockedHandleChange}
      />,
    );

    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement.value).toBe('hello');

    fireEvent.change(inputElement, { target: { value: 'good bye' } });
    expect(mockedHandleChange).toHaveBeenCalledTimes(1);

    rerender(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value={value}
        onChange={mockedHandleChange}
      />,
    );
    expect(inputElement.value).toBe('good bye');
  });

  test('Input fires onFocus callback', () => {
    const mockedHandleFocus = jest.fn();
    render(<TextInput value="hello" onChange={() => null} onFocus={mockedHandleFocus} />);
    const inputElement = screen.getByDisplayValue('hello');
    fireEvent.focus(inputElement);
    expect(mockedHandleFocus).toBeCalledTimes(1);
  });

  test('Input fires onBlur callback', () => {
    const mockedHandleBlur = jest.fn();
    render(<TextInput value="hello" onChange={() => null} onBlur={mockedHandleBlur} />);
    const inputElement = screen.getByDisplayValue('hello');
    fireEvent.focus(inputElement);
    fireEvent.blur(inputElement);
    expect(mockedHandleBlur).toBeCalledTimes(1);
  });

  test('Input autofocuses if "autoFocus" prop is set to true', () => {
    render(<TextInput value="hello" onChange={() => null} autoFocus />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(document.activeElement).toEqual(inputElement);
  });

  test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
    render(<TextInput value="hello" onChange={() => null} autoComplete />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement).toHaveAttribute('autocomplete', 'on');
  });

  test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
    render(<TextInput value="hello" onChange={() => null} autoComplete={false} />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement).toHaveAttribute('autocomplete', 'off');
  });

  test('Input correctly assigns autocomplete value of "off" when incorrect type is provided', () => {
    render(<TextInput value="hello" onChange={() => null} autoComplete={['a', 'random', 'array']} />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement).toHaveAttribute('autocomplete', 'off');
  });

  test('Input correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
    render(<TextInput value="hello" onChange={() => null} isRequired />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement).toHaveAttribute('aria-required', 'true');
  });

  test('Input correctly passes props to dependency label component', () => {
    render(<TextInput value="hello" onChange={() => null} isRequired id="myId" label="goodbye" error="my error" />);
    const labelElement = screen.getByText('goodbye');
    expect(labelElement).toHaveAttribute('for', 'myId');
    expect(labelElement).toHaveTextContent('goodbye');
    expect(labelElement).toHaveTextContent('*');
    expect(labelElement.getAttribute('class')).toContain('error');
  });

  test('Input correctly displays error message if provided', () => {
    render(<TextInput value="hey" onChange={() => null} id="myId" error="You silly goose" />);
    const validationMessageElement = screen.getByText('You silly goose');
    expect(validationMessageElement).toBeInTheDocument();
    expect(validationMessageElement).toHaveTextContent('You silly goose');
  });
});
