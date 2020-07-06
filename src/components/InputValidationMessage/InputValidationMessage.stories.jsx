import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import InputValidationMessage from './InputValidationMessage';

export default {
  title: 'InputValidationMessage',
  component: InputValidationMessage,
  decorators: [withA11y],
};

export const All = () => (
  <InputValidationMessage>Helpful input validation message</InputValidationMessage>
);
