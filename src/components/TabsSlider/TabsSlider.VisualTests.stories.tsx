import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TabsSlider, TabsSliderProps } from './TabsSlider';
import { RESPONSIVE_STORY } from '../../../.storybook/constants';

export default {
  title: 'Components/TabsSlider/Visual Regression Tests',
  component: TabsSlider,
} as Meta;

const IconTemplate: Story<TabsSliderProps> = ({ ...args }) => <TabsSlider {...args} />;

export const ResponsiveSize = IconTemplate.bind({});
ResponsiveSize.args = {
  name: 'home',
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'lg',
  },
};
ResponsiveSize.parameters = RESPONSIVE_STORY;
