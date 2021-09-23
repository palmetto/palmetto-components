import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput';

export default {
  title: 'Components/CheckboxInput/Playground',
  component: CheckboxInput,
  argTypes: {
    id: {
      control: 'text',
    },
    isChecked: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
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
    label: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isIndeterminate: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: Story<CheckboxInputProps> = ({ ...args }) => <CheckboxInput {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playGroundCheckbox',
  label: 'Playground Checkbox',
  helpText: 'Helpful text',
  isChecked: true,
};
