import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { SelectInput, SelectInputProps } from './SelectInput';

export default {
  title: 'Components/SelectInput/Playground',
  component: SelectInput,
  argTypes: {
    id: {
      control: 'text',
    },
    label: {
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
    isMulti: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg'],
      },
    },
    placeholder: {
      control: 'text',
    },
    options: {
      control: 'object',
    },
    menuPortalTarget: {
      control: 'none',
    },
  },
} as Meta;

const Template: Story<SelectInputProps> = ({ ...args }) => <SelectInput {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundSelectInput',
  label: 'Playground SelectInput',
  description: 'Helpful text',
  name: 'playgroundSelectInput',
  menuPortalTarget: document.body,
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
};
