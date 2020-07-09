import React from 'react';
import { State, Store } from "@sambego/storybook-state";
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import TextInput from './TextInput';

export default {
  title: 'TextInput',
  component: TextInput,
  decorators: [withA11y],
};

export const All = () => {
  const store = new Store({
    basicInputValue: 'Hello World!',
    placeholderInputValue: '',
    withLabelInputValue: 'With a label',
    requiredInputValue: '',
    autoFocusedInputValue: '',
    withInputMaskValue: '',
    errorInputValue: '',
    withLabelErrorInputValue: 'invalid value',
    withValidationMessage: '',
    invalidWithLabel: '',
  });

  const handleChange = (event, key) => {
    action('change')(event);
    store.set({ [key]: event.target.value });
  };

  return (
    <State store={store}>
      {state => (
        <div style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              value={state.basicInputValue}
              onChange={event => handleChange(event, 'basicInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              label="Disabled input with value"
              value="I am disabled with a value"
              isDisabled
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              label="Disabled input without value"
              isDisabled
              value=""
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              label="Disabled input with placeholder"
              placeholder="I am placeholder inside disabled input"
              isDisabled
              value=""
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              value={state.withLabelInputValue}
              label="Name"
              onChange={event => handleChange(event, 'withLabelInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              value={state.requiredInputValue}
              label="Required Input"
              isRequired
              onChange={event => handleChange(event, 'requiredInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              value={state.placeholderInputValue}
              label="With placeholder"
              placeholder="I am a placeholder"
              onChange={event => handleChange(event, 'placeholderInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              value={state.autoFocusedInputValue}
              label="Autofocused"
              placeholder="I am autofocused on page load"
              autoFocus
              onChange={event => handleChange(event, 'autoFocusedInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              value={state.withInputMaskValue}
              label="With phone input mask"
              placeholder="I have a phone number format"
              type="tel"
              inputMask="phone"
              onChange={event => handleChange(event, 'withInputMaskValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              error="Helpful validation message"
              value={state.withLabelErrorInputValue}
              label="Invalid Not Required with Validation Message"
              onChange={event => handleChange(event, 'withLabelErrorInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              isRequired
              error="Helpful validation message"
              value={state.withValidationMessage}
              label="Invalid Required with Validation Message"
              onChange={event => handleChange(event, 'withValidationMessage')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              error
              value={state.errorInputValue}
              placeholder="invalid with no label"
              onChange={event => handleChange(event, 'errorInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              error
              value={state.invalidWithLabel}
              label="Invalid With Label"
              onChange={event => handleChange(event, 'invalidWithLabel')}
            />
          </div>
        </div>
      )}
    </State>
  );
};
