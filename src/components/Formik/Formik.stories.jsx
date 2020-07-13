import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Field, Form, Formik } from 'formik';
import { action } from '@storybook/addon-actions';
import Button from '../Button/Button';
import FormikTextInput from './FormikTextInput/FormikTextInput';
import FormikCheckboxInput from './FormikCheckboxInput/FormikCheckboxInput';
import FormikSelectInput from './FormikSelectInput/FormikSelectInput';

export default {
  title: 'Forms/Formik',
  decorators: [withA11y],
  subcomponents: {
    FormikCheckboxInput,
    FormikSelectInput,
    FormikTextInput,
  },
};

export const FormikForm = () => {
  const flavorOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const colorOptions = [
    { value: 'red', label: 'red' },
    { value: 'orange', label: 'orange' },
    { value: 'yellow', label: 'yellow' },
    { value: 'green', label: 'green' },
    { value: 'blue', label: 'blue' },
    { value: 'indigo', label: 'indigo' },
    { value: 'violet', label: 'violet' },
  ];

  const handleValidation = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.flavor) {
      errors.flavor = 'Flavor is required';
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Make API calls here
    setTimeout(() => {
      setSubmitting(false);
      alert( // eslint-disable-line no-alert
        `Submitted Successfully ->  ${JSON.stringify(values, null, 2)}`,
      );
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }} className="App-header">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          areTermsChecked: false,
          flavor: null,
          flavor2: null,
          colors: [],
        }}
        validate={handleValidation}
        onSubmit={handleSubmit}
        handleChange={event => action('change')(event)}
        render={({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                type="text"
                label="First Name"
                name="firstName"
                id="firstName"
                component={FormikTextInput}
                // With a custom onChange.
                // We preserve Formik's convention and relegate state form management back to the user.
                onChange={event => {
                  action('change')(event);
                  setFieldValue('firstName', event.target.value);
                }}
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                type="text"
                label="Last Name"
                name="lastName"
                id="lastName"
                component={FormikTextInput}
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                label="Email"
                name="email"
                id="email"
                component={FormikTextInput}
                isRequired
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                label="Flavor with custom onChange"
                name="flavor"
                id="flavor"
                options={flavorOptions}
                component={FormikSelectInput}
                // With a custom onChange.
                // We preserve Formik's convention and relegate form state management back to the user.
                onChange={event => {
                  action('change')(event.target.value);
                  setFieldValue('flavor', event.target.value);
                }}
                isRequired
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                label="Flavor without custom onChange"
                name="flavor2"
                id="flavor2"
                options={flavorOptions}
                component={FormikSelectInput}
                isRequired
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                label="Colors"
                name="colors"
                id="colors"
                isMulti
                options={colorOptions}
                component={FormikSelectInput}
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Field
                label="Terms and Conditions"
                name="areTermsChecked"
                id="areTermsChecked"
                component={FormikCheckboxInput}
              />
            </div>
            <Button type="submit" isLoading={isSubmitting}>Submit</Button>
            <pre>{JSON.stringify(values, isSubmitting, null, 2)}</pre>
          </Form>
        )}
      />
    </div>
  );
};
