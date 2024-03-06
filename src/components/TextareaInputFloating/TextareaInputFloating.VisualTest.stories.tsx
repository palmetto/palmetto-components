import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { within } from '@storybook/testing-library';
import {
  TextareaInputFloating,
  TextareaInputFloatingProps,
} from './TextareaInputFloating';
import { RESPONSIVE_STORY } from '../../docs/constants';

export default {
  title: 'Components/TextareaInputFloating/Visual Regression Tests',
  component: TextareaInputFloating,
} as Meta;

const Template: Story<TextareaInputFloatingProps> = args => (
  <TextareaInputFloating
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
