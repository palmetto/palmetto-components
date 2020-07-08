import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import SelectInput from './SelectInput';

export default {
  title: 'SelectInput',
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

  // const handleFocus = e => {
  //   action('onFocus')(e);
  // };

  // const handleBlur = e => {
  //   action('onBlur')(e);
  // };

  return (
    <SelectInput
      onChange={handleChange}
      options={selectOptions}
      {...props}
    />
  );
};

// StatefulSelectInput.defaultProps = {
//   initialCheckedValue: undefined,
//   children: undefined,
//   isDisabled: false,
// };

// StatefulSelectInput.propTypes = {
//   initialCheckedValue: PropTypes.bool,
//   children: PropTypes.node,
//   isDisabled: PropTypes.bool,
// };

export const All = () => {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulSelectInput
          label="Single Select"
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
          label="Error"
          hasError
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
          label="Is Required"
          isRequired
        />
      </div>
    </div>
  );
};
