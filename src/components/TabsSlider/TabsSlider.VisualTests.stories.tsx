import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TabsSlider, TabsSliderProps } from './TabsSlider';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/TabsSlider/Visual Regression Tests',
  component: TabsSlider,
} as Meta;

const Template: Story<TabsSliderProps> = ({ ...args }) => (
  <TabsSlider {...args}>
    <TabsSlider.Item>Tab 1</TabsSlider.Item>
    <TabsSlider.Item>Tab 2</TabsSlider.Item>
    <TabsSlider.Item>Tab 3</TabsSlider.Item>
    <TabsSlider.Item isDisabled>Disabled</TabsSlider.Item>
  </TabsSlider>
);

export const ResponsiveSize = Template.bind({});
ResponsiveSize.args = {
  value: 0,
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'lg',
  },
};
ResponsiveSize.parameters = RESPONSIVE_STORY;
