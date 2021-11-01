import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RESPONSIVE_STORY } from '../../docs/constants';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import { Box } from '../Box/Box';

export default {
  title: 'Components/RadioGroup/Visual Regression Tests',
  component: RadioGroup,
  parameters: RESPONSIVE_STORY,
} as Meta;

const sizes = [
  'sm',
  'md',
  'lg',
  {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'sm',
  },
] as RadioGroupProps['size'][];

const options = [
  {
    id: 'one',
    value: 'one',
    label: 'One',
  },
  {
    id: 'two',
    value: 'two',
    label: 'Two',
  },
  {
    id: 'three',
    value: 'three',
    label: 'Three',
  },
];

const Template: Story<RadioGroupProps> = ({ ...args }) => (
  <Box childGap="xl">
    {sizes.map(size => (
      <Box childGap="md" key={`${args.id}-${size}`}>
        { /* eslint-disable-next-line */}
        {/* @ts-ignore */} 
        <RadioGroup size={size} options={options} {...args} />
      </Box>
    ))}
  </Box>
);

export const AllSizes = Template.bind({});
AllSizes.args = { id: 'AllSizes' };

export const AllSizesChecked = Template.bind({});
AllSizesChecked.args = {
  id: 'AllSizesChecked',
  isRequired: true,
  title: 'title required',
  value: 'one',
};

export const AllSizesError = Template.bind({});
AllSizesError.args = { id: 'AllSizesError', error: 'Agreement is required' };

export const AllSizesDisabled = Template.bind({});
AllSizesDisabled.args = { id: 'AllSizesDisabled', isDisabled: true };

export const AllSizesDisabledChecked = Template.bind({});
AllSizesDisabledChecked.args = { id: 'AllSizesDisabledChecked', isDisabled: true, value: 'one' };

export const AllSizesTitle = Template.bind({});
AllSizesTitle.args = { id: 'AllSizesTitle', title: 'title' };

export const AllSizesTitleDisabled = Template.bind({});
AllSizesTitleDisabled.args = { id: 'AllSizesTitleDisabled', title: 'title', isDisabled: true };

export const AllSizesTitleDisabledError = Template.bind({});
AllSizesTitleDisabledError.args = {
  id: 'AllSizesTitleDisabledError',
  title: 'title',
  isDisabled: true,
  error: 'this is required',
};

export const AllSizesTitleDisabledErrorChecked = Template.bind({});
AllSizesTitleDisabledErrorChecked.args = {
  id: 'AllSizesTitleDisabledErrorChecked',
  title: 'title',
  isDisabled: true,
  error: 'this is required',
  value: 'one',
};

export const AllSizesTitleDisabledOption = Template.bind({});
AllSizesTitleDisabledOption.args = {
  id: 'AllSizesTitleDisabledOption',
  title: 'title',
  value: 'one',
  options: [
    ...options,
    {
      value: 'disabled',
      id: 'disabled',
      label: 'disabled',
      disabled: true,
    },
  ],
};

export const AllSizesTitleDisabledOptionSelected = Template.bind({});
AllSizesTitleDisabledOptionSelected.args = {
  id: 'AllSizesTitleDisabledOptionSelected',
  title: 'title',
  value: 'disabled',
  options: [
    ...options,
    {
      value: 'disabled',
      id: 'disabled',
      label: 'disabled',
      disabled: true,
    },
  ],
};

export const AllSizesHorizontal = Template.bind({});
AllSizesHorizontal.args = { id: 'AllSizesHorizontal', direction: 'row' };

export const AllSizesHorizontalChecked = Template.bind({});
AllSizesHorizontalChecked.args = {
  id: 'AllSizesHorizontalRequired',
  isRequired: true,
  title: 'title required',
  value: 'one',
  direction: 'row',
};

export const AllSizesHorizontalError = Template.bind({});
AllSizesHorizontalError.args = { id: 'AllSizesHorizontalError', error: 'Agreement is required', direction: 'row' };

export const AllSizesHorizontalDisabled = Template.bind({});
AllSizesHorizontalDisabled.args = { id: 'AllSizesHorizontalDisabled', isDisabled: true, direction: 'row' };

export const AllSizesHorizontalDisabledChecked = Template.bind({});
AllSizesHorizontalDisabledChecked.args = {
  id: 'AllSizesHorizontalDisabled',
  isDisabled: true,
  value: 'one',
  direction: 'row',
};

export const AllSizesHorizontalTitle = Template.bind({});
AllSizesHorizontalTitle.args = { id: 'AllSizesHorizontalTitle', title: 'title', direction: 'row' };

export const AllSizesHorizontalTitleDisabled = Template.bind({});
AllSizesHorizontalTitleDisabled.args = {
  id: 'AllSizesHorizontalTitleDisabled',
  title: 'title',
  isDisabled: true,
  direction: 'row',
};

export const AllSizesHorizontalTitleDisabledError = Template.bind({});
AllSizesHorizontalTitleDisabledError.args = {
  id: 'AllSizesHorizontalTitleDisabledError',
  title: 'title',
  isDisabled: true,
  error: 'this is required',
  direction: 'row',
};

export const AllSizesHorizontalTitleDisabledErrorChecked = Template.bind({});
AllSizesHorizontalTitleDisabledErrorChecked.args = {
  id: 'AllSizesHorizontalTitleDisabledErrorChecked',
  title: 'title',
  isDisabled: true,
  error: 'this is required',
  value: 'one',
  direction: 'row',
};

export const AllSizesHorizontalTitleDisabledOption = Template.bind({});
AllSizesHorizontalTitleDisabledOption.args = {
  id: 'AllSizesHorizontalTitleDisabledOption',
  title: 'title',
  value: 'one',
  options: [
    ...options,
    {
      value: 'disabled',
      id: 'disabled',
      label: 'disabled',
      disabled: true,
    },
  ],
  direction: 'row',
};

export const AllSizesHorizontalTitleDisabledOptionSelected = Template.bind({});
AllSizesHorizontalTitleDisabledOptionSelected.args = {
  id: 'AllSizesHorizontalTitleDisabledOptionSelected',
  title: 'title',
  value: 'disabled',
  options: [
    ...options,
    {
      value: 'disabled',
      id: 'disabled',
      label: 'disabled',
      disabled: true,
    },
  ],
  direction: 'row',
};
