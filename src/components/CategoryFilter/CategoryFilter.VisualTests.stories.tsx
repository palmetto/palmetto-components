import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RESPONSIVE_STORY } from '../../docs/constants';
import { CategoryFilter, CategoryFilterProps } from './CategoryFilter';

export default {
  title: 'Components/CategoryFilter/Visual Regression Tests',
  component: CategoryFilter,
} as Meta;

const Template: Story<CategoryFilterProps> = ({ ...args }) => (
  <CategoryFilter {...args}>category filter</CategoryFilter> // eslint-disable-line @typescript-eslint/no-empty-function
);

export const Default = Template.bind({});
Default.args = {
  isSelected: false,
};

export const Selected = Template.bind({});
Selected.args = {
  isSelected: true,
};

export const ExtraSmallUnselected = Template.bind({});
ExtraSmallUnselected.args = {
  isSelected: false,
  size: 'xs',
};

export const SmallUnselected = Template.bind({});
SmallUnselected.args = {
  isSelected: false,
  size: 'sm',
};

export const MediumUnselected = Template.bind({});
MediumUnselected.args = {
  isSelected: false,
  size: 'md',
};

export const LargeUnselected = Template.bind({});
LargeUnselected.args = {
  isSelected: false,
  size: 'lg',
};

export const ExtraSmallSelected = Template.bind({});
ExtraSmallSelected.args = {
  isSelected: true,
  size: 'xs',
};

export const SmallSelected = Template.bind({});
SmallSelected.args = {
  isSelected: true,
  size: 'sm',
};

export const MediumSelected = Template.bind({});
MediumSelected.args = {
  isSelected: true,
  size: 'md',
};

export const LargeSelected = Template.bind({});
LargeSelected.args = {
  isSelected: true,
  size: 'lg',
};

export const ResponsiveUnselected = Template.bind({});
ResponsiveUnselected.args = {
  isSelected: false,
  size: {
    base: 'xs',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
};
ResponsiveUnselected.parameters = RESPONSIVE_STORY;

export const ResponsiveSelected = Template.bind({});
ResponsiveSelected.args = {
  isSelected: true,
  size: {
    base: 'xs',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
};
ResponsiveSelected.parameters = RESPONSIVE_STORY;

export const ExtraSmallUnselectedDisabled = Template.bind({});
ExtraSmallUnselectedDisabled.args = {
  isDisabled: true,
  isSelected: false,
  size: 'xs',
};

export const SmallUnselectedDisabled = Template.bind({});
SmallUnselectedDisabled.args = {
  isDisabled: true,
  isSelected: false,
  size: 'sm',
};

export const MediumUnselectedDisabled = Template.bind({});
MediumUnselectedDisabled.args = {
  isDisabled: true,
  isSelected: false,
  size: 'md',
};

export const LargeUnselectedDisabled = Template.bind({});
LargeUnselectedDisabled.args = {
  isDisabled: true,
  isSelected: false,
  size: 'lg',
};

export const ExtraSmallSelectedDisabled = Template.bind({});
ExtraSmallSelectedDisabled.args = {
  isDisabled: true,
  isSelected: true,
  size: 'xs',
};

export const SmallSelectedDisabled = Template.bind({});
SmallSelectedDisabled.args = {
  isDisabled: true,
  isSelected: true,
  size: 'sm',
};

export const MediumSelectedDisabled = Template.bind({});
MediumSelectedDisabled.args = {
  isDisabled: true,
  isSelected: true,
  size: 'md',
};

export const LargeSelectedDisabled = Template.bind({});
LargeSelectedDisabled.args = {
  isDisabled: true,
  isSelected: true,
  size: 'lg',
};

export const ResponsiveUnselectedDisabled = Template.bind({});
ResponsiveUnselectedDisabled.args = {
  isDisabled: true,
  isSelected: false,
  size: {
    base: 'xs',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
};
ResponsiveUnselectedDisabled.parameters = RESPONSIVE_STORY;

export const ResponsiveSelectedDisabled = Template.bind({});
ResponsiveSelectedDisabled.args = {
  isDisabled: true,
  isSelected: true,
  size: {
    base: 'xs',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
};
ResponsiveSelectedDisabled.parameters = RESPONSIVE_STORY;