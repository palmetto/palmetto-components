import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RadioGroup } from './RadioGroup';

const groupOptions = [
  {
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
  },
];

describe('RadioGroup', () => {
  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('onChange event fires callback function', () => {
        const mockHandleChange = jest.fn();

        render(
          <RadioGroup
            name="testName"
            onChange={mockHandleChange}
            options={groupOptions}
          />,
        );

        const radioInput = screen.getByLabelText('Blue');
        fireEvent.click(radioInput);
        expect(mockHandleChange).toHaveBeenCalledTimes(1);
      });

      test('calls onChange and passes checked value in event', () => {
        let value = null;
        const mockedHandleChangeWithValue = jest.fn(event => {
          value = event.target.value;
        });

        render(
          <RadioGroup
            name="testName"
            onChange={mockedHandleChangeWithValue}
            options={groupOptions}
          />,
        );
        const radioInput = screen.getByLabelText('Blue');
        fireEvent.click(radioInput);
        expect(mockedHandleChangeWithValue).toBeCalledTimes(1);
        expect(value).toBe('blue');
      });
    });

    describe('onFocus', () => {
      test('onFocus event fires callback function', () => {
        const mockedHandleFocus = jest.fn();

        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            onFocus={mockedHandleFocus}
          />,
        );
        const radioInput = screen.getByLabelText('Blue');
        fireEvent.focus(radioInput);
        expect(mockedHandleFocus).toBeCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      test('onBlur event fires callback function', () => {
        const mockedHandleBlur = jest.fn();

        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            onBlur={mockedHandleBlur}
          />,
        );
        const radioInput = screen.getByLabelText('Blue');
        fireEvent.blur(radioInput);
        expect(mockedHandleBlur).toBeCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders 3 radio inputs', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
          />,
        );

        const radioInputElements = screen.getAllByRole('radio');
        expect(radioInputElements).toHaveLength(3);
      });

      test('it renders 3 labels', () => {
        render(
          <RadioGroup
            name="mockName"
            onChange={jest.fn()}
            options={groupOptions}
          />,
        );

        const purpleRadioInputLabel = screen.getByLabelText('Purple');
        const greenRadioInputLabel = screen.getByLabelText('Green');
        const blueRadioInputLabel = screen.getByLabelText('Blue');

        expect(purpleRadioInputLabel).toBeInTheDocument();
        expect(greenRadioInputLabel).toBeInTheDocument();
        expect(blueRadioInputLabel).toBeInTheDocument();
      });
    });

    describe('With Title', () => {
      test('it renders the title', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            title="Mock Title"
          />,
        );

        const title = screen.getByText('Mock Title');
        expect(title).toBeInTheDocument();
      });
    });

    describe('With Title and Description', () => {
      test('it renders the title and description', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            title="Mock Title"
            description="Mock Description"
          />,
        );

        const title = screen.getByText('Mock Title');
        const description = screen.getByText('Mock Description');
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });

    describe('Required', () => {
      test('it marks each radio as required', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            title="Mock Title"
            isRequired
          />,
        );

        const purpleRadioInputLabel = screen.getByLabelText('Purple');
        const greenRadioInputLabel = screen.getByLabelText('Green');
        const blueRadioInputLabel = screen.getByLabelText('Blue');

        expect(purpleRadioInputLabel).toHaveAttribute('aria-required', 'true');
        expect(purpleRadioInputLabel).toHaveAttribute('required');
        expect(greenRadioInputLabel).toHaveAttribute('aria-required', 'true');
        expect(greenRadioInputLabel).toHaveAttribute('required');
        expect(blueRadioInputLabel).toHaveAttribute('aria-required', 'true');
        expect(blueRadioInputLabel).toHaveAttribute('required');
      });

      test('it renders default required indicator', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            title="Mock Title"
            isRequired
          />,
        );

        const requiredIndicator = screen.getByText('*');
        expect(requiredIndicator).toBeInTheDocument();
      });
    });

    describe('Pre-Selected Option', () => {
      test('an option is automatically selected', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            value="green"
          />,
        );

        const greenRadioInput = screen.getByLabelText('Green');
        expect(greenRadioInput).toBeChecked();
      });
    });

    describe('Disabled Option', () => {
      test('the group contains a disabled option', () => {
        const disabledOption = {
          id: 'teal',
          value: 'teal',
          label: 'Teal',
          disabled: true,
        };

        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={[...groupOptions, disabledOption]}
          />,
        );

        const disabledRadioInputElements = screen.getAllByRole('radio');
        expect(disabledRadioInputElements[3]).toBeDisabled();
      });
    });

    describe('Disabled Group', () => {
      test('all options in the group are disabled', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            isDisabled
          />,
        );

        const disabledRadioInputElements = screen.getAllByRole('radio');
        expect(disabledRadioInputElements[0]).toBeDisabled();
        expect(disabledRadioInputElements[1]).toBeDisabled();
        expect(disabledRadioInputElements[2]).toBeDisabled();
      });
    });

    describe('Error with Validation Message', () => {
      test('it renders a validation message', () => {
        render(
          <RadioGroup
            name="testName"
            onChange={jest.fn()}
            options={groupOptions}
            error="Helpful Validation Message"
          />,
        );

        const validationMessage = screen.getByText(
          'Helpful Validation Message',
        );
        expect(validationMessage).toBeInTheDocument();
      });
    });
  });
});
