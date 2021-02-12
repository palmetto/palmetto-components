import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Box from '../Box/Box';
import { FONT_COLOR_OPTIONS, FONT_SIZE_OPTIONS } from '../../lib/tokens';
import { HEADING_LEVELS } from './Heading.constants';
import Heading, { HeadingProps } from './Heading';

export default {
  title: 'Components/Heading/Visual Regression Tests',
  component: Heading,
} as Meta;

const Template: Story<HeadingProps> = args => (
  <Box>
    {[...FONT_COLOR_OPTIONS].reverse().map(variant => (
      <Box>
        {[...FONT_SIZE_OPTIONS].map(size => (
          <Box>
            {[...HEADING_LEVELS].map(as => (
              <Heading
                {...args}
                variant={variant}
                size={size}
                as={as}
              />
            ))}
          </Box>
        ))}
      </Box>
    ))}
  </Box>
);

export const Variants = Template.bind({});
Variants.args = {
  children: 'Hello world!',
};
