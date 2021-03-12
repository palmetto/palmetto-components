import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Spinner, SpinnerProps } from './Spinner';
import { BRAND_COLOR_NAMES } from '../../lib/tokens';
import { SPINNER_SIZES } from './Spinner.constants';

export default {
  title: 'Components/Spinner/Playground',
  component: Spinner,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: BRAND_COLOR_NAMES,
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
  variant: 'primary',
};
