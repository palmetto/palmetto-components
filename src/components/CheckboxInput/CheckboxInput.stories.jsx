import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import CheckboxInput from './CheckboxInput';

export default {
  title: 'CheckboxInput',
  component: CheckboxInput,
  decorators: [withA11y],
};

const StatefulCheckboxInput = props => {
  const { initialCheckedValue, label, isDisabled } = props; // eslint-disable-line
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
      label={label}
      {...props} // esli
    />
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
        <StatefulCheckboxInput
          label="Default state is unchecked"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput
          isRequired
          label="Required checkbox is unchecked"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput initialCheckedValue={firstCheckboxState} label="Initial state can be set to checked." />

      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput label={(
          <>
            <span style={{ color: '#5620c5' }}>
              Pass any element(s) as children for the label, even links! Add custom styles.
            </span>
            {' '}
            <a href="https://www.palmetto.com">Go to Palmetto.com</a>
          </>
        )}
        />

      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput isDisabled label="Disabled, and unchecked." />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput isDisabled initialCheckedValue={secondCheckboxState} label="Disabled, and unchecked." />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput error="You must accept the Terms and Conditions" label="Invalid checkbox" />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulCheckboxInput
          isRequired
          error="You must accept the Terms and Conditions"
          label="Required Invalid checkbox"
        />
      </div>
    </div>
  );
};

