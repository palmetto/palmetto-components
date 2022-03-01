import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Badge, BadgeProps } from './Badge';
import { BADGE_SIZES, BADGE_VARIANTS } from './Badge.constants';

export default {
  title: 'Components/Badge/Playground',
  component: Badge,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: BADGE_VARIANTS,
      },
    },
    size: {
      control: {
        type: 'select',
        options: BADGE_SIZES,
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
