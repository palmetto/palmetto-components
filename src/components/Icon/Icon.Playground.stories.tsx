import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Icon, IconProps } from './Icon';
import { FONT_SIZE_OPTIONS, FONT_COLOR_OPTIONS, ICON_NAMES } from '../../lib/tokens';

export default {
  title: 'Components/Icon/Playground',
  component: Icon,
  argTypes: {
    name: {
      control: {
        type: 'select',
        options: [null, ...ICON_NAMES],
      },
    },
    color: {
      control: {
        type: 'select',
        options: [null, ...FONT_COLOR_OPTIONS],
      },
    },
    size: {
      control: {
        type: 'select',
        options: [null, ...FONT_SIZE_OPTIONS],
      },
    },
  },
} as Meta;

const Template: Story<IconProps> = ({ ...args }) => <Icon {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  name: 'home',
  size: '5xl',
  color: 'grey-600',
};
