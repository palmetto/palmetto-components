import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FormLabel, FormLabelProps } from './FormLabel';

export default {
  title: 'Components/FormLabel/Playground',
  component: FormLabel,
  argTypes: {
    children: {
      control: 'text',
    },
    helpText: {
      control: 'text',
    },
    isDisabled: {
      control: 'boolean',
    },
    isRadioInputLabel: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<FormLabelProps> = ({ ...args }) => <FormLabel {...args} />;

export const Playground = Template.bind({});
Playground.args = {
  inputId: 'playgroundInput',
  children: 'Playground Form Label',
  helpText: 'Helpful text',
};
