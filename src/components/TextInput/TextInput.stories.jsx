import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import TextInput from './TextInput';

export default {
  title: 'Components/Form Inputs/TextInput',
  component: TextInput,
  decorators: [withA11y],
};

export const All = () => {
  const store = new Store({
    hiddenLabel: '',
    placeholderInputValue: '',
    withLabelInputValue: 'With a label',
    requiredInputValue: '',
    autoFocusedInputValue: '',
    withInputMaskValue: '',
    errorInputValue: '',
    withLabelErrorInputValue: 'invalid value',
    withValidationMessage: '',
    invalidWithLabel: '',
    withMaxLength: 'asdhasdhasdh',
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
              id="inputWithName"
              value={state.withLabelInputValue}
              label="Label Name"
              onChange={event => handleChange(event, 'withLabelInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="inputWithLabel"
              value={state.requiredInputValue}
              label="Required Input"
              isRequired
              onChange={event => handleChange(event, 'requiredInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="InputWithPlaceholder"
              value={state.placeholderInputValue}
              label="With placeholder"
              placeholder="I am a placeholder"
              onChange={event => handleChange(event, 'placeholderInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="autoFocusedInput"
              value={state.autoFocusedInputValue}
              label="Autofocused"
              placeholder="I am autofocused on page load"
              autoFocus
              onChange={event => handleChange(event, 'autoFocusedInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="hidden"
              value={state.hiddenLabel}
              label="I have a visually hidden label"
              hideLabel
              onChange={event => handleChange(event, 'hiddenLabel')}
              placeholder="My label is visually hidden"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="disabledInputWithValue"
              label="Disabled input with value"
              value="I am disabled with a value"
              isDisabled
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="disabledInputWithoutValue"
              label="Disabled input without value"
              isDisabled
              value=""
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="disabledInputWithPlaceholder"
              label="Disabled input with placeholder"
              placeholder="I am placeholder inside disabled input"
              isDisabled
              value=""
              onChange={() => null}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="inputWithPhoneMask"
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
              id="inputNotRequiredWithValidationMessage"
              error="Helpful validation message"
              value={state.withLabelErrorInputValue}
              label="Invalid Not Required with Validation Message"
              onChange={event => handleChange(event, 'withLabelErrorInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="inputRequiredWithValidationMessage"
              isRequired
              error="Helpful validation message"
              value={state.withValidationMessage}
              label="Invalid Required with Validation Message"
              onChange={event => handleChange(event, 'withValidationMessage')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="invalidWithNo"
              label="invalid hidden label"
              hideLabel
              error
              value={state.errorInputValue}
              placeholder="invalid with no label"
              onChange={event => handleChange(event, 'errorInputValue')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="invalidWithLabel"
              error
              value={state.invalidWithLabel}
              label="Invalid With Label"
              onChange={event => handleChange(event, 'invalidWithLabel')}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextInput
              id="withMaxLength"
              maxLength="5"
              value={state.withMaxLength}
              label="Can't enter more than 5 characters"
              onChange={event => handleChange(event, 'withMaxLength')}
            />
          </div>
        </div>
      )}
    </State>
  );
};
