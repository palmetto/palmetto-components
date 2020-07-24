import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  describe('Props Validation', () => {
    test('Throws error if required prop "children" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<Button />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `children`');
    });
  });

  describe('Type', () => {
    test('Sets the html button type to "button" by default', () => {
      render(<Button>Default Button Type</Button>);

      const testBtn = screen.getByText('Default Button Type').closest('button');
      expect(testBtn.getAttribute('type')).toBe('button');
    });
    test('Sets the html button type to "submit" if specified', () => {
      render(<Button type="submit">Submit Button</Button>);

      const testBtn = screen.getByText('Submit Button').closest('button');
      expect(testBtn.getAttribute('type')).toBe('submit');
    });
    test('Sets the html button type to "reset" if specified', () => {
      render(<Button type="reset">Reset Button</Button>);

      const testBtn = screen.getByText('Reset Button').closest('button');
      expect(testBtn.getAttribute('type')).toBe('reset');
    });
  });

  describe('Callback Handling', () => {
    test('Button fires onClick callback', () => {
      const mockedHandleClick = jest.fn();

      render(<Button onClick={mockedHandleClick}>Click</Button>);

      fireEvent.click(screen.getByText('Click').closest('button'));

      expect(mockedHandleClick).toBeCalledTimes(1);
    });

    test('Button does not fire function if onClick callback not provided', () => {
      const mockedHandleClick = jest.fn();

      render(<Button>Click</Button>);

      fireEvent.click(screen.getByText('Click').closest('button'));

      expect(mockedHandleClick).toBeCalledTimes(0);
    });

    test('Button fires onFocus callback', () => {
      const mockedHandleFocus = jest.fn();

      render(<Button onFocus={mockedHandleFocus}>Focus</Button>);

      fireEvent.focus(screen.getByText('Focus').closest('button'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('Button does not fire function of onFocus callback not provided', () => {
      const mockedHandleFocus = jest.fn();

      render(<Button>Focus</Button>);

      fireEvent.focus(screen.getByText('Focus').closest('button'));

      expect(mockedHandleFocus).toBeCalledTimes(0);
    });

    test('Button fires onBlur callback', () => {
      const mockedHandleBlur = jest.fn();

      render(<Button onBlur={mockedHandleBlur}>Blur</Button>);

      fireEvent.blur(screen.getByText('Blur').closest('button'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });

    test('Button does not fire onBlur callback if not provided', () => {
      const mockedHandleBlur = jest.fn();

      render(<Button>Blur</Button>);

      fireEvent.blur(screen.getByText('Blur').closest('button'));

      expect(mockedHandleBlur).toBeCalledTimes(0);
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders the button with simple text', () => {
        render(
          <Button>
            Button!
          </Button>,
        );
        const buttonElement = screen.getByText('Button!');

        expect(buttonElement).toBeInTheDocument();
      });

      test('it renders the button with nested dom nodes', () => {
        render(
          <Button>
            <div className="buttonLoadingIndicator">
              <div>Im a nested dom node!</div>
            </div>
          </Button>,
        );
        const buttonElement = screen.getByText('Im a nested dom node!');

        expect(buttonElement).toBeInTheDocument();
      });

      test('it does not have a disabled attribute', () => {
        render(
          <Button>
            Not Disabled Button
          </Button>,
        );

        expect(screen.getByText('Not Disabled Button').closest('button')).not.toBeDisabled();
      });
    });

    describe('Disabled', () => {
      test('it has a disabled attribute', () => {
        render(
          <Button isDisabled>
            Disabled Button
          </Button>,
        );

        expect(screen.getByText('Disabled Button').closest('button')).toBeDisabled();
      });
    });

    describe('Loading', () => {
      test('it renders the spinning loading indicator', () => {
        render(
          <Button isLoading>
            Button is loading
          </Button>,
        );
        expect(document.getElementsByClassName('spinner')[0]).toBeInTheDocument();
      });
      test('it keeps the button text in the dom so the button width does not change', () => {
        render(
          <Button isLoading>
            Button is loading
          </Button>,
        );
        expect(screen.getByText('Button is loading')).toBeInTheDocument();
      });
    });
  });
});
