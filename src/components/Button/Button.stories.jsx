import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [withA11y],
};

export const All = () => {
  const handleClick = event => {
    action('clicked')(event);
  };

  const handleBlur = event => {
    action('blurred')(event);
  };

  const handleFocus = event => {
    action('focused')(event);
  };

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          onClick={handleClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          Button
        </Button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          fullWidth
          onClick={handleClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          Full Width Button
        </Button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          isDisabled
          onClick={handleClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          Disabled Button
        </Button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          isLoading
          onClick={handleClick}
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          Button with a really long name. Width will not decrease when loading indicator is rendered.
        </Button>
      </div>
    </>
  );
};
