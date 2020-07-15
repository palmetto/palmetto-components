import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import selectEvent from 'react-select-event';
import { Formik, Form, Field } from 'formik';
import FormikSelectInput from './FormikSelectInput';
import SelectInput from '../../SelectInput/SelectInput';

const testLabelName = 'test select';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const handleValidation = values => {
  const errors = {};
  if (values[testLabelName].length < 1) {
    errors[testLabelName] = 'input is required';
  }

  return errors;
};

const renderForm = (initialValue, props) => (
  <Formik
    initialValues={{
      [testLabelName]: initialValue,
    }}
    validate={props.isRequired ? handleValidation : undefined} // eslint-disable-line
    render={() => (
      <Form>
        <Field
          label={testLabelName}
          name={testLabelName}
          id={testLabelName}
          component={FormikSelectInput}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  />
);

describe('SelectInput', () => {
  describe('States', () => {
    describe('Hidden label, with a placeholder', () => {
      test('it renders input without a visual label, and with a placeholder', () => {
        render(renderForm([], { placeholder: 'Test Placeholder', hideLabel: true }));
        expect(screen.queryByText(testLabelName)).toBeNull();
        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    describe('No Aria-labelledby', () => {
      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(renderForm([], { hideLabel: true }));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(renderForm([], {}));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });

      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(renderForm([], {}));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute('aria-labelledby', `${testLabelName}Label`);
        expect(document.getElementById(`${testLabelName}Label`)).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        render(renderForm(selectOptions[2], {}));

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Multi select, no selection', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(renderForm([], { isMulti: true }));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Multi select, with multiple items selected', () => {
      test('it renders input with a label, and with two items selected', () => {
        render(renderForm([selectOptions[0], selectOptions[2]], { isMulti: true }));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.queryByText('Select...')).toBeNull();
        expect(screen.getByText('Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        render(renderForm([], { isRequired: true }));

        expect(screen.getByText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        render(renderForm([], { isDisabled: true }));

        expect(screen.getByRole('textbox')).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', async () => {
        const { getByText } = render(renderForm([], { isRequired: true }));
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('input is required')).toBeInTheDocument());
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('Custom onChange event fires callback function, overwriting Formik\'s onChange', async () => {
        let value = [];
        const mockedHandleChange = jest.fn(event => { value = event.target.value; });

        const { getByLabelText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const input = getByLabelText(testLabelName);

        await selectEvent.select(input, 'Vanilla');
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
        expect(value).toBe('Vanilla');
      });
    });
  });
});
