import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FONT_COLOR_OPTIONS } from '../../lib/tokens';
import { Spinner, SpinnerProps } from './Spinner';
import { SPINNER_SIZES } from './Spinner.constants';

export default {
  title: 'Components/Spinner/Playground',
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: FONT_COLOR_OPTIONS,
      },
    },
    size: {
      control: {
        type: 'select',
        options: SPINNER_SIZES,
      },
    },
    className: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<SpinnerProps> = ({ ...args }) => <Spinner {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  color: 'primary',
};
