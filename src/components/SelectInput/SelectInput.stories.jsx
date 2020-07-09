import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import SelectInput from './SelectInput';

export default {
  title: 'Forms/Inputs/SelectInput',
  component: SelectInput,
  decorators: [withA11y],
};

const onChange = e => {
  action('onChange')(e);
};

const handleFocus = e => {
  action('onFocus')(e);
};

const handleBlur = e => {
  action('onBlur')(e);
};

export const All = () => {
  const selectOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const selectInputProps = {
    onChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    options: selectOptions,
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="selectNoLabel"
          className="singleSelectNoLabel"
          placeholder="Select input with no label, and a custom placeholder..."
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="selectWithLabel"
          label="Select"
          className="singleSelectWithLabel"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="preselectedValue"
          label="Single value pre-selected"
          className="singleSelectWithLabel"
          value={selectOptions[2]}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="preselectedMultiValue"
          label="Multi value pre-selected"
          className="singleSelectWithLabel"
          isMulti
          value={[
            selectOptions[0],
            selectOptions[2],
          ]}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="multiSelect"
          label="Multi Select"
          className="multiSelect"
          isMulti
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="autoFocus"
          label="Auto Focus"
          autoFocus
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="isRequired"
          label="Is Required"
          isRequired
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="disabled"
          label="Disabled"
          isDisabled
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="disabledAndRequired"
          label="Disabled and Required"
          isDisabled
          isRequired
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="disabledPreselectedValue"
          label="Disabled with value pre-selected"
          className="singleSelectWithLabel"
          value={selectOptions[2]}
          isDisabled
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="disabledPreselectedMultiValue"
          label="Disabled with multi value pre-selected"
          className="singleSelectWithLabel"
          isMulti
          value={[
            selectOptions[0],
            selectOptions[2],
          ]}
          isDisabled
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="invalid"
          label="Invalid"
          hasError
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="invalidNotRequired"
          label="Invalid Not Required with Validation Message"
          hasError="Helpful validation message"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <SelectInput
          {...selectInputProps}
          id="invalidRequired"
          label="Invalid Required with Validation Message"
          hasError="Helpful validation message"
          isRequired
        />
      </div>
    </div>
  );
};
