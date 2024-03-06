import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  TextareaInputFloating,
  TextareaInputFloatingProps,
} from './TextareaInputFloating';

export default {
  title: 'Components/TextareaInputFloating/Playground',
  component: TextareaInputFloating,
  argTypes: {
    autoComplete: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    autoFocus: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    hideLabel: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    prefix: {
      control: 'text',
    },
    suffix: {
      control: 'text',
    },
    maxLength: {
      control: 'number',
    },
    size: {
      control: {
        type: 'radio',
        options: ['md', 'lg'],
      },
    },
    requiredIndicator: {
      control: 'text',
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      },
    },
  },
} as Meta;

const Template: Story<TextareaInputFloatingProps> = ({ ...args }) => (
  <TextareaInputFloating {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundTextareaInputFloating ',
  label: 'Playground TextareaInputFloating ',
  helpText: 'Helpful text',
  name: 'playgroundTextareaInputFloating ',
};
