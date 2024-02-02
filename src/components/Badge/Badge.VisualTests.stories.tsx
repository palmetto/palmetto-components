import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  Badge,
  BadgeProps,
  BadgeSize,
  BadgeVariant,
} from './Badge';
import { Box } from '../Box/Box';
import { BADGE_SIZES, BADGE_VARIANTS } from './Badge.constants';

export default {
  title: 'Components/Badge/Visual Regression Tests',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = args => (
  <Box gap="xl">
    {BADGE_SIZES.map(size => (
      <Box gap="sm" key={size}>
        <Box gap="sm" direction="row">
          {BADGE_VARIANTS.map(variant => (
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
