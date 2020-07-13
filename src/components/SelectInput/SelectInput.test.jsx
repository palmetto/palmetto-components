import React from 'react';
import Select from 'react-select';
import '@babel/polyfill';
import 'mutationobserver-shim';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event';
import SelectInput from './SelectInput';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

describe('SelectInput', () => {
  describe('Props Validation', () => {
    test('Throws error if required prop "id" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<SelectInput onChange={jest.fn()} options={selectOptions} />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `id`');
    });

    test('Throws error if required prop "onChange" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<SelectInput id="testId" options={selectOptions} />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `onChange`');
    });

    test('Throws error if required prop "options" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<SelectInput id="testId" onChange={jest.fn()} />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `options`');
    });
  });

  describe('Callback Handling', () => {
    // test('it fires onChange callback on change', () => {
    //   const mockedHandleChange = jest.fn();

    //   render(
    //     <SelectInput
    //       id="testId"
    //       onChange={mockedHandleChange}
    //       placeholder="Test Placeholder"
    //       options={selectOptions}
    //     />,
    //   );

    //   fireEvent.blur(screen.getByRole('textbox'));

    //   expect(mockedHandleChange).toBeCalledTimes(1);
    // });

    test('it fires onFocus callback on focus', () => {
      const mockedHandleFocus = jest.fn();

      render(
        <SelectInput
          id="testId"
          onFocus={mockedHandleFocus}
          placeholder="Test Placeholder"
          options={selectOptions}
        />,
      );

      fireEvent.focus(screen.getByRole('textbox'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('it fires onBlur callback on blur', () => {
      const mockedHandleBlur = jest.fn();

      render(
        <SelectInput
          id="testId"
          onBlur={mockedHandleBlur}
          placeholder="Test Placeholder"
          options={selectOptions}
        />,
      );

      fireEvent.blur(screen.getByRole('textbox'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('React-Select', () => {
    describe('single select', () => {
      test('it has no items selected on initial render', () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" />
          </form>,
        );

        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: '' });
      });

      test('it sets the selected value for item that is selected', async () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" />
          </form>,
        );
        await selectEvent.select(screen.getByLabelText('Ice Cream Flavors'), ['Vanilla']);
        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: 'vanilla' });
      });
    });

    describe('multi select', () => {
      test('it has no items selected on initial render', () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" isMulti />
          </form>,
        );

        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: '' });
      });

      test('it allows the selection of multiple items', async () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" isMulti />
          </form>,
        );
        await selectEvent.select(screen.getByLabelText('Ice Cream Flavors'), ['Chocolate', 'Vanilla']);
        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: ['chocolate', 'vanilla'] });

        await selectEvent.select(screen.getByLabelText('Ice Cream Flavors'), 'Strawberry');
        expect(screen.getByTestId('form'))
          .toHaveFormValues({ iceCreamFlavors: ['chocolate', 'vanilla', 'strawberry'] });
      });
    });
  });

  // describe('States', () => {
  //   describe('Default', () => {
  //     test('it renders the button with simple text', () => {
  //       render(
  //         <Button>
  //           Button!
  //         </Button>,
  //       );
  //       const buttonElement = screen.getByText('Button!');

  //       expect(buttonElement).toBeInTheDocument();
  //     });

  //     test('it renders the button with nested dom nodes', () => {
  //       render(
  //         <Button>
  //           <div className="buttonLoadingIndicator">
  //             <div>Im a nested dom node!</div>
  //           </div>
  //         </Button>,
  //       );
  //       const buttonElement = screen.getByText('Im a nested dom node!');

  //       expect(buttonElement).toBeInTheDocument();
  //     });

  //     test('it does not have a disabled attribute', () => {
  //       render(
  //         <Button>
  //           Not Disabled Button
  //         </Button>,
  //       );

  //       expect(screen.getByText('Not Disabled Button').closest('button')).not.toBeDisabled();
  //     });
  //   });

  //   describe('Disabled', () => {
  //     test('it has a disabled attribute', () => {
  //       render(
  //         <Button isDisabled>
  //           Disabled Button
  //         </Button>,
  //       );

  //       expect(screen.getByText('Disabled Button').closest('button')).toBeDisabled();
  //     });
  //   });

  //   describe('Loading', () => {
  //     test('it renders the loading indicator', () => {
  //       render(
  //         <Button isLoading>
  //           Disabled Button
  //         </Button>,
  //       );

  //       expect(screen.getByText('Disabled Button')).toBeNull();
  //     });
  //   });
  // });
});
