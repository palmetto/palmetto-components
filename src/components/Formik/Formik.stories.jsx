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
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];


  const handleValidation = values => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    } else if (!values.flavor) {
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
          flavors: null,
        }}
        validate={handleValidation}
        onSubmit={handleSubmit}
        handleChange={event => action('change')(event)}
        render={({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                type="text"
                label="First Name"
                name="firstName"
                id="firstName"
                component={FormikTextInput}
                // With a custom onChange.
                // We preserve Formik's convention and relegate state management back to the user.
                onChange={event => {
                  action('change')(event);
                  setFieldValue('firstName', event.target.value);
                }}
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
                label="Flavor"
                name="flavor"
                id="flavor"
                options={selectOptions}
                component={FormikSelectInput}
                onChange={selectedOption => {
                  action('change')(selectedOption);
                  setFieldValue('flavor', selectedOption);
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                label="Flavors"
                name="flavors"
                id="flavors"
                isMulti
                options={selectOptions}
                component={FormikSelectInput}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                label="Terms and Conditions"
                name="areTermsChecked"
                id="areTermsChecked"
                component={FormikCheckboxInput}
                onChange={action('checkbox onChange')}
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
