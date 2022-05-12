import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { within } from '@storybook/testing-library';
import { RESPONSIVE_STORY } from '../../docs/constants';
import { CheckboxInput, CheckboxInputProps } from './CheckboxInput';

export default {
  title: 'Components/CheckboxInput/Visual Regression Tests',
  component: CheckboxInput,
  parameters: RESPONSIVE_STORY,
} as Meta;

const Template: Story<CheckboxInputProps> = ({ ...args }) => (
  <CheckboxInput {...args} onChange={() => {}} /> // eslint-disable-line @typescript-eslint/no-empty-function
);

export const ResponsiveSizeOneUnchecked = Template.bind({});
ResponsiveSizeOneUnchecked.args = {
  id: 'ResponsiveSizeOneUnchecked',
  label: 'ResponsiveSizeOneUnchecked',
  isChecked: false,
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'sm',
  },
};

export const ResponsiveSizeTwoUnchecked = Template.bind({});
ResponsiveSizeTwoUnchecked.args = {
  id: 'ResponsiveSizeTwoUnchecked',
  label: 'ResponsiveSizeTwoUnchecked',
  isChecked: false,
  size: {
    base: 'md',
    tablet: 'lg',
    desktop: 'sm',
    hd: 'md',
  },
};

export const ResponsiveSizeThreeUnchecked = Template.bind({});
ResponsiveSizeThreeUnchecked.args = {
  id: 'ResponsiveSizeThreeUnchecked',
  label: 'ResponsiveSizeThreeUnchecked',
  isChecked: false,
  size: {
    base: 'lg',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
};

export const ResponsiveSizeOneChecked = Template.bind({});
ResponsiveSizeOneChecked.args = {
  id: 'ResponsiveSizeOneChecked',
  label: 'ResponsiveSizeOneChecked',
  isChecked: true,
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'sm',
  },
};

export const ResponsiveSizeTwoChecked = Template.bind({});
ResponsiveSizeTwoChecked.args = {
  id: 'ResponsiveSizeTwoChecked',
  label: 'ResponsiveSizeTwoChecked',
  isChecked: true,
  size: {
    base: 'md',
    tablet: 'lg',
    desktop: 'sm',
    hd: 'md',
  },
};

export const ResponsiveSizeThreeChecked = Template.bind({});
ResponsiveSizeThreeChecked.args = {
  id: 'ResponsiveSizeThreeChecked',
  label: 'ResponsiveSizeThreeChecked',
  isChecked: true,
  size: {
    base: 'lg',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
};

export const ResponsiveSizeOneIndeterminate = Template.bind({});
ResponsiveSizeOneIndeterminate.args = {
  id: 'ResponsiveSizeOneIndeterminate',
  label: 'ResponsiveSizeOneIndeterminate',
  isChecked: true,
  size: {
    base: 'sm',
    tablet: 'md',
    desktop: 'lg',
    hd: 'sm',
  },
  isIndeterminate: true,
};

export const ResponsiveSizeTwoIndeterminate = Template.bind({});
ResponsiveSizeTwoIndeterminate.args = {
  id: 'ResponsiveSizeTwoIndeterminate',
  label: 'ResponsiveSizeTwoIndeterminate',
  isChecked: true,
  size: {
    base: 'md',
    tablet: 'lg',
    desktop: 'sm',
    hd: 'md',
  },
  isIndeterminate: true,
};

export const ResponsiveSizeThreeIndeterminate = Template.bind({});
ResponsiveSizeThreeIndeterminate.args = {
  id: 'ResponsiveSizeThreeIndeterminate',
  label: 'ResponsiveSizeThreeIndeterminate',
  isChecked: true,
  size: {
    base: 'lg',
    tablet: 'sm',
    desktop: 'md',
    hd: 'lg',
  },
  isIndeterminate: true,
};

export const FocusChecked = Template.bind({});
FocusChecked.args = {
  id: 'FocusUnchecked',
  label: 'Focus Checked',
  isChecked: true,
};

FocusChecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('checkbox').focus();
};

export const FocusUnchecked = Template.bind({});
FocusUnchecked.args = {
  id: 'FocusUnchecked',
  label: 'Focus Unchecked',
  isChecked: false,
};

FocusUnchecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('checkbox').focus();
};

export const FocusErrorChecked = Template.bind({});
FocusErrorChecked.args = {
  id: 'FocusErrorChecked',
  label: 'Focus Error Checked',
  isChecked: true,
  error: true,
};

FocusErrorChecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('checkbox').focus();
};

export const FocusErrorUnchecked = Template.bind({});
FocusErrorUnchecked.args = {
  id: 'FocusErrorUnchecked',
  label: 'Focus Error Unchecked',
  isChecked: false,
};

FocusErrorUnchecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole('checkbox').focus();
};
