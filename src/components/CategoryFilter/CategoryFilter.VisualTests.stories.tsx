import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ComponentStory } from '@storybook/react';
import { Box } from '../Box/Box';
import { RESPONSIVE_STORY } from '../../docs/constants';
import {
  CategoryFilter,
  CategoryFilterProps,
  BaseCategoryFilterSize,
} from './CategoryFilter';
import CATEGORY_FILTER_SIZES from './CategoryFilter.constants';

export default {
  title: 'Components/CategoryFilter/Visual Regression Tests',
  component: CategoryFilter,
} as Meta;

const Template: Story<CategoryFilterProps> = ({ ...args }) => (
  <Box display="block" childGap="xl">
    {CATEGORY_FILTER_SIZES.map(size => (
      <Box gap="sm" key={size} direction="row">
        <CategoryFilter
          {...args}
          isSelected={false}
          size={size as BaseCategoryFilterSize}
        >
          {`${size} default`}
        </CategoryFilter>
        <CategoryFilter
          {...args}
          isSelected
          size={size as BaseCategoryFilterSize}
        >
          selected
        </CategoryFilter>
        <CategoryFilter
          {...args}
          isDisabled
          size={size as BaseCategoryFilterSize}
        >
          disabled
        </CategoryFilter>
        <CategoryFilter
          {...args}
          isSelected
          isDisabled
          size={size as BaseCategoryFilterSize}
        >
          disabled selected
        </CategoryFilter>
      </Box>
    ))}
  </Box>
);

export const SizesAndStates = Template.bind({});

export const ResponsiveSize: ComponentStory<typeof CategoryFilter> = () => (
  <CategoryFilter
    isSelected
    size={{
      base: 'xs',
      tablet: 'sm',
      desktop: 'md',
      hd: 'lg',
    }}
  >
    Responsive CategoryFilter
  </CategoryFilter>
);

ResponsiveSize.parameters = RESPONSIVE_STORY;
