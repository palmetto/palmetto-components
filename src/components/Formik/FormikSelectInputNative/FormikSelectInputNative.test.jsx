import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import { Formik, Form, Field } from 'formik';
import { FormikSelectInputNative } from './FormikSelectInputNative';

const testLabelName = 'test select';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const handleValidation = values => {
  const errors = {};
  if (!values[testLabelName] || values[testLabelName].length < 1) {
    errors[testLabelName] = 'input is required';
  }

  return errors;
};

const renderForm = (initialValue, props) => {
  return (
    <Formik
      initialValues={{
        [testLabelName]: initialValue,
      }}
      validate={props.isRequired ? handleValidation : undefined} // eslint-disable-line
    >
      {() => (
        <Form data-testid="form">
          <Field
            label={testLabelName}
            name={testLabelName}
            id={testLabelName}
            options={selectOptions}
            component={FormikSelectInputNative}
            {...props}
          />
          <button type="submit">submit</button>
        </Form>
      )}
    </Formik>
  );
};

function getByTextWithMarkup(text) {
  return (content, element) => {
    const hasText = node => node.textContent === text;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));

    return elementHasText && childrenDontHaveText;
  };
}

describe('SelectInputNative', () => {
  describe('States', () => {
    describe('Hidden label, with a placeholder', () => {
      test('it renders input without a visual label, and with a placeholder', () => {
        render(renderForm(null, { placeholder: 'Test Placeholder', hideLabel: true }));
        expect(screen.queryByText(testLabelName)).toBeNull();
        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    describe('No Aria-labelledby', () => {
      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(renderForm(null, { hideLabel: true }));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(renderForm(null, {}));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });

      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        render(renderForm(null, {}));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute('aria-labelledby', `${testLabelName}Label`);
        expect(document.getElementById(`${testLabelName}Label`)).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        render(renderForm(selectOptions[2].value, {}));

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        render(renderForm(null, { isRequired: true }));

        expect(screen.getByText(getByTextWithMarkup(`${testLabelName} *`))).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        render(renderForm(null, { isDisabled: true }));

        expect(screen.getByLabelText('test select')).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', async () => {
        const { getByText } = render(renderForm(null, { isRequired: true }));
        const form = screen.getByTestId('form');
        // const submitButton = getByText('submit').closest('button');

        fireEvent.submit(form);
        await waitFor(() => expect(screen.getByText('input is required')).toBeInTheDocument());
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('Custom onChange event fires callback function, overwriting Formik\'s onChange', async () => {
        let value = null;
        const mockedHandleChange = jest.fn(event => { value = event.target.value; });

        const { getByLabelText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const selectInput = getByLabelText(testLabelName);

        fireEvent.change(selectInput);
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
