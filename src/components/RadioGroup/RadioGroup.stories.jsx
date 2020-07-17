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
  const defaultOptions = [
    {
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
    },
  ];

  const disabledOption = {
    id: 'peach',
    value: 'peach',
    label: 'Peach',
    disabled: true,
  };

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
            <RadioGroup
              name="noTitleOrDescription"
              onChange={event => handleChange(event.target.value, 'noTitleOrDescription')}
              options={defaultOptions}
              selectedOption={state.noTitleOrDescription}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="With Title"
              name="withTitle"
              onChange={event => handleChange(event.target.value, 'withTitle')}
              options={defaultOptions}
              selectedOption={state.withTitle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="With Title and Description"
              description="A helpful description"
              name="withTitleAndDescription"
              onChange={event => handleChange(event.target.value, 'withTitleAndDescription')}
              options={defaultOptions}
              selectedOption={state.withTitleAndDescription}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Required"
              name="required"
              onChange={event => handleChange(event.target.value, 'required')}
              options={defaultOptions}
              selectedOption={state.required}
              isRequired
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Pre-selected Option"
              name="preSelectedOption"
              onChange={event => handleChange(event.target.value, 'preSelectedOption')}
              options={defaultOptions}
              selectedOption={state.preSelectedOption || defaultOptions[1].value}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Disabled Option"
              name="disabledOption"
              onChange={event => handleChange(event.target.value, 'disabledOption')}
              options={defaultOptions.concat(disabledOption)}
              selectedOption={state.disabledOption}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Disabled Group"
              name="disabledGroup"
              onChange={event => handleChange(event.target.value, 'disabledGroup')}
              options={[...defaultOptions, disabledOption]}
              selectedOption={state.disabledGroup}
              isDisabled
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Error"
              name="error"
              onChange={event => handleChange(event.target.value, 'error')}
              options={[...defaultOptions, disabledOption]}
              selectedOption={state.error}
              error
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <RadioGroup
              title="Error with Validation Message"
              name="errorWithMessage"
              onChange={event => handleChange(event.target.value, 'errorWithMessage')}
              options={defaultOptions}
              selectedOption={state.errorWithMessage}
              error="Helpful validation message"
            />
          </div>
        </div>
      )}
    </State>
  );
};
