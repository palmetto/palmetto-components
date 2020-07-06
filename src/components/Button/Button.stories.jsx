import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [withA11y],
};

const StatefulButton = ({ children }) => {
  // const [isCheckboxChecked, setIsCheckboxChecked] = useState(initialCheckedValue);

  // const handleChange = isChecked => {
  //   action('onChange')(isChecked);
  //   setIsCheckboxChecked(isChecked);
  // };

  return (
    <Button>
      {children}
    </Button>
  );
};

StatefulButton.defaultProps = {
  
};

StatefulButton.propTypes = {
  
};

export const All = () => {
  const firstCheckboxState = true;
  const secondCheckboxState = true;
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton>
          Default state is unchecked.
        </StatefulButton>
      </div>
      {/* <div style={{ marginBottom: '1rem' }}>
        <StatefulButton initialCheckedValue={firstCheckboxState}>
          Initial state can be set to checked.
        </StatefulButton>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton>
          <span style={{ color: '#5620c5' }}>Pass any element(s) as children for the label, even links! Add custom styles.</span>
          {' '}
          <a href="https://www.palmetto.com">Go to Palmetto.com</a>
        </StatefulButton>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton isDisabled>
          Disabled, and unchecked.
        </StatefulButton>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton isDisabled initialCheckedValue={secondCheckboxState}>
          Disabled, and checked.
        </StatefulButton>
      </div> */}
    </div>
  );
};
