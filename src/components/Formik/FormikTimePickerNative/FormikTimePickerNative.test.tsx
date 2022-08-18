import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  Formik, Form, Field, FormikValues, getIn, setIn,
} from 'formik';
import { FormikTimePickerNative } from './FormikTimePickerNative';

const testLabelName = 'test select';

const handleValidation = (testValueKey:string) => (values:FormikValues) => (
  getIn(values, testValueKey)?.length > 1 ? {} : setIn({}, testValueKey, 'input is required')
);

const renderForm = (
  initialValue: any, // eslint-disable-line
  props: {
    placeholder?: string;
    hideLabel?: boolean;
    isRequired?: unknown;
    isDisabled?: boolean;
    onChange?: jest.Mock<void, [React.ChangeEvent<HTMLSelectElement>]>; // eslint-disable-line
    interval?: number;
  },
  testValueKey = testLabelName,
) => (
  <Formik
    initialValues={{
      [testLabelName]: initialValue,
    }}
    validate={props.isRequired ? handleValidation(testValueKey) : undefined} // eslint-disable-line
    onSubmit={() => {}} // eslint-disable-line
  >
    {() => (
      <Form>
        <Field
          label={testValueKey}
          name={testValueKey}
          id={testValueKey}
          component={FormikTimePickerNative}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);

describe('FormikTimePickerNative', () => {
  describe('States', () => {
    describe('Hidden label, with a placeholder', () => {
      test('it renders input without a visual label, and with a placeholder', () => {
        render(renderForm(undefined, { placeholder: 'Test Placeholder', hideLabel: true }));
        expect(screen.queryByText(testLabelName)).toBeNull();
        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    describe('No Aria-labelledby', () => {
      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(renderForm(undefined, { hideLabel: true }));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(renderForm(undefined, {}));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('HH:MM')).toBeInTheDocument();
      });

      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(renderForm(undefined, {}));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute('aria-labelledby', `${testLabelName}Label`);
        expect(document.getElementById(`${testLabelName}Label`)).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        render(renderForm('2020-10-23T04:30:00.120Z', {}));

        expect(screen.getByText('12:00 AM')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it sets aria-required on the input', () => {
        render(renderForm(undefined, { isRequired: true }));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        render(renderForm(undefined, { isDisabled: true }));

        expect(screen.getByLabelText(testLabelName)).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', async () => {
        const { getByText } = render(renderForm(undefined, { isRequired: true }));
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('input is required')).toBeInTheDocument());
      });

      test('it renders the error message from nested object', async () => {
        const { getByText } = render(
          renderForm({ outer: { nested: [] } }, { isRequired: true }, `${testLabelName}.outer.nested`),
        );
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('input is required')).toBeInTheDocument());
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('Custom onChange event fires callback function, overwriting Formik\'s onChange', async () => {
        let value: string | undefined;
        const mockedHandleChange = jest.fn(event => { event.persist(); });

        const { getByLabelText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const selectInput = getByLabelText(testLabelName);
        fireEvent.change(selectInput, { target: { value: 'hello' } });
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });

      test('it fires onChange callback on change', async () => {
        const mockedHandleChange = jest.fn();

        const { getByLabelText } = render(renderForm(undefined, { onChange: mockedHandleChange }));

        await fireEvent.change(getByLabelText(testLabelName));

        expect(mockedHandleChange).toBeCalledTimes(1);
      });
    });
  });
});
