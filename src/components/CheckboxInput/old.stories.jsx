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

  const handleChange = (event, key) => {
    action('change')(event);
    store.set({ [key]: event.target.checked });
  };

  return (
    <State store={store}>
      {state => (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="defaultStateIsUnchecked"
              label="Default state is unchecked"
              isChecked={state.default}
              onChange={value => handleChange(value, 'default')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="requiredCheckboxIsUnchecked"
              isRequired
              label="Required checkbox is unchecked"
              isChecked={state.required}
              onChange={value => handleChange(value, 'required')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="initialStateChecked"
              isChecked={state.initialChecked}
              label="Initial state can be set to checked"
              onChange={value => handleChange(value, 'initialChecked')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="customLabel"
              label={(
                <>
                  <span style={{ color: '#5620c5' }}>
                    Pass any element(s) as children for the label, even links! Add custom styles.
                  </span>
                  {' '}
                  <a href="https://www.palmetto.com">Go to Palmetto.com</a>
                </>
              )}
              isChecked={state.withLabelHtml}
              onChange={value => handleChange(value, 'withLabelHtml')}
            />

          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="disabledAndUnchecked"
              isDisabled
              label="Disabled, and unchecked"
              isChecked={state.disabledUnchecked}
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="disabledAndChecked"
              label="Disabled, and checked"
              isDisabled
              isChecked={state.disabledChecked}
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <CheckboxInput
              id="invalidCheckbox"
              error="You must accept the Terms and Conditions"
              label="Invalid checkbox"
              isChecked={state.withError}
              onChange={value => handleChange(value, 'withError')}
            />
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
