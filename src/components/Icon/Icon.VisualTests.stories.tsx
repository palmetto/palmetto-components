import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Icon, IconProps } from './Icon';
import { Box } from '../Box/Box';
import { FONT_SIZE_OPTIONS, FONT_COLOR_OPTIONS } from '../../lib/tokens';
import { FontColor, FontSize } from '../../types';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/Icon/Visual Regression Tests',
  component: Icon,
} as Meta;

export const SizeAndColor: React.FunctionComponent<IconProps> = () => (
  <Box direction="row" gap="sm" background="grey-50">
    {FONT_SIZE_OPTIONS.map(size => (
      <Box gap="sm">
        {FONT_COLOR_OPTIONS.map(color => (
          <Icon
            name="home"
            size={size as FontSize}
            color={color as FontColor}
            key={`${size as FontSize}-${color as FontColor}`}
          />
        ))}
      </Box>
    ))}
  </Box>
);

const IconTemplate: Story<IconProps> = ({ ...args }) => <Icon {...args} />;

export const ResponsiveSize = IconTemplate.bind({});
ResponsiveSize.args = {
  name: 'home',
  size: {
    base: 'xs',
    tablet: 'lg',
    desktop: '2xl',
    hd: '5xl',
  },
  color: 'grey-600',
};
ResponsiveSize.parameters = RESPONSIVE_STORY;
