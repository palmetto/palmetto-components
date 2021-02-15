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

const SizeTemplate: Story<HeadingProps> = args => (
  <Box>
    {[...FONT_SIZE_OPTIONS].map(size => (
      <Box>
        <Heading
          {...args}
          size={size}
        />
      </Box>
    ))}
  </Box>
);

const ColorTemplate: Story<HeadingProps> = args => (
  <Box>
    {[...FONT_COLOR_OPTIONS].reverse().map(variant => (
      <Box>
        <Box>
          <Heading
            {...args}
            variant={variant}
          />
        </Box>
      </Box>
    ))}
  </Box>
);

export const Size = SizeTemplate.bind({});
Size.args = {
  children: 'Hello world!',
};

export const Color = ColorTemplate.bind({});
Color.args = {
  children: 'Hello world!',
};
