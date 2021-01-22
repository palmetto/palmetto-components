import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ICON_NAMES } from '../../lib/tokens';
import Button, { ButtonProps } from './Button';

const buttonVariants = ['primary', 'danger', 'light', 'dark', 'success'] as const;
const buttonSizes = ['xs', 'sm', 'md', 'lg'] as const;

export default {
  title: 'Components/Button/Controls Playground',
  component: Button,
  argTypes: {
    label: {
      type: { control: 'text' },
    },
    variant: {
      control: {
        type: 'select',
        options: buttonVariants,
      },
    },
    size: {
      control: {
        type: 'select',
        options: buttonSizes,
      },
    },
    isNaked: {
      control: 'boolean',
    },
    isOutlined: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    tabIndex: {
      type: { control: 'number' },
    },
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit', 'reset'],
      },
    },
    iconPrefix: {
      control: {
        type: 'select',
        options: [null, ...ICON_NAMES],
      },
    },
    iconSuffix: {
      control: {
        type: 'select',
        options: [null, ...ICON_NAMES],
      },
    },
    as: {
      control: {
        type: 'select',
        options: ['button', 'a'],
      },
    },
    href: {
      type: { control: 'text' },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = ({ label, ...args }) => <Button {...args}>{label}</Button>;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'primary',
  label: 'Playground Button',
};
