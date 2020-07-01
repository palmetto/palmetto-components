import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

export default {
  title: 'Input',
  component: Input,
}

const StatefulInput = props => {
  const [value, setValue] = useState(props.initialValue);

  const handleChange = e => {
    action('onChange')(e);
    setValue(e.target.value || e.target.rawValue);
  };

  const handleFocus = e => {
    action('onFocus')(e);
  };

  const handleBlur = e => {
    action('onBlur')(e);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      { ...props }
    />
  );
};

export const All = () => {
  const basicInputValue = 'Hello World!';
  const disabledInputValue = 'I am disabled';
  const placeholderInputValue = '';
  const withLabelInputValue = 'With a label';
  const requiredInputValue = '';
  const autoFocusedInputValue = '';
  const withInputMaskValue = '';

  return (
    <div style={{ width: '400px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput initialValue={basicInputValue} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput initialValue={disabledInputValue} isDisabled />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput initialValue={withLabelInputValue} label="Name" />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput initialValue={requiredInputValue} label="Required Input" isRequired />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput
          initialValue={placeholderInputValue}
          label="With placeholder"
          placeholder="I am a placeholder"
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput
          initialValue={autoFocusedInputValue}
          label="Autofocused"
          placeholder="I am autofocused on page load"
          autoFocus
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulInput
          initialValue={autoFocusedInputValue}
          label="With phone input mask"
          placeholder="I have a phone number format"
          type="tel"
          inputMask="phone"
        />
      </div>
    </div>
  );
};
