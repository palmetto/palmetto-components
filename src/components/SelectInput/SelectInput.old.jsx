import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import SelectInput from './SelectInput';

export default {
  title: 'Components/Form Inputs/SelectInput',
  component: SelectInput,
  decorators: [withA11y],
};

export const All = () => {
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const store = new Store({
    labelHidden: undefined,
    singleSelectWithLabel: undefined,
    singleSelectPreselected: selectOptions[2],
    multiSelect: undefined,
    multiSelectPreselected: [
      selectOptions[0],
      selectOptions[2],
    ],
    autoFocus: undefined,
    required: undefined,
    disabled: undefined,
    disabledRequired: undefined,
    disabledSingleSelectPreselected: selectOptions[0],
    disabledMultiValuePreselected: [
      selectOptions[0],
      selectOptions[1],
    ],
    invalid: undefined,
    invalidNotRequired: undefined,
    invalidRequired: undefined,
  });

  const handleChange = (value, key) => {
    action('onChange')(value);
    store.set({ [key]: value });
  };

  return (
    <State store={store}>
      {state => (
        <div style={{ maxWidth: '500px' }}>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
            
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="singleSelectPreselected"
              label="Single Select Pre-Selected"
              value={state.singleSelectPreselected}
              onChange={event => handleChange(event.target.value, 'singleSelectPreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="multiSelect"
              label="Multi Select"
              isMulti
              value={state.multiSelect}
              onChange={event => handleChange(event.target.value, 'multiSelect')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="multiSelectPreselected"
              label="Multi Select Pre-Selected"
              isMulti
              value={state.multiSelectPreselected}
              onChange={event => handleChange(event.target.value, 'multiSelectPreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="autoFocus"
              label="Auto Focus"
              autoFocus
              value={state.autoFocus}
              onChange={event => handleChange(event.target.value, 'autoFocus')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="required"
              label="Required"
              isRequired
              value={state.required}
              onChange={event => handleChange(event.target.value, 'required')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="disabled"
              label="Disabled"
              isDisabled
              value={state.disabled}
              onChange={event => handleChange(event.target.value, 'disabled')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="disabledRequired"
              label="Disabled and Required"
              isDisabled
              isRequired
              value={state.disabledRequired}
              onChange={event => handleChange(event.target.value, 'disabledRequired')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="disabledSingleSelectPreselected"
              label="Disabled Single Select Pre-Selected"
              isDisabled
              value={state.disabledSingleSelectPreselected}
              onChange={event => handleChange(event.target.value, 'disabledSingleSelectPreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="disabledMultiValuePreselected"
              label="Disabled Multi Select Pre-Selected"
              isMulti
              isDisabled
              value={state.disabledMultiValuePreselected}
              onChange={event => handleChange(event.target.value, 'disabledMultiValuePreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="invalid"
              label="Invalid"
              error
              value={state.invalid}
              onChange={event => handleChange(event.target.value, 'invalid')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="invalidNotRequired"
              label="Invalid Not Required with Validation Message"
              error="Helpful validation message"
              value={state.invalidNotRequired}
              onChange={event => handleChange(event.target.value, 'invalidNotRequired')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="invalidRequired"
              label="Invalid Required with Validation Message"
              error="Helpful validation message"
              isRequired
              value={state.invalidRequired}
              onChange={event => handleChange(event.target.value, 'invalidRequired')}
              options={selectOptions}
            />
          </div>
        </div>
      )}
    </State>
  );
};
