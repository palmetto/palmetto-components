import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Badge, { BadgeProps, BADGE_COLOR_MAP, BADGE_SIZE_MAP } from './Badge';

const badgeVariants = Object.keys(BADGE_COLOR_MAP);
const badgeSizes = Object.keys(BADGE_SIZE_MAP);

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
