import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
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
      const mockedHandleChange = jest.fn();

      console.error = jest.fn(); // eslint-disable-line no-console
      render(
        <SelectInput
          onChange={mockedHandleChange}
          options={selectOptions}
        />,
      );
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `id`');
    });

    test('Throws error if required prop "onChange" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(
        <SelectInput
          id="testId"
          options={selectOptions}
        />,
      );
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `onChange`');
    });

    test('Throws error if required prop "options" is not supplied to component', () => {
      const mockedHandleChange = jest.fn();

      console.error = jest.fn(); // eslint-disable-line no-console
      render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
        />,
      );
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `options`');
    });
  });

  describe('Callback Handling', () => {
    test('it fires onChange callback on change', async () => {
      const mockedHandleChange = jest.fn();

      const { getByLabelText } = render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          placeholder="Test Placeholder"
          label="onchange test"
          options={selectOptions}
        />,
      );

      await selectEvent.select(getByLabelText('onchange test'), 'Vanilla');

      expect(mockedHandleChange).toBeCalledTimes(1);
    });

    test('it fires onFocus callback on focus', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleFocus = jest.fn();

      render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          onFocus={mockedHandleFocus}
          placeholder="Test Placeholder"
          options={selectOptions}
        />,
      );

      fireEvent.focus(screen.getByRole('textbox'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('it fires onBlur callback on blur', () => {
      const mockedHandleChange = jest.fn();
      const mockedHandleBlur = jest.fn();

      render(
        <SelectInput
          id="testId"
          onChange={mockedHandleChange}
          onBlur={mockedHandleBlur}
          placeholder="Test Placeholder"
          options={selectOptions}
        />,
      );

      fireEvent.blur(screen.getByRole('textbox'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('States', () => {
    describe('No label, with a placeholder', () => {
      test('it renders input without a label, and with a placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            placeholder="Test Placeholder"
            options={selectOptions}
          />,
        );

        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            value={selectOptions[2]}
          />,
        );

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Multi select, no selection', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Multi select, with multiple items selected', () => {
      test('it renders input with a label, and with two items selected', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isMulti
            value={[
              selectOptions[0],
              selectOptions[2],
            ]}
          />,
        );

        expect(screen.getByLabelText('Select Label')).toBeInTheDocument();
        expect(screen.queryByText('Select...')).toBeNull();
        expect(screen.getByText('Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isRequired
          />,
        );

        expect(screen.getByText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            isDisabled
          />,
        );

        expect(screen.getByRole('textbox')).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', () => {
        const mockedHandleChange = jest.fn();

        render(
          <SelectInput
            id="testId"
            onChange={mockedHandleChange}
            label="Select Label"
            options={selectOptions}
            error="Helpful message"
          />,
        );

        expect(screen.getByText('Helpful message')).toBeInTheDocument();
      });
    });
  });
});
