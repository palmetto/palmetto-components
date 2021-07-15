import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import { Formik, Form, Field } from 'formik';
import { FormikRadioGroup } from './FormikRadioGroup';

const testGroupName = 'colors';

const groupOptions = [{
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
  disabled: true,
}];

const handleValidation = values => {
  const errors = {};
  if (!values[testGroupName]) {
    errors[testGroupName] = 'selection is required';
  }

  return errors;
  console.log('errors', errors);
};

const renderForm = (initialValue, props) => (
  <Formik
    initialValues={{
      [testGroupName]: initialValue,
    }}
    onSubmit={props.handleSubmit} // eslint-disable-line
    validate={props.isRequired ? handleValidation : undefined} // eslint-disable-line
  >
    {() => (
      <Form>
        <Field
          label={testGroupName}
          name={testGroupName}
          id={testGroupName}
          options={groupOptions}
          component={FormikRadioGroup}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);

describe('FormikRadioGroup', () => {
  describe('Callback Handling', () => {
    describe('onChange', () => {
      test('Custom onChange event fires callback function, overwriting Formik\'s onChange', () => {
        let value = null;
        const mockedHandleChange = jest.fn(event => { value = event.target.value; });

        const { getByLabelText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const blueRadioInput = getByLabelText('Blue');

        act(() => { fireEvent.click(blueRadioInput); });

        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
        expect(value).toBe('blue');
      });

      test('Standard Formik onChange modifies the target value', async () => {
        const { getByLabelText, getByText, queryByText } = render(renderForm(null, { isRequired: true }));
        const submitButton = getByText('submit');
        const blueRadioInput = getByLabelText('Blue');
        expect(blueRadioInput.checked).toBe(false);

        fireEvent.click(submitButton);
        await waitFor(() => expect(getByText('selection is required')).toBeInTheDocument());

        act(() => { fireEvent.click(blueRadioInput); });
        expect(blueRadioInput.checked).toBe(true);
        await waitFor(() => expect(queryByText('selection is required')).not.toBeInTheDocument());
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders 3 radio inputs', () => {
        render(renderForm(null, {}));

        const radioInputElements = screen.getAllByRole('radio');
        expect(radioInputElements).toHaveLength(3);
      });
    });

    describe('With Title', () => {
      test('it renders the title', () => {
        render(renderForm(null, { title: 'Mock Title' }));

        const title = screen.getByText('Mock Title');
        expect(title).toBeInTheDocument();
      });
    });

    describe('With Title and Description', () => {
      test('it renders the title and description', () => {
        render(renderForm(null, { title: 'Mock Title', description: 'Mock Description' }));

        const title = screen.getByText('Mock Title');
        const description = screen.getByText('Mock Description');
        expect(title).toBeInTheDocument();
        expect(description).toBeInTheDocument();
      });
    });

    describe('Required', () => {
      test('it renders asterisk next to the title', () => {
        render(renderForm(null, { title: 'Mock Title', isRequired: true }));

        const title = screen.getByText('*');
        expect(title).toBeInTheDocument();
      });
    });

    describe('Pre-Selected Option', () => {
      test('an option is automatically selected', () => {
        render(renderForm('green', {}));

        const greenRadioInput = screen.getByLabelText('Green');
        expect(greenRadioInput).toBeChecked();
      });
    });

    describe('Disabled Option', () => {
      test('the group contains a disabled option', () => {
        render(renderForm(null, {}));

        const disabledRadioInputElements = screen.getAllByRole('radio');
        expect(disabledRadioInputElements[2]).toBeDisabled();
      });
    });

    describe('Disabled Group', () => {
      test('all options in the group are disabled', () => {
        render(renderForm(null, { isDisabled: true }));

        const disabledRadioInputElements = screen.getAllByRole('radio');
        expect(disabledRadioInputElements[0]).toBeDisabled();
        expect(disabledRadioInputElements[1]).toBeDisabled();
        expect(disabledRadioInputElements[2]).toBeDisabled();
      });
    });

    describe('Error with Validation Message', () => {
      test('it renders a validation message', async () => {
        const { getByText } = render(renderForm(null, { isRequired: true }));

        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        
        await waitFor(() => expect(getByText('selection is required')).toBeInTheDocument());
      });
    });
  });
});
