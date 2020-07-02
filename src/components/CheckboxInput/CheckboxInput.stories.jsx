import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    setIsCheckboxChecked(isChecked);
  };

  return (
    <CheckboxInput
      isChecked={isCheckboxChecked}
      onChange={handleChange}
      isDisabled={isDisabled}
    >
      {children}
    </CheckboxInput>
  );
};

StatefulCheckboxInput.defaultProps = {
  initialCheckedValue: undefined,
  children: undefined,
  isDisabled: false,
};

StatefulCheckboxInput.propTypes = {
  initialCheckedValue: PropTypes.bool,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
};

export const All = () => {
  const firstCheckboxState = true;
  const secondCheckboxState = true;
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput>
          Default state is unchecked.
        </StatefulCheckboxInput>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput initialCheckedValue={firstCheckboxState}>
          Initial state can be set to checked.
        </StatefulCheckboxInput>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput>
          <span style={{ color: '#21c841' }}>Pass any element(s) as children for the label, even links! Add custom styles.</span>
          {' '}
          <a href="https://www.palmetto.com">Go to Palmetto.com</a>
        </StatefulCheckboxInput>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput isDisabled>
          Disabled, and unchecked.
        </StatefulCheckboxInput>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput isDisabled initialCheckedValue={secondCheckboxState}>
          Disabled, and checked.
        </StatefulCheckboxInput>
      </div>
    </div>
  );
};
