import React from 'react';
import { action } from '@storybook/addon-actions';
import CheckboxInput from './CheckboxInput';

export default {
  title: 'CheckboxInput',
  component: CheckboxInput,
};

const StatefulCheckboxInput = props => {

  const handleChange = e => {
    action('onChange')(e);
  };

  return (
    <CheckboxInput
      checked
      onChange={handleChange}
      { ...props }
    />
  );
};

export const All = () => (
  <div style={{ width: '400px' }}>
    <div style={{ marginBottom: '1rem' }}>
      <StatefulCheckboxInput checked onChange={handleChange}>
        I have a link!
        {' '}
        <a href="https://www.palmetto.com">Go to Palmetto.com</a>
      </StatefulCheckboxInput>
    </div>
    <div style={{ marginBottom: '1rem' }}>
      <StatefulCheckboxInput isDisabled>
        I am disabled
      </StatefulCheckboxInput>
    </div>
  </div>
);
