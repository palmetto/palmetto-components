import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Badge, { BadgeProps, BadgeSizes, BadgeVariants } from './Badge';
import Box from '../Box/Box';

export default {
  title: 'Components/Badge/Visual Regression Tests',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = args => (
  <Box childGap="xl">
    {BadgeSizes.map(size => (
      <Box childGap="sm" key={size}>
        <Box childGap="sm" direction="row">
          {BadgeVariants.map(variant => (
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
