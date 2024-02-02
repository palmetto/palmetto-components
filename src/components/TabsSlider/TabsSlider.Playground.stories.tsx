import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Box, boxPropsKeys } from '../Box/Box';
import { TabsSlider, TabsSliderProps } from './TabsSlider';
import { TabPanels } from '../TabPanels/TabPanels';

export default {
  title: 'Components/TabsSlider/Playground',
  component: TabsSlider,
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: [0, 1, 2],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    disabledTabs: {
      control: {
        type: 'check',
        options: [0, 1, 2],
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
    ...boxPropsKeys.reduce((acc, curr) => ({ ...acc, [curr]: { table: { disable: true } } }), {}),
  },
} as Meta;

const Template: Story<TabsSliderProps> = ({
  value,
  size,
  disabledTabs,
  ...args
}) => (
  <Box gap="md">
    <TabsSlider value={value} size={size} {...args}>
      <TabsSlider.Item isDisabled={disabledTabs.includes(0)}>
        Tab 0
      </TabsSlider.Item>
      <TabsSlider.Item isDisabled={disabledTabs.includes(1)}>
        Tab 1
      </TabsSlider.Item>
      <TabsSlider.Item isDisabled={disabledTabs.includes(2)}>
        Tab 2
      </TabsSlider.Item>
    </TabsSlider>
    <TabPanels value={value}>
      <Box padding="md" background="grey-50">
        Panel 0
      </Box>
      <Box padding="md" background="grey-50">
        Panel 1
      </Box>
      <Box padding="md" background="grey-50">
        Panel 2
      </Box>
    </TabPanels>
  </Box>
);

export const Playground = Template.bind({});

Playground.args = {
  value: 0,
  size: 'md',
  disabledTabs: [],
};
