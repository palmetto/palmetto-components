import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import selectEvent from 'react-select-event';
import { Formik, Form, Field } from 'formik';
import { FormikTimePicker } from './FormikTimePicker';

const testLabelName = 'test select';

type Option = { value: string; label: string; }
const handleValidation = (values: { [x: string]: string; }) => {
  const errors: {[x: string]: string; } = {};
  if (values[testLabelName].length < 1) {
    errors[testLabelName] = 'input is required';
  }

  return errors;
};

const renderForm = (
  initialValue: string | string[] | Option | Option[] | undefined,
  props: {
    placeholder?: string;
    hideLabel?: boolean;
    isMulti?: boolean;
    isRequired?: unknown;
    isDisabled?: boolean;
    onChange?: jest.Mock<void, [any]>; // eslint-disable-line
    interval?: number;
  },
) => (
  <Formik
    initialValues={{
      [testLabelName]: initialValue as string,
    }}
    validate={props.isRequired ? handleValidation : undefined} // eslint-disable-line
    onSubmit={() => {}} // eslint-disable-line
  >
    {() => (
      <Form>
        <Field
          label={testLabelName}
          name={testLabelName}
          id={testLabelName}
          component={FormikTimePicker}
          {...props}
        />
        <button type="submit">submit</button>
      </Form>
    )}
  </Formik>
);

function getByTextWithMarkup(text: string) {
  // eslint-disable-next-line
  // @ts-ignore
  return (content, element) => {
    const hasText = (node: Element) => node.textContent === text;
    const elementHasText = hasText(element);
    // eslint-disable-next-line
    // @ts-ignore
    const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));

    return elementHasText && childrenDontHaveText;
  };
}

describe('FormikTimePicker', () => {
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
        render(renderForm({ label: '12:00 AM', value: '2020-10-23T04:30:00.120Z' }, {}));

        expect(screen.getByText('12:00 AM')).toBeInTheDocument();
      });
    });

    describe('Multi select, no selection', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(renderForm(undefined, { isMulti: true }));

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.getByText('HH:MM')).toBeInTheDocument();
      });
    });

    describe('Multi select, with multiple items selected', () => {
      test('it renders input with a label, and with two items selected', () => {
        render(
          renderForm(
            [
              { label: '12:00 AM', value: '2020-10-23T04:30:00.120Z' },
              { label: '12:15 AM', value: '2020-10-23T04:45:00.120Z' },
            ],
            { isMulti: true },
          ),
        );

        expect(screen.getByLabelText(testLabelName)).toBeInTheDocument();
        expect(screen.queryByText('HH:MM')).toBeNull();
        expect(screen.getByText('12:00 AM')).toBeInTheDocument();
        expect(screen.getByText('12:15 AM')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        render(renderForm([], { isRequired: true }));

        expect(screen.getByText(getByTextWithMarkup(`${testLabelName} *`))).toBeInTheDocument();
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
        let value: Option | undefined;
        const mockedHandleChange = jest.fn(event => { value = event.target.value; });

        const { getByLabelText, container, getByText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const selectInput = getByLabelText(testLabelName);
        /**
         * This class is specific to react-select, combined with our custom classNamePrefix prop.
         * While this is an implementation detail there appears to be
         * no clearer path to test our own component which depends on react-select
        */
        const selectInputWrapper = container.querySelector('.react-select__control');

        fireEvent.focus(selectInput);
        if (selectInputWrapper) {
          fireEvent.mouseDown(selectInputWrapper);
        }
        const option = await waitFor(() => getByText('12:00 AM'), { container });
        fireEvent.click(option);
        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
        expect(value?.label).toEqual('12:00 AM');
      });

      test('it fires onChange callback on change', async () => {
        const mockedHandleChange = jest.fn();

        const { getByLabelText } = render(renderForm(undefined, { onChange: mockedHandleChange }));

        await selectEvent.select(getByLabelText(testLabelName), '12:00 AM');

        expect(mockedHandleChange).toBeCalledTimes(1);
      });
    });
  });
});
