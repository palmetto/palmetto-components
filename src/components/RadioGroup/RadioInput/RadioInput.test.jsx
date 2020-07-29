import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import RadioInput from './RadioInput';

const mockOption = {
  id: 'chocolate',
  value: 'chocolate',
  label: 'Chocolate',
};

describe('RadioInput', () => {
  describe('Props Validation', () => {
    describe('Required name', () => {
      test('Throws error if required prop "name" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioInput
            onChange={() => null}
            option={mockOption}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `name`');
      });
    });

    describe('Required onChange', () => {
      test('Throws error if required prop "onChange" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioInput
            name="testGroup"
            option={mockOption}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(2); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `onChange`');
      });
    });

    // describe('Required option', () => {
    //   test('Throws error if required prop "option" is not supplied to component', () => {
    //     console.error = jest.fn(); // eslint-disable-line no-console
    //     render(
    //       <RadioInput
    //         name="testGroup"
    //         onChange={() => null}
    //       />,
    //     );

    //     expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    //     expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
    //       .toContain('Failed prop type: The prop `option`');
    //   });
    // });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        const mockedHandleChange = jest.fn();

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
          />,
        );

        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.click(radioInput);
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });

      test('calls onChange and passes checked value in event', () => {
        let value = null;
        const mockedHandleChange = jest.fn(event => { value = event.target.value; });

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
          />,
        );
        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.click(radioInput);
        expect(mockedHandleChange).toBeCalledTimes(1);
        expect(value).toBe('chocolate');
      });
    });

    describe('onFocus', () => {
      test('onFocus event fires callback function', () => {
        const mockedHandleChange = jest.fn();
        const mockedHandleFocus = jest.fn();

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
            onFocus={mockedHandleFocus}
          />,
        );
        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.focus(radioInput);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('onBlur event fires callback function', () => {
        const mockedHandleChange = jest.fn();
        const mockedHandleBlur = jest.fn();

        render(
          <RadioInput
            name="mockName"
            onChange={mockedHandleChange}
            option={mockOption}
            onBlur={mockedHandleBlur}
          />,
        );
        const radioInput = screen.getByLabelText('Chocolate');
        fireEvent.blur(radioInput);
        expect(mockedHandleBlur).toBeCalledTimes(1);
      });
    });

    // describe('onBlur', () => {
    //   test('Input fires onBlur callback', () => {
    //     const mockedHandleBlur = jest.fn();
    //     render(
    //       <TextInput
    //         label="test input"
    //         id="testInput"
    //         value="hello"
    //         onChange={() => null}
    //         onBlur={mockedHandleBlur}
    //       />,
    //     );
    //     const inputElement = screen.getByDisplayValue('hello');
    //     fireEvent.focus(inputElement);
    //     fireEvent.blur(inputElement);
    //     expect(mockedHandleBlur).toBeCalledTimes(1);
    //   });
    // });
  });

  // describe('States', () => {
  //   describe('Autofocused', () => {
  //     test('Input autofocuses if "autoFocus" prop is set to true', () => {
  //       render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoFocus />);
  //       const inputElement = screen.getByDisplayValue('hello');
  //       expect(document.activeElement).toEqual(inputElement);
  //     });
  //   });

  //   describe('With Autocomplete', () => {
  //     test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
  //       render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoComplete />);
  //       const inputElement = screen.getByDisplayValue('hello');
  //       expect(inputElement).toHaveAttribute('autocomplete', 'on');
  //     });

  //     test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
  //       render(
  //         <TextInput label="test input" id="testInput" value="hello" onChange={() => null} autoComplete={false} />,
  //       );
  //       const inputElement = screen.getByDisplayValue('hello');
  //       expect(inputElement).toHaveAttribute('autocomplete', 'off');
  //     });

  //     test('Input correctly assigns autocomplete value of "off" when incorrect type is provided', () => {
  //       render(
  //         <TextInput
  //           label="test input"
  //           id="testInput"
  //           value="hello"
  //           onChange={() => null}
  //           autoComplete={['a', 'random', 'array']}
  //         />,
  //       );
  //       const inputElement = screen.getByDisplayValue('hello');
  //       expect(inputElement).toHaveAttribute('autocomplete', 'off');
  //     });
  //   });

  //   describe('Required', () => {
  //     test('Input correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
  //       render(<TextInput label="test input" id="testInput" value="hello" onChange={() => null} isRequired />);
  //       const inputElement = screen.getByDisplayValue('hello');
  //       expect(inputElement).toHaveAttribute('aria-required', 'true');
  //     });
  //   });

  //   describe('With Error', () => {
  //     test('Input correctly displays error message if provided', () => {
  //       render(<TextInput label="test input" value="hey" onChange={() => null} id="myId" error="You silly goose" />);
  //       const validationMessageElement = screen.getByText('You silly goose');
  //       expect(validationMessageElement).toBeInTheDocument();
  //       expect(validationMessageElement).toHaveTextContent('You silly goose');
  //     });
  //   });

  //   describe('With Max Length', () => {
  //     test('Input correctly passes maxlength property if prop is passed', async () => {
  //       render(
  //         <TextInput
  //           name="firstName"
  //           id="firstName"
  //           label="first name"
  //           value=""
  //           maxLength="3"
  //           onChange={() => null}
  //         />,
  //       );

  //       const inputElement = screen.getByLabelText('first name');
  //       expect(inputElement).toBeInTheDocument();
  //       expect(inputElement).toHaveAttribute('maxlength');
  //       expect(inputElement.getAttribute('maxlength')).toBe('3');
  //     });
  //   });

  //   describe('Aria-labelledby', () => {
  //     test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
  //       render(<TextInput id="testInput" label="test label" value="hello" onChange={() => null} />);
  //       const inputElement = screen.getByDisplayValue('hello');
  //       expect(inputElement).toHaveAttribute('aria-labelledby', 'testInputLabel');
  //       expect(document.getElementById('testInputLabel')).toBeInTheDocument();
  //     });

  //     test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
  //       render(<TextInput
  //         id="testInput"
  //         label="hidden label"
  //         hideLabel
  //         value="hello"
  //         onChange={() => null}
  //       />);
  //       const inputElement = screen.getByLabelText('hidden label');
  //       expect(inputElement).not.toHaveAttribute('aria-labelledby');
  //     });
  //   });
  // });

  // describe('Children props', () => {
  //   describe('Form Label', () => {
  //     test('Input correctly passes props to dependency label component', () => {
  //       render(<TextInput value="hello" onChange={() => null} isRequired id="myId" label="goodbye" error="my error" />);
  //       const labelElement = screen.getByText('goodbye');
  //       expect(labelElement).toHaveAttribute('for', 'myId');
  //       expect(labelElement).toHaveTextContent('goodbye');
  //       expect(labelElement).toHaveTextContent('*');
  //       expect(labelElement.getAttribute('class')).toContain('error');
  //     });
  //   });
  // });

  // test('Input correctly passes maxlength property if prop is passed', async () => {
  //   render(
  //     <TextInput
  //       name="firstName"
  //       id="firstName"
  //       label="first name"
  //       value=""
  //       maxLength="3"
  //       onChange={() => null}
  //     />,
  //   );

  //   const inputElement = screen.getByLabelText('first name');
  //   expect(inputElement).toBeInTheDocument();
  //   expect(inputElement).toHaveAttribute('maxlength');
  //   expect(inputElement.getAttribute('maxlength')).toBe('3');
  //   expect(inputElement.value).toBe('');
  // });

  // test('assigns the "aria-labelledby" attribute and renders a label with correct id, when a label is provided', () => {
  //   render(<TextInput id="testInput" label="test label" value="hello" onChange={() => null} />);
  //   const inputElement = screen.getByDisplayValue('hello');
  //   expect(inputElement).toHaveAttribute('aria-labelledby', 'testInputLabel');
  //   expect(document.getElementById('testInputLabel')).toBeInTheDocument();
  // });

  // test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
  //   render(<TextInput
  //     id="testInput"
  //     label="hidden label"
  //     hideLabel
  //     value="hello"
  //     onChange={() => null}
  //   />);
  //   const inputElement = screen.getByLabelText('hidden label');
  //   expect(inputElement).not.toHaveAttribute('aria-labelledby');
  // });
});
