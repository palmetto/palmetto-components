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
  const radioOptions = [
    { id: 'chocolate', value: 'chocolate', label: 'Chocolate' },
    { id: 'strawberry', value: 'strawberry', label: 'Strawberry' },
    { id: 'vanilla', value: 'vanilla', label: 'Vanilla' },
  ];

  const store = new Store({
    default: undefined,
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
              groupLabel="Default Group"
              groupName="defaultGroup"
              onChange={event => handleChange(event.target.value, 'default')}
              options={radioOptions}
              selectedOption={state.default}
            />
          </div>
        </div>
      )}
    </State>
  );
};
