import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TabsSlider, TabsSliderProps } from './TabsSlider';
import { RESPONSIVE_STORY } from '../../../.storybook/constants';

export default {
  title: 'Components/TabsSlider/Visual Regression Tests',
  component: TabsSlider,
} as Meta;

export const SizeAndColor: React.FunctionComponent<TabsSliderProps> = () => (
  <TabsSlider value={0} onChange={() => {}}>
    <TabsSlider.Item>Tab 1</TabsSlider.Item>
    <TabsSlider.Item>Tab 2</TabsSlider.Item>
    <TabsSlider.Item isDisabled>Tab 3 (disabled)</TabsSlider.Item>
  </TabsSlider>
);

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