import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextInput } from './TextInput';

const baseProps = {
  name: 'firstName',
  id: 'firstName',
  label: 'first name',
  value: 'hello',
  onChange: () => null,
  onClear: undefined,
};

function getByTextWithMarkup(text: string) {
  // eslint-disable-next-line
  // @ts-ignore
  return (content, element) => {
    const hasText = (node: Element) => node.textContent === text;
    const elementHasText = hasText(element);
    // eslint-disable-next-line
    // @ts-ignore
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));

    return elementHasText && childrenDontHaveText;
  };
}

describe('TextInput', () => {
  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        const mockedHandleChange = jest.fn(() => null);

        render(<TextInput {...baseProps} onChange={mockedHandleChange} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);

        fireEvent.change(inputElement, { target: { value: 'good bye' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });

      test('onChange event fires callback function with masked input', () => {
        let value = '123';
        const mockedHandleChange = jest.fn(event => {
          value = event.target.value;
        });

        const { rerender } = render(
          <TextInput
            {...baseProps}
            value={value}
            onChange={mockedHandleChange}
            inputMask="phone"
          />,
        );
        const inputElement = screen.getByDisplayValue('(123)');

        fireEvent.change(inputElement, { target: { value: 'good bye' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);

        rerender(
          <TextInput
            {...baseProps}
            value={value}
            onChange={mockedHandleChange}
            inputMask="phone"
          />,
        );
        expect((inputElement as HTMLInputElement).value).toBe('');

        fireEvent.change(inputElement, { target: { value: '12381238' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(2);

        rerender(
          <TextInput
            {...baseProps}
            value={value}
            onChange={mockedHandleChange}
            inputMask="phone"
          />,
        );
        expect((inputElement as HTMLInputElement).value).toBe('(123) 812-38');
      });

      test('Input value is updated properly when upper state changes', () => {
        let value = 'hello';
        const mockedHandleChange = jest.fn(event => {
          value = event.target.value;
        });
        const { rerender } = render(
          <TextInput {...baseProps} value={value} onChange={mockedHandleChange} />,
        );

        const inputElement = screen.getByDisplayValue('hello') as HTMLInputElement;
        expect(inputElement.value).toBe('hello');

        fireEvent.change(inputElement, { target: { value: 'good bye' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);

        rerender(<TextInput {...baseProps} value={value} onChange={mockedHandleChange} />);
        expect(inputElement.value).toBe('good bye');
      });
    });

    describe('onClear', () => {
      test('onClear prop renders clear icon when input has value', () => {
        render(<TextInput {...baseProps} onClear={() => null} />);
        const clearButton = screen.getByTestId('text-input-clear-button');
        expect(clearButton).toBeInTheDocument();
      });

      test('onClear event fires callback function', () => {
        const mockedHandleClear = jest.fn(() => null);

        render(<TextInput {...baseProps} onClear={mockedHandleClear} />);
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
        render(<TextInput {...baseProps} onFocus={mockedHandleFocus} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        fireEvent.focus(inputElement);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('Input fires onBlur callback', () => {
        const mockedHandleBlur = jest.fn();
        render(<TextInput {...baseProps} onBlur={mockedHandleBlur} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        fireEvent.focus(inputElement);
        fireEvent.blur(inputElement);
        expect(mockedHandleBlur).toBeCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Label', () => {
      test('it renders a label', () => {
        render(<TextInput {...baseProps} />);

        const labelElement = screen.getByText(baseProps.label);

        expect(labelElement).toBeInTheDocument();
      });
    });

    describe('Autofocused', () => {
      test('Input autofocuses if "autoFocus" prop is set to true', () => {
        render(<TextInput {...baseProps} autoFocus />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(document.activeElement).toEqual(inputElement);
      });
    });

    describe('Autocomplete', () => {
      test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
        render(<TextInput {...baseProps} autoComplete />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(inputElement).toHaveAttribute('autocomplete', 'on');
      });

      test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
        render(<TextInput {...baseProps} autoComplete={false} />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });

      test('Input correctly assigns autocomplete specific value when provided', () => {
        render(<TextInput {...baseProps} autoComplete="email" />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'email');
      });
    });

    describe('Required', () => {
      test('it correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
        render(<TextInput {...baseProps} isRequired />);

        const inputElement = screen.getByDisplayValue('hello');

        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });

      test("it's label renders an asterisk indicating that it's required", () => {
        render(<TextInput {...baseProps} isRequired />);

        const labelElement = screen.getByText(getByTextWithMarkup(`${baseProps.label} *`));

        expect(labelElement).toBeInTheDocument();
      });
    });

    describe('Error', () => {
      test('Input correctly displays error message if provided', () => {
        render(<TextInput {...baseProps} error="You silly goose" />);

        const validationMessageElement = screen.getByText('You silly goose');

        expect(validationMessageElement).toBeInTheDocument();
        expect(validationMessageElement).toHaveTextContent('You silly goose');
      });
    });

    describe('Max Length', () => {
      test('Input correctly passes maxlength property if prop is passed', async () => {
        render(<TextInput {...baseProps} value="" maxLength={3} />);

        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('maxlength');
        expect(inputElement.getAttribute('maxlength')).toBe('3');
      });
    });

    describe('Aria-labelledby', () => {
      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(<TextInput {...baseProps} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(inputElement).toHaveAttribute('aria-labelledby', `${baseProps.id}Label`);
        expect(document.getElementById(baseProps.id)).toBeInTheDocument();
      });

      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(<TextInput {...baseProps} hideLabel />);
        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });

      describe('Prefix and Suffix', () => {
        test('renders the prefix if specified', () => {
          render(<TextInput {...baseProps} prefix="prefixValue" />);
          expect(screen.getByText('prefixValue')).toBeInTheDocument();
        });

        test('renders the suffix if specified', () => {
          render(<TextInput {...baseProps} suffix="suffixValue" />);
          expect(screen.getByText('suffixValue')).toBeInTheDocument();
        });
      });
    });

    // NOTE: due to an unknown bug in the Cleave implementation, we are unable to test change events,
    // but we can at least confirm that the component renders an input when an inputMask is passed.
    describe('Masked', () => {
      test('Properly renders an input when inputMask is passed', () => {
        render(<TextInput {...baseProps} inputMask="phone" placeholder="phone" />);
        const inputElement = screen.getByPlaceholderText('phone');
        expect(inputElement).toBeInTheDocument();
      });
    });
  });
});
