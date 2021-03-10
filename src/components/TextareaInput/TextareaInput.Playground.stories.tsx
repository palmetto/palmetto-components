import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TextareaInput, TextareaInputProps } from './TextareaInput';

export default {
  title: 'Components/TextareaInput/Playground',
  component: TextareaInput,
  argTypes: {
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    rows: {
      control: 'number',
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
    isMulti: {
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
    resize: {
      control: {
        type: 'radio',
        options: ['vertical', 'horizontal', 'none', 'both'],
      },
    },

    maxLength: {
      control: 'number',
    },
  },
} as Meta;

const Template: Story<TextareaInputProps> = ({ ...args }) => <TextareaInput {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundTextareaInput',
  label: 'Playground TextareaInput',
  helpText: 'Helpful text',
  name: 'playgroundTextareaInput',
  rows: 5,
};
