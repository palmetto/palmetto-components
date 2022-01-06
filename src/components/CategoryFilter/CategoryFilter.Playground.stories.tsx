import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { CategoryFilter, CategoryFilterProps } from './CategoryFilter';

export default {
  title: 'Components/CategoryFilter/Playground',
  component: CategoryFilter,
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} as Meta;

const Template: Story<CategoryFilterProps> = ({ ...args }) => <CategoryFilter {...args}>My Category</CategoryFilter>;

export const Playground = Template.bind({});
Playground.args = {
  isSelected: false,
  isDisabled: false,
  size: 'md',
};
