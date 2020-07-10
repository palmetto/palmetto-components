import React from 'react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import SelectInput from './SelectInput';

export default {
  title: 'Forms/Inputs/SelectInput',
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
    singleSelectNoLabel: undefined,
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
            <SelectInput
              id="singleSelectNoLabel"
              className="singleSelectNoLabel"
              placeholder="Select input with no label, and a custom placeholder..."
              value={state.singleSelectNoLabel}
              onChange={value => handleChange(value, 'singleSelectNoLabel')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="singleSelectWithLabel"
              label="Single Select"
              value={state.singleSelectWithLabel}
              onChange={value => handleChange(value, 'singleSelectWithLabel')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="singleSelectPreselected"
              label="Single Select Pre-Selected"
              value={state.singleSelectPreselected}
              onChange={value => handleChange(value, 'singleSelectPreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="multiSelect"
              label="Multi Select"
              isMulti
              value={state.multiSelect}
              onChange={value => handleChange(value, 'multiSelect')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="multiSelectPreselected"
              label="Multi Select Pre-Selected"
              isMulti
              value={state.multiSelectPreselected}
              onChange={value => handleChange(value, 'multiSelectPreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="autoFocus"
              label="Auto Focus"
              autoFocus
              value={state.autoFocus}
              onChange={value => handleChange(value, 'autoFocus')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="required"
              label="Required"
              isRequired
              value={state.required}
              onChange={value => handleChange(value, 'required')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="disabled"
              label="Disabled"
              isDisabled
              value={state.disabled}
              onChange={value => handleChange(value, 'disabled')}
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
              onChange={value => handleChange(value, 'disabledRequired')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="disabledSingleSelectPreselected"
              label="Disabled Single Select Pre-Selected"
              isDisabled
              value={state.disabledSingleSelectPreselected}
              onChange={value => handleChange(value, 'disabledSingleSelectPreselected')}
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
              onChange={value => handleChange(value, 'disabledMultiValuePreselected')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="invalid"
              label="Invalid"
              hasError
              value={state.invalid}
              onChange={value => handleChange(value, 'invalid')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="invalidNotRequired"
              label="Invalid Not Required with Validation Message"
              hasError="Helpful validation message"
              value={state.invalidNotRequired}
              onChange={value => handleChange(value, 'invalidNotRequired')}
              options={selectOptions}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <SelectInput
              id="invalidRequired"
              label="Invalid Required with Validation Message"
              hasError="Helpful validation message"
              isRequired
              value={state.invalidRequired}
              onChange={value => handleChange(value, 'invalidRequired')}
              options={selectOptions}
            />
          </div>
        </div>
      )}
    </State>
  );
};
