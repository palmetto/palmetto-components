import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

export default {
  title: 'Components/RadioGroup/Playground',
  component: RadioGroup,
  argTypes: {
    value: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    direction: {
      control: {
        type: 'radio',
        options: ['column', 'row'],
      },
    },
    options: {
      control: 'object',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta;

const Template: Story<RadioGroupProps> = ({ ...args }) => <RadioGroup {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  title: 'Playground Radiogroup',
  description: 'Choose your favorite flavor',
  name: 'playgroundRadioGroup',
  direction: 'row',
  value: 'chocolate',
  options: [
    {
      id: 'chocolate',
      value: 'chocolate',
      label: 'Chocolate',
    },
    {
      id: 'strawberry',
      value: 'strawberry',
      label: 'Strawberry',
    },
    {
      id: 'vanilla',
      value: 'vanilla',
      label: 'Vanilla',
    },
  ],
};
