import React from 'react';
import {
  render, fireEvent, screen, waitFor, act,
} from '@testing-library/react';
import {
  Formik, Form, Field, getIn, setIn,
} from 'formik';
import { FormikToggle } from './FormikToggle';

const testLabelName = 'test checkbox';

const handleValidation = testValueKey => values => (getIn(values, testValueKey) ? {} : setIn({}, testValueKey, 'Checkbox is required'));

const renderForm = (initialValue, props, testValueKey = testLabelName) => (
  <Formik
    initialValues={{
      [testLabelName]: initialValue,
    }}
    onSubmit={props.handleSubmit} // eslint-disable-line
    validate={props.isRequired ? handleValidation(testValueKey) : undefined} // eslint-disable-line
  >
    {() => (
      <Form>
        <Field
          label={testValueKey}
          name={testValueKey}
          id={testValueKey}
          component={FormikToggle}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);

describe('CheckboxInput', () => {
  describe('States', () => {
    describe('With default props', () => {
      test('renders not disabled, checked, or invalid by default', () => {
        const { getByLabelText } = render(renderForm(false, {}));
        const checkbox = getByLabelText(testLabelName);

        expect(checkbox.checked).toBe(false);
        expect(checkbox.disabled).toBe(false);
        expect(checkbox.getAttribute('aria-invalid')).toBe('false');
      });
    });

    describe('With initial value true', () => {
      test('input is rendered checked when instantiated with isChecked true', () => {
        const { getByLabelText } = render(renderForm(true, {}));
        const checkbox = getByLabelText(testLabelName);
        expect(checkbox.checked).toEqual(true);
      });
    });

    describe('With initial value false', () => {
      test('input is rendered unchecked when instantiated with isChecked false', () => {
        const { getByLabelText } = render(renderForm(false, {}));
        const checkbox = getByLabelText(testLabelName);
        expect(checkbox.checked).toEqual(false);
      });
    });

    describe('Disabled', () => {
      test('input is rendered with the disabled attrbute when isDisabled is true', () => {
        const { getByLabelText } = render(renderForm(false, { isDisabled: true }));
        const checkbox = getByLabelText(testLabelName);
        expect(checkbox).toBeDisabled();
      });
    });

    describe('Correctly supplies aria-labelledby', () => {
      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        const { getByLabelText } = render(renderForm(false, {}));
        expect(getByLabelText(testLabelName)).toHaveAttribute(
          'aria-labelledby',
          `${testLabelName}Label`,
        );
        expect(document.getElementById(`${testLabelName}Label`)).toBeInTheDocument();
      });
    });

    describe('With Error', () => {
      test('correctly renders the checkbox with an error message underneath', async () => {
        const { getByText } = render(renderForm(false, { isRequired: true }));
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('Checkbox is required')).toBeInTheDocument());
      });

      test('correctly renders the toggle with an error message from nested object', async () => {
        const { getByText } = render(renderForm({ outer: { nested: false } }, { isRequired: true }, `${testLabelName}.outer.nested`));
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('Checkbox is required')).toBeInTheDocument());
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test("Custom onChange event fires callback function, overwriting Formik's onChange", () => {
        let value = false;
        const mockedHandleChange = jest.fn(event => {
          value = event.target.checked;
        });

        const { getByLabelText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const checkbox = getByLabelText(testLabelName);

        act(() => {
          fireEvent.click(checkbox);
        });

        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
        expect(value).toBe(true);
      });

      test('Standard Formik onChange modifies the target value', async () => {
        const { getByLabelText, getByText, queryByText } = render(
          renderForm(false, { isRequired: true }),
        );
        const submitButton = getByText('submit');
        const checkbox = getByLabelText(testLabelName);
        expect(checkbox.checked).toBe(false);

        fireEvent.click(submitButton);
        // expect(mockedHandleSubmit).toHaveBeenCalledTimes(0);
        await waitFor(() => expect(getByText('Checkbox is required')).toBeInTheDocument());

        act(() => {
          fireEvent.click(checkbox);
        });
        expect(checkbox.checked).toBe(true);
        await waitFor(() => expect(queryByText('Checkbox is required')).not.toBeInTheDocument());
      });
    });
  });
});
