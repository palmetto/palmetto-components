import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ICON_NAMES } from '../../lib/tokens';
import { Button, ButtonProps } from './Button';
import { BUTTON_SIZES, BUTTON_VARIANTS, BUTTON_TONE } from './Button.constants';

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
        options: BUTTON_VARIANTS,
      },
    },
    tone: {
      control: {
        type: 'select',
        options: BUTTON_TONE,
      },
    },
    size: {
      control: {
        type: 'select',
        options: BUTTON_SIZES,
      },
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
      control: 'number',
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
      control: 'text',
    },
  },
} as Meta;

const Template: Story<ButtonProps> = ({ ...args }) => <Button {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  variant: 'primary',
  children: 'Playground Button',
};
