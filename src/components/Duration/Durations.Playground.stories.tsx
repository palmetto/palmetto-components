import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Duration, DurationProps } from './Duration';

export default {
  title: 'Components/Duration/Playground',
  component: Duration,
  argTypes: {
    milliseconds: {
      control: 'number',
    },
    seconds: {
      control: 'number',
    },
    minutes: {
      control: 'number',
    },
    roundUp: {
      control: 'boolean',
    },
    displayMinutes: {
      control: 'number',
    },
    displayHours: {
      control: 'number',
    },
    displayDays: {
      control: 'number',
    },
    as: {
      control: {
        type: 'select',
        options: ['span', 'p'],
      },
    },
    className: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<DurationProps> = ({ ...args }) => <Duration {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  milliseconds: 6000000,
};
