import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput', () => {
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

        const inputElement = screen.getByDisplayValue('hello') as HTMLInputElement;
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

    describe('onClear', () => {
      test('onClear prop renders clear icon when input has value', () => {
        render(
          <TextInput
            name="firstName"
            id="firstName"
            label="first name"
            value="hello"
            onChange={() => null}
            onClear={() => null}
          />,
        );
        const clearButton = screen.getByTestId('text-input-clear-button');
        expect(clearButton).toBeInTheDocument();
      });

      test('onClear event fires callback function', () => {
        const mockedHandleClear = jest.fn(() => null);

        render(
          <TextInput
            name="firstName"
            id="firstName"
            label="first name"
            value="hello"
            onChange={() => null}
            onClear={mockedHandleClear}
          />,
        );
        const clearButton = screen.getByTestId('text-input-clear-button');
        expect(clearButton).toBeInTheDocument();

        fireEvent.click(clearButton);
        expect(mockedHandleClear).toHaveBeenCalledTimes(1);
        fireEvent.keyUp(clearButton, { keyCode: 13 });
        expect(mockedHandleClear).toHaveBeenCalledTimes(2);
        fireEvent.keyUp(clearButton, { keyCode: 99 });
        expect(mockedHandleClear).toHaveBeenCalledTimes(2);
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
    describe('Label', () => {
      test('it renders a label', () => {
        render(
          <TextInput
            label="test input"
            id="testInput"
            value="hello"
            onChange={() => null}
          />,
        );

        const labelElement = screen.getByText('test input');

        expect(labelElement).toBeInTheDocument();
      });
    });

    describe('Autofocused', () => {
      test('Input autofocuses if "autoFocus" prop is set to true', () => {
        render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoFocus />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(document.activeElement).toEqual(inputElement);
      });
    });

    describe('Autocomplete', () => {
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

      test('Input correctly assigns autocomplete specific value when provided', () => {
        render(
          <TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoComplete="email" />,
        );
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'email');
      });
    });

    describe('Required', () => {
      test('it correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
        render(
          <TextInput
            label="test input"
            id="testInput"
            value="hello"
            onChange={() => null}
            isRequired
          />,
        );

        const inputElement = screen.getByDisplayValue('hello');

        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });

      test('it\'s label renders an asterisk indicating that it\'s required', () => {
        render(
          <TextInput
            label="test input"
            id="testInput"
            value="hello"
            onChange={() => null}
            isRequired
          />,
        );

        const labelElement = screen.getByText('test input');

        expect(labelElement).toHaveTextContent('*');
      });
    });

    describe('Error', () => {
      test('the label renders in an error state', () => {
        render(
          <TextInput
            label="test input"
            value="hey"
            onChange={() => null}
            id="myId"
            error="You silly goose"
          />,
        );

        const labelElement = screen.getByText('test input');

        expect(labelElement.getAttribute('class')).toContain('error');
      });

      test('Input correctly displays error message if provided', () => {
        render(
          <TextInput
            label="test input"
            value="hey"
            onChange={() => null}
            id="myId"
            error="You silly goose"
          />,
        );

        const validationMessageElement = screen.getByText('You silly goose');

        expect(validationMessageElement).toBeInTheDocument();
        expect(validationMessageElement).toHaveTextContent('You silly goose');
      });
    });

    describe('Max Length', () => {
      test('Input correctly passes maxlength property if prop is passed', async () => {
        render(
          <TextInput
            name="firstName"
            id="firstName"
            label="first name"
            value=""
            maxLength={3}
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

    // NOTE: due to an unknown bug in the Cleave implementation, we are unable to test change events,
    // but we can at least confirm that the component renders an input when an inputMask is passed.
    describe('Masked', () => {
      test('Properly renders an input when inputMask is passed', () => {
        render(
          <TextInput
            id="testInput"
            label="test label"
            value="hello"
            onChange={() => null}
            inputMask="phone"
            placeholder="phone"
          />,
        );
        const inputElement = screen.getByPlaceholderText('phone');
        expect(inputElement).toBeInTheDocument();
      });
    });
  });
});
