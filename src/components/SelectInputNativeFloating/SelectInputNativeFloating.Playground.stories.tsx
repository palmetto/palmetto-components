import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { boxPropsKeys } from '../Box/Box';
import {
  SelectInputNativeFloating,
  SelectInputNativeFloatingProps,
} from './SelectInputNativeFloating';

export default {
  title: 'Components/SelectInputNativeFloating/Playground',
  component: SelectInputNativeFloating,
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

const Template: Story<SelectInputNativeFloatingProps> = ({ ...args }) => (
  <SelectInputNativeFloating {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundSelectInputNativeFloating',
  label: 'Playground SelectInputNativeFloating',
  name: 'playgroundSelectInputNativeFloating',
  options: [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ],
};
