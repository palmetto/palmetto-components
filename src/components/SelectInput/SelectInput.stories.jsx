import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import SelectInput from './SelectInput';

export default {
  title: 'Forms/Inputs/SelectInput',
  component: SelectInput,
  decorators: [withA11y],
};

const StatefulSelectInput = props => {
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleChange = e => {
    action('onChange')(e);
  };

  const handleFocus = e => {
    action('onFocus')(e);
  };

  const handleBlur = e => {
    action('onBlur')(e);
  };

  return (
    <SelectInput
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      options={selectOptions}
      {...props}
    />
  );
};

export const All = () => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Select"
          className="singleSelect"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Multi Select"
          className="multiSelect"
          isMulti
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Auto Focus"
          autoFocus
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Is Required"
          isRequired
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Disabled"
          isDisabled
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Disabled and Required"
          isDisabled
          isRequired
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Invalid"
          hasError
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Invalid Not Required with Validation Message"
          hasError="Helpful validation message"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Invalid Required with Validation Message"
          hasError="Helpful validation message"
          isRequired
        />
      </div>
    </div>
  );
};
