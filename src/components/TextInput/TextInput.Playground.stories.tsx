import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TextInput, TextInputProps } from './TextInput';

export default {
  title: 'Components/TextInput/Playground',
  component: TextInput,
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
        options: ['sm', 'md', 'lg'],
      },
    },
    inputMask: {
      control: {
        type: 'radio',
        options: ['', 'phone', 'creditCard'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      },
    },
  },
} as Meta;

const Template: Story<TextInputProps> = ({ ...args }) => <TextInput {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundTextInput',
  label: 'Playground TextInput',
  helpText: 'Helpful text',
  name: 'playgroundTextInput',
};
