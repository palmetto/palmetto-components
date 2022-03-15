import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { TextareaInput, TextareaInputProps } from './TextareaInput';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/TextareaInput/Visual Regression Tests',
  component: TextareaInput,
} as Meta;

const Template: Story<TextareaInputProps> = args => (
  <TextareaInput
    {...args}
    onChange={() => {}} // eslint-disable-line
  />
);

export const ResponsiveSize = Template.bind({});
ResponsiveSize.args = {
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'sm',
  },
  value: 'Responsive size',
  label: 'Textarea Input Visual Test',
};
ResponsiveSize.parameters = RESPONSIVE_STORY;
