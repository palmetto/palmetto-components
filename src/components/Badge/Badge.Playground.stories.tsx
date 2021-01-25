import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Badge, { BadgeProps } from './Badge';

const badgeVariants = [
  'info',
  'primary',
  'success',
  'danger',
  'warning',
  'tertiary',
  'secondary',
  'default',
] as const;
const badgeSizes = ['sm', 'md', 'lg', 'xl'] as const;

export default {
  title: 'Components/Badge/Playground',
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: badgeVariants,
      },
    },
    size: {
      control: {
        type: 'select',
        options: badgeSizes,
      },
    },
    message: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<BadgeProps> = ({ ...args }) => <Badge {...args} />;

/**
 * Use the playground to see different results
 */

export const Playground = Template.bind({});
Playground.args = {
  variant: 'primary',
  message: 'install ready',
};
