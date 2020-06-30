import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

const StatefulInput = props => {
  const [value, setValue] = useState(props.initialValue);

  const handleChange = event => {
    action('onChange')(event);
    setValue(event.target.value);
  };

  const handleFocus = event => {
    action('onFocus')(event);
  };

  const handleBlur = event => {
    action('onBlur')(event);
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

storiesOf('Input', module)
  .add('Basic Text Input', () => {
    const basicInputValue = 'Hello World!';
    const disabledInputValue = 'I am disabled';
    const placeholderInputValue = '';
    const withLabelInputValue = 'I have a label!';

    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          <StatefulInput initialValue={basicInputValue} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <StatefulInput initialValue={disabledInputValue} isDisabled />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <StatefulInput initialValue={withLabelInputValue} label="Name" />
        </div>
        <div>
          <StatefulInput
            initialValue={placeholderInputValue}
            placeholder="I am a placeholder"
          />
        </div>
      </>
    );
  });
