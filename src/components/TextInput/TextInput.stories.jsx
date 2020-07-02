import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import TextInput from './TextInput';

export default {
  title: 'TextInput',
  component: TextInput,
};

const StatefulInput = props => {
  const { initialValue } = props;
  const [value, setValue] = useState(initialValue);

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
    <TextInput
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};

StatefulInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
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
          initialValue={withInputMaskValue}
          label="With phone input mask"
          placeholder="I have a phone number format"
          type="tel"
          inputMask="phone"
        />
      </div>
    </div>
  );
};
