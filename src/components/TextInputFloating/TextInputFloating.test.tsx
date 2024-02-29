import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextInputFloating } from './TextInputFloating';

const baseProps = {
  name: 'firstName',
  id: 'firstName',
  label: 'first name',
  value: 'hello',
  onChange: () => null,
  onClear: undefined,
};

describe('TextInput', () => {
  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        const mockedHandleChange = jest.fn(() => null);

        render(
          <TextInputFloating {...baseProps} onChange={mockedHandleChange} />,
        );
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
          <TextInputFloating
            {...baseProps}
            value={value}
            onChange={mockedHandleChange}
          />,
        );

        const inputElement = screen.getByDisplayValue(
          'hello',
        ) as HTMLInputElement;
        expect(inputElement.value).toBe('hello');

        fireEvent.change(inputElement, { target: { value: 'good bye' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);

        rerender(
          <TextInputFloating
            {...baseProps}
            value={value}
            onChange={mockedHandleChange}
          />,
        );
        expect(inputElement.value).toBe('good bye');
      });
    });

    describe('onClear', () => {
      test('onClear prop renders clear icon when input has value', () => {
        render(<TextInputFloating {...baseProps} onClear={() => null} />);
        const clearButton = screen.getByTestId('text-input-clear-button');
        expect(clearButton).toBeInTheDocument();
      });

      test('onClear event fires callback function', () => {
        const mockedHandleClear = jest.fn(() => null);

        render(
          <TextInputFloating {...baseProps} onClear={mockedHandleClear} />,
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
          <TextInputFloating {...baseProps} onFocus={mockedHandleFocus} />,
        );
        const inputElement = screen.getByDisplayValue(baseProps.value);
        fireEvent.focus(inputElement);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('Input fires onBlur callback', () => {
        const mockedHandleBlur = jest.fn();
        render(<TextInputFloating {...baseProps} onBlur={mockedHandleBlur} />);
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
        render(<TextInputFloating {...baseProps} />);

        const labelElement = screen.getByText(baseProps.label);

        expect(labelElement).toBeInTheDocument();
      });
    });

    describe('Autofocused', () => {
      test('Input autofocuses if "autoFocus" prop is set to true', () => {
        render(<TextInputFloating {...baseProps} autoFocus />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(document.activeElement).toEqual(inputElement);
      });
    });

    describe('Autocomplete', () => {
      test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
        render(<TextInputFloating {...baseProps} autoComplete />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(inputElement).toHaveAttribute('autocomplete', 'on');
      });

      test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
        render(<TextInputFloating {...baseProps} autoComplete={false} />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });

      test('Input correctly assigns autocomplete specific value when provided', () => {
        render(<TextInputFloating {...baseProps} autoComplete="email" />);
        const inputElement = screen.getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'email');
      });
    });

    describe('Required', () => {
      test('it correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
        render(<TextInputFloating {...baseProps} isRequired />);

        const inputElement = screen.getByDisplayValue('hello');

        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });
    });

    describe('Error', () => {
      test('Input correctly displays error message if provided', () => {
        render(<TextInputFloating {...baseProps} error="You silly goose" />);

        const validationMessageElement = screen.getByText('You silly goose');

        expect(validationMessageElement).toBeInTheDocument();
        expect(validationMessageElement).toHaveTextContent('You silly goose');
      });
    });

    describe('Help Text', () => {
      test('Input renders help text', async () => {
        const { getByText } = render(
          <TextInputFloating
            {...baseProps}
            value=""
            helpText="i am help text"
          />,
        );

        expect(getByText('i am help text')).toBeDefined();
      });
    });

    describe('Max Length', () => {
      test('Input correctly passes maxlength property if prop is passed', async () => {
        render(<TextInputFloating {...baseProps} value="" maxLength={3} />);

        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('maxlength');
        expect(inputElement.getAttribute('maxlength')).toBe('3');
      });
    });

    describe('Name', () => {
      test('Input correctly passes name property if prop is passed', async () => {
        render(
          <TextInputFloating
            {...baseProps}
            value=""
            name="test floating label"
          />,
        );

        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('name');
        expect(inputElement.getAttribute('name')).toBe('test floating label');
      });
    });

    describe('Aria-labelledby', () => {
      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(<TextInputFloating {...baseProps} />);
        const inputElement = screen.getByDisplayValue(baseProps.value);
        expect(inputElement).toHaveAttribute(
          'aria-labelledby',
          `${baseProps.id}Label`,
        );
        expect(document.getElementById(baseProps.id)).toBeInTheDocument();
      });

      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(<TextInputFloating {...baseProps} hideLabel />);
        const inputElement = screen.getByLabelText(baseProps.label);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });

    describe('Prefix and Suffix', () => {
      test('renders the prefix if specified', () => {
        render(<TextInputFloating {...baseProps} prefix="prefixValue" />);
        expect(screen.getByText('prefixValue')).toBeInTheDocument();
      });

      test('renders the suffix if specified', () => {
        render(<TextInputFloating {...baseProps} suffix="suffixValue" />);
        expect(screen.getByText('suffixValue')).toBeInTheDocument();
      });
    });
  });
});
