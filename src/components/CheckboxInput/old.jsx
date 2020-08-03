import React from 'react';
import { Store, State } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import CheckboxInput from './CheckboxInput';

export default {
  title: 'Components/Form Inputs/CheckboxInput',
  component: CheckboxInput,
  decorators: [withA11y],
};

export const All = () => {
  const store = new Store({
    default: false,
    required: false,
    initialChecked: true,
    withLabelHtml: false,
    disabledUnchecked: false,
    disabledChecked: true,
    withError: false,
    withErrorRequired: false,
  });

  return (
    <State store={store}>
      {state => (
        <>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
        
          </div>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="requiredInvalidCheckbox"
              isRequired
              error="You must accept the Terms and Conditions"
              label="Required Invalid checkbox"
              isChecked={state.withErrorRequired}
              onChange={value => handleChange(value, 'withErrorRequired')}
            />
          </div>
        </>
      )}
    </State>
  );
};
