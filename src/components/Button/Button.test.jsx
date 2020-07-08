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
  /**
   * Props Validation
   */
  test('Throws error if required prop "children" is not supplied to component', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    render(<Button />);
    expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
      .toContain('Failed prop type: The prop `children`');
  });

  /**
   * Component Functionality
   */
  describe('callback handling', () => {
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

  test('Button correctly generates a uuid if none is provided', () => {
    render(
      <Button>
        Button!
      </Button>,
    );
    const buttonElement = screen.getByText('Button!').closest('button');

    expect(validateUuid(buttonElement.id)).toBe(true);
  });

  describe('the default state', () => {
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

    test('it does not a disabled attribute', () => {
      render(
        <Button>
          Not Disabled Button
        </Button>,
      );

      expect(screen.getByText('Not Disabled Button').closest('button')).not.toBeDisabled();
    });
  });

  describe('the disabled state', () => {
    test('it has a disabled attribute', () => {
      render(
        <Button isDisabled>
          Disabled Button
        </Button>,
      );

      expect(screen.getByText('Disabled Button').closest('button')).toBeDisabled();
    });
  });

  // describe('the loading state', () => {
  //   test('it renders the loading indicator', () => {
  //     render(
  //       <Button isLoading>
  //         Disabled Button
  //       </Button>,
  //     );

  //     expect(screen.getByText('Disabled Button')).toBeNull();
  //   });
  // });

















  // test('Input value is updated properly when upper state changes', () => {
  //   let value = 'hello';
  //   const mockedHandleChange = jest.fn(event => { value = event.target.value; });
  //   const { rerender } = render(
  //     <TextInput
  //       name="firstName"
  //       id="firstName"
  //       label="first name"
  //       value={value}
  //       onChange={mockedHandleChange}
  //     />,
  //   );

  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(inputElement.value).toBe('hello');

  //   fireEvent.change(inputElement, { target: { value: 'good bye' } });
  //   expect(mockedHandleChange).toHaveBeenCalledTimes(1);

  //   rerender(
  //     <TextInput
  //       name="firstName"
  //       id="firstName"
  //       label="first name"
  //       value={value}
  //       onChange={mockedHandleChange}
  //     />,
  //   );
  //   expect(inputElement.value).toBe('good bye');
  // });

  // test('Input fires onFocus callback', () => {
  //   const mockedHandleFocus = jest.fn();
  //   render(<TextInput value="hello" onChange={() => null} onFocus={mockedHandleFocus} />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   fireEvent.focus(inputElement);
  //   expect(mockedHandleFocus).toBeCalledTimes(1);
  // });

  // test('Input fires onBlur callback', () => {
  //   const mockedHandleBlur = jest.fn();
  //   render(<TextInput value="hello" onChange={() => null} onBlur={mockedHandleBlur} />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   fireEvent.focus(inputElement);
  //   fireEvent.blur(inputElement);
  //   expect(mockedHandleBlur).toBeCalledTimes(1);
  // });

  // test('Input autofocuses if "autoFocus" prop is set to true', () => {
  //   render(<TextInput value="hello" onChange={() => null} autoFocus />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(document.activeElement).toEqual(inputElement);
  // });

  // test('Input correctly generates a uuid if none is provided', () => {
  //   render(<TextInput value="hello" onChange={() => null} />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(validateUuid(inputElement.id)).toBe(true);
  // });

  // test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
  //   render(<TextInput value="hello" onChange={() => null} autoComplete />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(inputElement).toHaveAttribute('autocomplete', 'on');
  // });

  // test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
  //   render(<TextInput value="hello" onChange={() => null} autoComplete={false} />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(inputElement).toHaveAttribute('autocomplete', 'off');
  // });

  // test('Input correctly assigns autocomplete value of "off" when incorrect type is provided', () => {
  //   render(<TextInput value="hello" onChange={() => null} autoComplete={['a', 'random', 'array']} />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(inputElement).toHaveAttribute('autocomplete', 'off');
  // });

  // test('Input correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
  //   render(<TextInput value="hello" onChange={() => null} isRequired />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(inputElement).toHaveAttribute('aria-required', 'true');
  // });

  // test('Input correctly passes props to dependency label component', () => {
  //   render(<TextInput value="hello" onChange={() => null} isRequired id="myId" label="goodbye" error="my error" />);
  //   const labelElement = screen.getByText('goodbye');
  //   expect(labelElement).toHaveAttribute('for', 'myId');
  //   expect(labelElement).toHaveTextContent('goodbye');
  //   expect(labelElement).toHaveTextContent('*');
  //   expect(labelElement.getAttribute('class')).toContain('error');
  // });

  // test('Input correctly displays error message if provided', () => {
  //   render(<TextInput value="hey" onChange={() => null} id="myId" error="You silly goose" />);
  //   const validationMessageElement = screen.getByText('You silly goose');
  //   expect(validationMessageElement).toBeInTheDocument();
  //   expect(validationMessageElement).toHaveTextContent('You silly goose');
  // });
});
