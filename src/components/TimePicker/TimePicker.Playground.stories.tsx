import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TimePicker, TimePickerProps } from './TimePicker';

export default {
  title: 'Components/TimePicker/Playground',
  component: TimePicker,
  argTypes: {
    startTime: {
      control: 'object',
    },
    endTime: {
      control: 'object',
    },
    locales: {
      control: 'text',
    },
    interval: {
      control: 'number',
    },
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
    dateDisplayOptions: {
      control: 'object',
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
    size: {
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg'],
      },
    },
    menuPortalTarget: {
      control: 'none',
    },
  },
} as Meta;

const Template: Story<TimePickerProps> = ({ ...args }) => <TimePicker {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  id: 'playgroundTimePicker',
  label: 'Playground TimePicker',
  name: 'playgroundTimePicker',
  menuPortalTarget: document.body,
};
