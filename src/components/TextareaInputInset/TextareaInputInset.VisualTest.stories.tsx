import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { within } from '@storybook/testing-library';
import {
  TextareaInputInset,
  TextareaInputInsetProps,
} from './TextareaInputInset';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/TextareaInputInset/Visual Regression Tests',
  component: TextareaInputInset,
} as Meta;

const Template: Story<TextareaInputInsetProps> = args => (
  <TextareaInputInset
    {...args}
    onChange={() => {}} // eslint-disable-line
  />
);

export const DefaultFocus = Template.bind({});

DefaultFocus.args = {
  label: 'Default Focus',
};

DefaultFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByLabelText('Default Focus').focus();
};

export const ErrorFocus = Template.bind({});

ErrorFocus.args = {
  label: 'Error Focus',
  error: 'validation message',
};

ErrorFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByLabelText('Error Focus').focus();
};

export const ResponsiveSize = Template.bind({});
ResponsiveSize.args = {
  size: {
    base: 'md',
    tablet: 'lg',
    desktop: 'md',
    hd: 'lg',
  },
  label: 'label',
  value: 'responsive',
  suffix: '00',
  prefix: '$',
};
ResponsiveSize.parameters = RESPONSIVE_STORY;
