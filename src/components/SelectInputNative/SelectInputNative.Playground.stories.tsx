import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { boxPropsKeys } from '../Box/Box';
import { SelectInputNative, SelectInputNativeProps } from './SelectInputNative';

export default {
  title: 'Components/SelectInputNative/Playground',
  component: SelectInputNative,
  argTypes: {
    id: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    value: {
      control: {
        type: 'radio',
        options: ['chocolate', 'strawberry', 'vanilla'],
      },
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
    isDisabled: {
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
    ...boxPropsKeys.reduce((acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }), {}),
  },
} as Meta;

const Template: Story<SelectInputNativeProps> = ({ ...args }) => <SelectInputNative {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundSelectInputNative',
  label: 'Playground SelectInputNative',
  name: 'playgroundSelectInputNative',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
};
