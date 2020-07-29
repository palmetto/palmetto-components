import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import RadioGroup from './RadioGroup';

export default {
  title: 'Components/Form Inputs/RadioGroup',
  component: RadioGroup,
  decorators: [withA11y],
};

export const All = () => {
  const preSelectedOptions = [{
    id: 'car',
    value: 'car',
    label: 'Car',
  },
  {
    id: 'truck',
    value: 'truck',
    label: 'Truck',
  },
  {
    id: 'motorcycle',
    value: 'motorcycle',
    label: 'Motorcycle',
    disabled: true,
  }];

  const store = new Store({
    noTitleOrDescription: '',
    withTitle: '',
    withTitleAndDescription: '',
    required: '',
    preSelectedOption: '',
    disabledOption: '',
    disabledGroup: '',
    error: '',
    errorWithMessage: '',
  });

  const handleChange = (value, key) => {
    action('onChange')(value);
    store.set({ [key]: value });
  };

  return (
    <State store={store}>
      {state => (
        <div style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem' }}>
            {/* <RadioGroup
              name="noTitleOrDescription"
              onChange={event => handleChange(event.target.value, 'noTitleOrDescription')}
              options={[{
                id: 'chocolate',
                value: 'chocolate',
                label: 'Chocolate',
              },
              {
                id: 'strawberry',
                value: 'strawberry',
                label: 'Strawberry',
              },
              {
                id: 'vanilla',
                value: 'vanilla',
                label: 'Vanilla',
              }]}
              selectedOption={state.noTitleOrDescription}
            /> */}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="With Title"
              name="withTitle"
              onChange={event => handleChange(event.target.value, 'withTitle')}
              options={[{
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
              }]}
              selectedOption={state.withTitle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="With Title and Description"
              description="A helpful description"
              name="withTitleAndDescription"
              onChange={event => handleChange(event.target.value, 'withTitleAndDescription')}
              options={[{
                id: 'light',
                value: 'light',
                label: 'Light',
              },
              {
                id: 'dark',
                value: 'dark',
                label: 'Dark',
              }]}
              selectedOption={state.withTitleAndDescription}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Required"
              name="required"
              onChange={event => handleChange(event.target.value, 'required')}
              options={[{
                id: 'cat',
                value: 'cat',
                label: 'Cat',
              },
              {
                id: 'dog',
                value: 'dog',
                label: 'Dog',
              }]}
              selectedOption={state.required}
              isRequired
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Pre-selected Option"
              name="preSelectedOption"
              onChange={event => handleChange(event.target.value, 'preSelectedOption')}
              options={preSelectedOptions}
              selectedOption={state.preSelectedOption || preSelectedOptions[1].value}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Disabled Option"
              name="disabledOption"
              onChange={event => handleChange(event.target.value, 'disabledOption')}
              options={[{
                id: 'short',
                value: 'short',
                label: 'Short',
              },
              {
                id: 'tall',
                value: 'tall',
                label: 'Tall',
              },
              {
                id: 'gigantic',
                value: 'gigantic',
                label: 'Gigantic',
                disabled: true,
              }]}
              selectedOption={state.disabledOption}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Disabled Group"
              name="disabledGroup"
              onChange={event => handleChange(event.target.value, 'disabledGroup')}
              options={[{
                id: 'react',
                value: 'react',
                label: 'React',
              },
              {
                id: 'angular',
                value: 'angular',
                label: 'Angular',
              },
              {
                id: 'vue',
                value: 'vue',
                label: 'Vue',
                disabled: true,
              }]}
              selectedOption={state.disabledGroup}
              isDisabled
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Error"
              name="error"
              onChange={event => handleChange(event.target.value, 'error')}
              options={[{
                id: 'apple',
                value: 'apple',
                label: 'Apple',
              },
              {
                id: 'orange',
                value: 'orange',
                label: 'Orange',
              },
              {
                id: 'banana',
                value: 'banana',
                label: 'Banana',
                disabled: true,
              }]}
              selectedOption={state.error}
              error
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Error with Validation Message"
              name="errorWithMessage"
              onChange={event => handleChange(event.target.value, 'errorWithMessage')}
              options={[{
                id: 'narrow',
                value: 'narrow',
                label: 'Narrow',
              },
              {
                id: 'wide',
                value: 'wide',
                label: 'Wide',
              }]}
              selectedOption={state.errorWithMessage}
              error="Helpful validation message"
            />
          </div>
        </div>
      )}
    </State>
  );
};
