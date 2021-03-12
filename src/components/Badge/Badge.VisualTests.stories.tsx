import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  Badge,
  BadgeProps,
  BadgeSize,
  BadgeVariant,
  BADGE_COLOR_MAP,
  BADGE_SIZE_MAP,
} from './Badge';
import { Box } from '../Box/Box';

export default {
  title: 'Components/Badge/Visual Regression Tests',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = args => (
  <Box childGap="xl">
    {Object.keys(BADGE_SIZE_MAP).map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {Object.keys(BADGE_COLOR_MAP).map(variant => (
            <Badge
              {...args}
              variant={variant as BadgeVariant}
              size={size as BadgeSize}
              message={`${size as BadgeSize} ${variant as BadgeVariant}`}
              key={`${size as BadgeSize}-${variant as BadgeVariant}`}
            />
          ))}
        </Box>
      </Box>
    ))}
  </Box>
);

export const VariantsAndSizes = Template.bind({});
