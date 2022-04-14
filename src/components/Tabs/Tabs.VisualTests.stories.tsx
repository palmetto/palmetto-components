import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Tabs, TabsProps } from './Tabs';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/Tabs/Visual Regression Tests',
  component: Tabs,
} as Meta;

const Template: Story<TabsProps> = ({ ...args }) => (
  <Tabs {...args}>
    <Tabs.Item>Tab 1</Tabs.Item>
    <Tabs.Item>Tab 2</Tabs.Item>
    <Tabs.Item>Tab 3</Tabs.Item>
    <Tabs.Item isDisabled>Disabled</Tabs.Item>
    <Tabs.Item>Tab 5</Tabs.Item>
    <Tabs.Item>Tab 6</Tabs.Item>
    <Tabs.Item>Tab 7</Tabs.Item>
    <Tabs.Item>Tab 8</Tabs.Item>
  </Tabs>
);

export const ManyTabs = Template.bind({});
ManyTabs.args = {
  value: 0,
};
ManyTabs.parameters = RESPONSIVE_STORY;

export const ManyTabsLastSelected = Template.bind({});
ManyTabsLastSelected.args = {
  value: 7,
};
ManyTabsLastSelected.parameters = RESPONSIVE_STORY;
