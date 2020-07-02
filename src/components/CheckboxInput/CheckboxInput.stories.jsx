import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import CheckboxInput from './CheckboxInput';

export default {
  title: 'CheckboxInput',
  component: CheckboxInput,
};

const StatefulCheckboxInput = ({ initialCheckedValue, children, isDisabled }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(initialCheckedValue);

  const handleChange = isChecked => {
    action('onChange')(isChecked);
    setIsChecked(isChecked);
  };

  return (
    <CheckboxInput
      isSelected={isCheckboxChecked}
      onChange={handleChange}
      isDisabled={isDisabled}
    >
      {children}
    </CheckboxInput>
  );
};

export const All = () => {
  const firstCheckboxState= true;
  const secondCheckboxState = true;
  return (
    <div style={{ width: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput initialCheckedValue={firstCheckboxState}>
          I have a link!
          {' '}
          <a href="https://www.palmetto.com">Go to Palmetto.com</a>
        </StatefulCheckboxInput>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput isDisabled initialCheckedValue={secondCheckboxState}>
          I am disabled
        </StatefulCheckboxInput>
      </div>
    </div>
  );
};
