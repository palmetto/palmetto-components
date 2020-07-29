import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import RadioGroup from './RadioGroup';

const mockOptions = [{
  id: 'purple',
  value: 'purple',
  label: 'Purple',
},
{
  id: 'green',
  value: 'green',
  label: 'Green',
},
{
  id: 'blue',
  value: 'blue',
  label: 'Blue',
}];

describe('RadioGroup', () => {
  describe('Props Validation', () => {
    describe('Required name', () => {
      test('Throws error if required prop "name" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioGroup
            onChange={jest.fn()}
            options={mockOptions}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(2); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `name`');
      });
    });

    describe('Required onChange', () => {
      test('Throws error if required prop "onChange" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioGroup
            name="testName"
            options={mockOptions}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(3); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('The prop `onChange` is marked as required in `RadioGroup`');
        expect(console.error.mock.calls[1][0]) // eslint-disable-line no-console
          .toContain('The prop `onChange` is marked as required in `RadioInput`');
        expect(console.error.mock.calls[2][0]) // eslint-disable-line no-console
          .toContain('You provided a `checked` prop to a form field without an `onChange` handler');
      });
    });

    describe('Required options', () => {
      test('Throws error if required prop "options" is not supplied to component', () => {
        console.error = jest.fn(); // eslint-disable-line no-console
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
          />,
        );

        expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
        expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
          .toContain('Failed prop type: The prop `options`');
      });
    });
  });

  // describe('Callback Handling', () => {
  //   describe('onChange', () => {
  //     test('onChange event fires callback function', () => {
  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChange}
  //           option={mockOption}
  //         />,
  //       );

  //       const radioInput = screen.getByLabelText('Chocolate');
  //       fireEvent.click(radioInput);
  //       expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  //     });

  //     test('calls onChange and passes checked value in event', () => {
  //       let value = null;
  //       const mockedHandleChangeWithValue = jest.fn(event => { value = event.target.value; });

  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChangeWithValue}
  //           option={mockOption}
  //         />,
  //       );
  //       const radioInput = screen.getByLabelText('Chocolate');
  //       fireEvent.click(radioInput);
  //       expect(mockedHandleChange).toBeCalledTimes(1);
  //       expect(value).toBe('chocolate');
  //     });
  //   });

  //   describe('onFocus', () => {
  //     test('onFocus event fires callback function', () => {
  //       const mockedHandleFocus = jest.fn();

  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChange}
  //           option={mockOption}
  //           onFocus={mockedHandleFocus}
  //         />,
  //       );
  //       const radioInput = screen.getByLabelText('Chocolate');
  //       fireEvent.focus(radioInput);
  //       expect(mockedHandleFocus).toBeCalledTimes(1);
  //     });
  //   });

  //   describe('onBlur', () => {
  //     test('onBlur event fires callback function', () => {
  //       const mockedHandleBlur = jest.fn();

  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChange}
  //           option={mockOption}
  //           onBlur={mockedHandleBlur}
  //         />,
  //       );
  //       const radioInput = screen.getByLabelText('Chocolate');
  //       fireEvent.blur(radioInput);
  //       expect(mockedHandleBlur).toBeCalledTimes(1);
  //     });
  //   });
  // });

  // describe('States', () => {
  //   describe('Default', () => {
  //     test('it renders a radio input', () => {
  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChange}
  //           option={mockOption}
  //         />,
  //       );

  //       const radioInputElement = screen.getByRole('radio');
  //       expect(radioInputElement).toBeInTheDocument();
  //     });

  //     test('it renders a label', () => {
  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChange}
  //           option={mockOption}
  //         />,
  //       );

  //       const radioInputLabel = screen.getByLabelText('Chocolate');
  //       expect(radioInputLabel).toBeInTheDocument();
  //     });
  //   });

  //   describe('Disabled', () => {
  //     test('the radio input is disabled', () => {
  //       render(
  //         <RadioInput
  //           name="mockName"
  //           onChange={mockedHandleChange}
  //           option={mockOption}
  //           isDisabled
  //         />,
  //       );

  //       const radioInputElement = screen.getByRole('radio');
  //       expect(radioInputElement).toBeDisabled();
  //     });
  //   });
  // });
});
