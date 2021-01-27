import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ICON_NAMES } from '../../lib/tokens';
import Button, { ButtonProps, ButtonSizes, ButtonVariants } from './Button';

export default {
  title: 'Components/Button/Playground',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: {
        type: 'select',
        options: ButtonVariants,
      },
    },
    size: {
      control: {
        type: 'select',
        options: ButtonSizes,
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

const Template: Story<ButtonProps> = ({ ...args }) => <Button {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'primary',
  children: 'Playground Button',
};
