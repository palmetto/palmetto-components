import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextareaInput } from './TextareaInput';

const baseProps = {
  name: 'firstName',
  id: 'firstName',
  label: 'first name',
  value: 'hello',
  onChange: () => null,
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

describe('TextareaInput', () => {
  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        const mockedHandleChange = jest.fn(() => null);

        render(<TextareaInput {...baseProps} onChange={mockedHandleChange} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);

        fireEvent.change(inputElement, { target: { value: 'good bye' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });

      test('Input value is updated properly when upper state changes', () => {
        let value = 'hello';
        const mockedHandleChange = jest.fn(event => {
          value = event.target.value;
        });
        const { rerender } = render(
          <TextareaInput {...baseProps} value={value} onChange={mockedHandleChange} />,
        );

        const inputElement = screen.getByDisplayValue('hello') as HTMLInputElement;
        expect(inputElement.value).toBe('hello');

        fireEvent.change(inputElement, { target: { value: 'good bye' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);

        rerender(<TextareaInput {...baseProps} value={value} onChange={mockedHandleChange} />);
        expect(inputElement.value).toBe('good bye');
      });
    });

    describe('onFocus', () => {
      test('Input fires onFocus callback', () => {
        const mockedHandleFocus = jest.fn();
        render(<TextareaInput {...baseProps} onFocus={mockedHandleFocus} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        fireEvent.focus(inputElement);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('Input fires onBlur callback', () => {
        const mockedHandleBlur = jest.fn();
        render(<TextareaInput {...baseProps} onBlur={mockedHandleBlur} />);
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
        render(<TextareaInput {...baseProps} />);

        const labelElement = screen.getByText(baseProps.label);

        expect(labelElement).toBeInTheDocument();
      });
    });

    describe('Autofocused', () => {
      test('Input autofocuses if "autoFocus" prop is set to true', () => {
        render(<TextareaInput {...baseProps} autoFocus />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(document.activeElement).toEqual(inputElement);
      });
    });

    describe('Autocomplete', () => {
      test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
        render(<TextareaInput {...baseProps} autoComplete />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(inputElement).toHaveAttribute('autocomplete', 'on');
      });

      test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
        render(<TextareaInput {...baseProps} autoComplete={false} />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });

      test('Input correctly assigns autocomplete specific value when provided', () => {
        render(<TextareaInput {...baseProps} autoComplete="email" />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'email');
      });
    });

    describe('Required', () => {
      test('it correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
        render(<TextareaInput {...baseProps} isRequired />);

        const inputElement = screen.getByDisplayValue('hello');

        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });

      test("it's label renders an asterisk indicating that it's required", () => {
        render(<TextareaInput {...baseProps} isRequired />);

        const labelElement = screen.getByText(getByTextWithMarkup(`${baseProps.label} *`));

        expect(labelElement).toBeInTheDocument();
      });
    });

    describe('Error', () => {
      test('Input correctly displays error message if provided', () => {
        render(<TextareaInput {...baseProps} error="You silly goose" />);

        const validationMessageElement = screen.getByText('You silly goose');

        expect(validationMessageElement).toBeInTheDocument();
        expect(validationMessageElement).toHaveTextContent('You silly goose');
      });
    });

    describe('Max Length', () => {
      test('Input correctly passes maxlength property if prop is passed', async () => {
        render(<TextareaInput {...baseProps} value="" maxLength={3} />);

        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('maxlength');
        expect(inputElement.getAttribute('maxlength')).toBe('3');
      });
    });

    describe('Aria-labelledby', () => {
      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(<TextareaInput {...baseProps} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(inputElement).toHaveAttribute('aria-labelledby', `${baseProps.id}Label`);
        expect(document.getElementById(baseProps.id)).toBeInTheDocument();
      });

      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(<TextareaInput {...baseProps} hideLabel />);
        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });
  });
});
