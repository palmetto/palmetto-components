import React from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [withA11y],
};

const StatefulButton = ({ children, fullWidth, isDisabled, isLoading }) => {
  const handleClick = e => {
    action('onClick')(e);
  };

  const handleFocus = e => {
    action('onFocus')(e);
  };

  const handleBlur = e => {
    action('onBlur')(e);
  };

  return (
    <Button
      fullWidth={fullWidth}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </Button>
  );
};

StatefulButton.defaultProps = {
  fullWidth: undefined,
  isDisabled: undefined,
  isLoading: undefined,
};

StatefulButton.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export const All = () => {
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton>
          Button
        </StatefulButton>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton fullWidth>
          Full Width Button
        </StatefulButton>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton isDisabled>
          Disabled Button
        </StatefulButton>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <StatefulButton isLoading>
          Button with a really long name. Width will not decrease when loading indicator is rendered.
        </StatefulButton>
      </div>
    </div>
  );
};
