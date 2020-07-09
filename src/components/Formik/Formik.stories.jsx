import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { Field, Form, Formik } from 'formik';
import FormikTextInput from './FormikTextInput/FormikTextInput';
import FormikCheckboxInput from './FormikCheckboxInput/FormikCheckboxInput';
import Button from '../Button/Button';

export default {
  title: 'Forms/Formik',
  decorators: [withA11y],
  subcomponents: {
    FormikTextInput,
    FormikCheckboxInput,
  },
};

export const FormikForm = () => {
  const handleValidation = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
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
        }}
        validate={handleValidation}
        onSubmit={handleSubmit}
        render={({ isSubmitting, values }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                type="text"
                label="First Name"
                name="firstName"
                id="firstName"
                component={FormikTextInput}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                type="text"
                label="Last Name"
                name="lastName"
                id="lastName"
                component={FormikTextInput}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                label="Email"
                name="email"
                id="email"
                component={FormikTextInput}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
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
