import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import validateUuid from '../../lib/validateUuid';
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

  describe('Callback Handling', () => {
    test('Button fires onClick callback', () => {
      const mockedHandleClick = jest.fn();

      render(<Button onClick={mockedHandleClick}>Click</Button>);

      fireEvent.click(screen.getByText('Click').closest('button'));

      expect(mockedHandleClick).toBeCalledTimes(1);
    });

    test('Button fires onFocus callback', () => {
      const mockedHandleFocus = jest.fn();

      render(<Button onFocus={mockedHandleFocus}>Focus</Button>);

      fireEvent.focus(screen.getByText('Focus').closest('button'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('Button fires onBlur callback', () => {
      const mockedHandleBlur = jest.fn();

      render(<Button onBlur={mockedHandleBlur}>Blur</Button>);

      fireEvent.blur(screen.getByText('Blur').closest('button'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('Automatic ID Generator', () => {
    test('Button correctly generates a uuid if none is provided', () => {
      render(
        <Button>
          Button!
        </Button>,
      );
      const buttonElement = screen.getByText('Button!').closest('button');

      expect(validateUuid(buttonElement.id)).toBe(true);
    });
  });

  describe('States', () => {
    describe('Default State', () => {
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

    describe('Disabled State', () => {
      test('it has a disabled attribute', () => {
        render(
          <Button isDisabled>
            Disabled Button
          </Button>,
        );

        expect(screen.getByText('Disabled Button').closest('button')).toBeDisabled();
      });
    });

    describe('Loading State', () => {
      test('it renders the loading indicator', () => {
        render(
          <Button isLoading>
            Disabled Button
          </Button>,
        );

        expect(screen.getByText('Disabled Button')).toBeNull();
      });
    });
  });
});
