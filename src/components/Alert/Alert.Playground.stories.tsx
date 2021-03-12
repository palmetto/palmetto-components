import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Alert, AlertProps } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';

export default {
  title: 'Components/Alert/Playground',
  component: Alert,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ALERT_VARIANTS,
      },
    },
    message: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    closeText: {
      control: 'text',
    },
    hasIcon: {
      control: 'boolean',
    },
    isCompact: {
      control: 'boolean',
    },
    isClosable: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<AlertProps> = ({ ...args }) => <Alert {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'default',
  message: 'default',
  className: '',
  closeText: '',
  hasIcon: false,
  isCompact: false,
  isClosable: false,
  title: '',
};
