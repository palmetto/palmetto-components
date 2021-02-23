import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Badge, { BadgeProps } from './Badge';
import { BADGE_SIZES, BADGE_VARIANTS } from './Badge.constants';
import Box from '../Box/Box';

export default {
  title: 'Components/Badge/Visual Regression Tests',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = args => (
  <Box childGap="xl">
    {BADGE_SIZES.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {BADGE_VARIANTS.map(variant => (
            <Badge
              {...args}
              variant={variant}
              size={size}
              message={`${size} ${variant}`}
              key={`${size}-${variant}`}
            />
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);

export const VariantsAndSizes = Template.bind({});
