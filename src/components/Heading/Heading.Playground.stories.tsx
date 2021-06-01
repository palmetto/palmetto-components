import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FONT_COLOR_OPTIONS, FONT_SIZE_OPTIONS } from '../../lib/tokens';
import { HEADING_LEVELS } from './Heading.constants';
import { Heading, HeadingProps } from './Heading';

export default {
  title: 'Components/Heading/Playground',
  component: Heading,
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: {
        type: 'select',
        options: [...FONT_COLOR_OPTIONS],
      },
    },
    className: {
      control: 'text',
    },
    as: {
      control: {
        type: 'select',
        options: [...HEADING_LEVELS],
      },
    },
    size: {
      control: {
        type: 'select',
        options: [...FONT_SIZE_OPTIONS],
      },
    },
  },
} as Meta;

const Template: Story<HeadingProps> = ({ ...args }) => <Heading {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  as: 'h4',
  children: 'Lead the world towards a clean energy future',
  variant: 'grey-darker',
  size: 'base',
};
