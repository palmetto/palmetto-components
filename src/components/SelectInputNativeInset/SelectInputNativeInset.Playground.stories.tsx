import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { boxPropsKeys } from '../Box/Box';
import {
  SelectInputNativeInset,
  SelectInputNativeInsetProps,
} from './SelectInputNativeInset';

export default {
  title: 'Components/SelectInputNativeInset/Playground',
  component: SelectInputNativeInset,
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
        options: ['md', 'lg'],
      },
    },
    placeholder: {
      control: 'text',
    },
    options: {
      control: 'object',
    },
    requiredIndicator: {
      control: 'text',
    },
    ...boxPropsKeys.reduce(
      (acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }),
      {},
    ),
  },
} as Meta;

const Template: Story<SelectInputNativeInsetProps> = ({ ...args }) => (
  <SelectInputNativeInset {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundSelectInputNativeInset',
  label: 'Playground SelectInputNativeInset',
  name: 'playgroundSelectInputNativeInset',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
};
