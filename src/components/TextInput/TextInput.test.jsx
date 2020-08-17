import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
  describe('Props validation', () => {
    describe('Required value', () => {
      test('Throws error if required prop "value" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(<TextInput label="test input" onChange={() => null} id="myId" />);
        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `value`');
      });
    });

    describe('Required onChange', () => {
      test('Throws error if required prop "onChange" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(<TextInput label="test input" value="hello" id="myId" />);
        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `onChange`');
      });
    });

    describe('Required ID', () => {
      test('Throws error if required prop "id" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(<TextInput label="test input" value="hello" onChange={() => null} />);
        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `id`');
      });
    });

    describe('Required label', () => {
      test('Throws error if required prop "label" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(<TextInput value="hello" onChange={() => null} id="myId" />);
        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `label`');
      });
    });

    describe('Allowed types', () => {
      test('Throws an error if "type" prop is anything other than allowed values', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <TextInput label="test input" id="textInput2" onChange={() => null} value="hello" type="notOnTheList" />,
        );
        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: Invalid prop `type`');
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
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
    });

    describe('onFocus', () => {
      test('Input fires onFocus callback', () => {
        const mockedHandleFocus = jest.fn();
        render(
          <TextInput
            label="test input"
            id="testInput"
            value="hello"
            onChange={() => null}
            onFocus={mockedHandleFocus}
          />,
        );
        const inputElement = screen.getByDisplayValue('hello');
        fireEvent.focus(inputElement);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('Input fires onBlur callback', () => {
        const mockedHandleBlur = jest.fn();
        render(
          <TextInput
            label="test input"
            id="testInput"
            value="hello"
            onChange={() => null}
            onBlur={mockedHandleBlur}
          />,
        );
        const inputElement = screen.getByDisplayValue('hello');
        fireEvent.focus(inputElement);
        fireEvent.blur(inputElement);
        expect(mockedHandleBlur).toBeCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Autofocused', () => {
      test('Input autofocuses if "autoFocus" prop is set to true', () => {
        render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoFocus />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(document.activeElement).toEqual(inputElement);
      });
    });

    describe('With Autocomplete', () => {
      test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
        render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoComplete />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'on');
      });

      test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
        render(
          <TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoComplete={false} />,
        );
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });

      test('Input correctly assigns autocomplete value of "off" when incorrect type is provided', () => {
        render(
          <TextInput
            label="test input"
            id="testInput"
            value="hello"
            onChange={() => null}
            autoComplete={['a', 'random', 'array']}
          />,
        );
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });
    });

    describe('Required', () => {
      test('Input correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
        render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} isRequired />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });
    });

    describe('With Error', () => {
      test('Input correctly displays error message if provided', () => {
        render(<TextInput label="test input" value="hey" onChange={() => null} id="myId" error="You silly goose" />);
        const validationMessageElement = screen.getByText('You silly goose');
        expect(validationMessageElement).toBeInTheDocument();
        expect(validationMessageElement).toHaveTextContent('You silly goose');
      });
    });

    describe('With Max Length', () => {
      test('Input correctly passes maxlength property if prop is passed', async () => {
        render(
          <TextInput
            name="firstName"
            id="firstName"
            label="first name"
            value=""
            maxLength="3"
            onChange={() => null}
          />,
        );

        const inputElement = screen.getByLabelText('first name');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('maxlength');
        expect(inputElement.getAttribute('maxlength')).toBe('3');
      });
    });

    describe('Aria-labelledby', () => {
      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(<TextInput id="testInput" label="test label" value="hello" onChange={() => null} />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('aria-labelledby', 'testInputLabel');
        expect(document.getElementById('testInputLabel')).toBeInTheDocument();
      });

      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(<TextInput
          id="testInput"
          label="hidden label"
          hideLabel
          value="hello"
          onChange={() => null}
        />);
        const inputElement = screen.getByLabelText('hidden label');
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });
  });

  describe('Children props', () => {
    describe('Form Label', () => {
      test('Input correctly passes props to dependency label component', () => {
        render(<TextInput value="hello" onChange={() => null} isRequired id="myId" label="goodbye" error="my error" />);
        const labelElement = screen.getByText('goodbye');
        expect(labelElement).toHaveAttribute('for', 'myId');
        expect(labelElement).toHaveTextContent('goodbye');
        expect(labelElement).toHaveTextContent('*');
        expect(labelElement.getAttribute('class')).toContain('error');
      });
    });
  });

  test('Input correctly passes maxlength property if prop is passed', async () => {
    render(
      <TextInput
        name="firstName"
        id="firstName"
        label="first name"
        value=""
        maxLength="3"
        onChange={() => null}
      />,
    );

    const inputElement = screen.getByLabelText('first name');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('maxlength');
    expect(inputElement.getAttribute('maxlength')).toBe('3');
    expect(inputElement.value).toBe('');
  });

  test('assigns the "aria-labelledby" attribute and renders a label with correct id, when a label is provided', () => {
    render(<TextInput id="testInput" label="test label" value="hello" onChange={() => null} />);
    const inputElement = screen.getByDisplayValue('hello');
    expect(inputElement).toHaveAttribute('aria-labelledby', 'testInputLabel');
    expect(document.getElementById('testInputLabel')).toBeInTheDocument();
  });

  test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
    render(<TextInput
      id="testInput"
      label="hidden label"
      hideLabel
      value="hello"
      onChange={() => null}
    />);
    const inputElement = screen.getByLabelText('hidden label');
    expect(inputElement).not.toHaveAttribute('aria-labelledby');
  });
});
