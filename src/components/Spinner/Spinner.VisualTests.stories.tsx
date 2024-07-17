import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Spinner, SpinnerProps } from './Spinner';
import { Box } from '../Box/Box';
import { FONT_COLOR_OPTIONS } from '../../lib/tokens';
import { SPINNER_SIZES } from './Spinner.constants';

export default {
  title: 'Components/Spinner/Visual Regression Tests',
  component: Spinner,
} as Meta;

const Template: Story<SpinnerProps> = args => (
  <Box gap="xl">
    {SPINNER_SIZES.map(size => (
      <Box gap="sm" key={size}>
        <Box gap="sm" direction="row">
          {FONT_COLOR_OPTIONS.map(variant => (
            <Spinner
              {...args}
              color={variant}
              size={size}
              key={`${size}-${variant}`}
            />
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);

export const VariantsAndSizes = Template.bind({});
