import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Toggle, ToggleProps } from './Toggle';

export default {
  title: 'Components/Toggle/Playground',
  component: Toggle,
  argTypes: {
    id: {
      control: 'text',
    },
    isChecked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
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
  },
} as Meta;

const Template: Story<ToggleProps> = ({ ...args }) => <Toggle {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'togglePlayground',
  size: 'md',
  label: 'Toggle component playground',
  helpText: 'Help text',
};
