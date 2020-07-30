import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import selectEvent from 'react-select-event';
import { Formik, Form, Field } from 'formik';
import FormikRadioGroup from './FormikRadioGroup';
import RadioGroup from '../../RadioGroup/RadioGroup';

const testLabelName = 'test select';

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
}];

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
  >
    {() => (
      <Form>
        <Field
          label={testLabelName}
          name={testLabelName}
          id={testLabelName}
          options={selectOptions}
          component={FormikSelectInput}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
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

        const { getByLabelText, container, getByText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const selectInput = getByLabelText(testLabelName);
        /**
         * This class is specific to react-select, combined with our custom classNamePrefix prop.
         * While this is an implementation detail there appears to be
         * no clearer path to test our own component which depends on react-select
        */
        const selectInputWrapper = container.querySelector('.reactSelect__control');

        fireEvent.focus(selectInput);
        fireEvent.mouseDown(selectInputWrapper);
        const option = await waitFor(() => getByText('Vanilla'), { container });
        fireEvent.click(option);
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
        expect(value).toStrictEqual({ label: 'Vanilla', value: 'vanilla' });
      });

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
    });
  });
});
