import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Box, { BoxProps } from './Box';
import {
  BORDER_RADIUS_OPTIONS,
  BOX_SHADOW_OPTIONS,
  FONT_COLOR_OPTIONS,
  FONT_SIZE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  SPACING_OPTIONS,
  BRAND_COLOR_OPTIONS,
} from '../../lib/tokens';

export default {
  title: 'Components/Box/Playground',
  component: Box,
  argTypes: {
    background: {
      control: {
        type: 'select',
        options: BRAND_COLOR_OPTIONS,
      },
    },
    radius: {
      control: {
        type: 'select',
        options: BORDER_RADIUS_OPTIONS,
      },
    },
    shadow: {
      control: {
        type: 'select',
        options: BOX_SHADOW_OPTIONS,
      },
    },
    childGap: {
      control: {
        type: 'select',
        options: SPACING_OPTIONS,
      },
    },
    color: {
      control: {
        type: 'select',
        options: FONT_COLOR_OPTIONS,
      },
    },
    fontSize: {
      control: {
        type: 'select',
        options: FONT_SIZE_OPTIONS,
      },
    },
    fontWeight: {
      control: {
        type: 'select',
        options: FONT_WEIGHT_OPTIONS,
      },
    },
    direction: {
      control: {
        type: 'select',
        options: ['column', 'row'],
      },
    },
    margin: {
      control: {
        type: 'select',
        options: SPACING_OPTIONS,
      },
    },
    padding: {
      control: {
        type: 'select',
        options: SPACING_OPTIONS,
      },
    },
    display: {
      control: {
        type: 'select',
        options: [
          'none',
          'flex',
          'inline-flex',
          'block',
          'inline-block',
          'inline',
          'inherit',
          'grid',
        ],
      },
    },
  },
} as Meta;

const Template: Story<BoxProps> = ({ ...args }) => (
  <Box {...args}>
    <Box width="lg" height="lg" background="info-200">
      1
    </Box>
    <Box width="lg" height="lg" background="info-200">
      2
    </Box>
    <Box width="lg" height="lg" background="info-200">
      3
    </Box>
    <Box width="lg" height="lg" background="info-200">
      4
    </Box>
    <Box width="lg" height="lg" background="info-200">
      5
    </Box>
  </Box>
);

export const Playground = Template.bind({});
Playground.args = {
  background: 'info-100',
  childGap: 'sm',
  direction: 'row',
};
