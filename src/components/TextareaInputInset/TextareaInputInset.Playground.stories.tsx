import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  TextareaInputInset,
  TextareaInputInsetProps,
} from './TextareaInputInset';

export default {
  title: 'Components/TextareaInputInset/Playground',
  component: TextareaInputInset,
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
    maxLength: {
      control: 'number',
    },
    rows: {
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
  },
} as Meta;

const Template: Story<TextareaInputInsetProps> = ({ ...args }) => (
  <TextareaInputInset {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundTextareaInputInset ',
  label: 'Playground TextareaInputInset ',
  helpText: 'Helpful text',
  name: 'playgroundTextareaInputInset ',
};
