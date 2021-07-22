import React from 'react';
import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import {
  Formik, Field, Form, FormikValues,
} from 'formik';
import { FormikTextareaInput } from './FormikTextareaInput';

const testLabelName = 'textInput';

const handleValidation = (values: FormikValues) => {
  const errors: { [testLabelName]?: string; } = {};
  if (!values[testLabelName]) {
    errors[testLabelName] = 'input is required';
  }

  return errors;
};

type FormProps = {
  isRequired?: boolean;
  maxLength?: string;
  autoComplete?: boolean | string | string[];
  hideLabel?: boolean;
  onChange?: jest.Mock<void, [any]>; // eslint-disable-line
  autoFocus?: boolean;
};

const renderForm = (initialValue: string | undefined, props: FormProps) => (
  <Formik
    initialValues={{
      [testLabelName]: initialValue,
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
          component={FormikTextareaInput}
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

describe('FormikTextareaInput', () => {
  describe('States', () => {
    describe('Autofocused', () => {
      test('Input autofocuses if "autoFocus" prop is set to true', () => {
        const { getByDisplayValue } = render(renderForm('hello', { autoFocus: true }));
        const inputElement = getByDisplayValue('hello');
        expect(document.activeElement).toEqual(inputElement);
      });

      test('Input correctly assigns autocomplete value of "on" when bool true is provided', () => {
        const { getByDisplayValue } = render(renderForm('hello', { autoComplete: true }));
        const inputElement = getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'on');
      });
    });

    describe('With Autocomplete', () => {
      test('Input correctly assigns autocomplete value of "off" when bool false is provided', () => {
        const { getByDisplayValue } = render(renderForm('hello', { autoComplete: false }));
        const inputElement = getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });

      test('Input correctly assigns autocomplete value of "off" when incorrect type is provided', () => {
        const { getByDisplayValue } = render(
          renderForm('hello', { autoComplete: ['a', 'random', 'array'] }),
        );
        const inputElement = getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('autocomplete', 'off');
      });
    });

    describe('Required', () => {
      test('Input correctly assigns the "aria-required" attribute when "isRequired" prop is true', () => {
        const { getByDisplayValue } = render(renderForm('hello', { isRequired: true }));
        const inputElement = getByDisplayValue('hello');
        expect(inputElement).toHaveAttribute('aria-required', 'true');
      });
    });

    describe('With Error', () => {
      test('Input correctly displays error message if provided', async () => {
        const { getByText } = render(renderForm('', { isRequired: true }));
        const submitButton = getByText('submit');

        fireEvent.click(submitButton);
        await waitFor(() => expect(screen.getByText('input is required')).toBeInTheDocument());
      });
    });

    describe('With Max Length', () => {
      test('Input correctly passes maxlength property if prop is passed', async () => {
        const { getByLabelText } = render(renderForm('', { maxLength: '3' }));
        const inputElement = getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute('maxlength');
        expect(inputElement.getAttribute('maxlength')).toBe('3');
      });
    });

    describe('Aria-labelledby', () => {
      test('assigns the "aria-labelledby" attribute and renders label with correct id, when label is provided', () => {
        const { getByLabelText } = render(renderForm('', {}));
        const inputElement = getByLabelText(testLabelName);
        expect(inputElement).toHaveAttribute('aria-labelledby', `${testLabelName}Label`);
        expect(document.getElementById(`${testLabelName}Label`)).toBeInTheDocument();
      });

      test('does not assign "aria-labelledby" attribute when a label is hidden', () => {
        render(renderForm('', { hideLabel: true }));
        const inputElement = screen.getByLabelText(testLabelName);
        expect(inputElement).not.toHaveAttribute('aria-labelledby');
      });
    });
  });

  describe('Callback Handling', () => {
    describe('onChange', () => {
      test("Custom onChange event fires callback function, overwriting Formik's onChange", () => {
        let value = '';
        const mockedHandleChange = jest.fn(event => {
          value = event.target.value;
        });

        const { getByLabelText } = render(renderForm(value, { onChange: mockedHandleChange }));
        const input = getByLabelText(testLabelName);

        fireEvent.change(input, { target: { value: 'hello' } });

        expect(mockedHandleChange).toHaveBeenCalledTimes(1);
        expect(value).toBe('hello');
      });
    });
  });

  describe('Children props', () => {
    describe('Form Label', () => {
      test('Input correctly passes props to dependency label component', async () => {
        const { getByText } = render(renderForm('', { isRequired: true }));
        const labelElement = getByText(getByTextWithMarkup(`${testLabelName} *`));
        expect(labelElement).toHaveAttribute('for', testLabelName);
        expect(labelElement).toBeInTheDocument();
      });
    });
  });
});
