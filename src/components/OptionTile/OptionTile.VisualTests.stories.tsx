import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { OptionTile, OptionTileProps } from './OptionTile';

export default {
  title: 'Components/OptionTile/Visual Regression Tests',
  component: OptionTile,
} as Meta;

const Template: Story<OptionTileProps> = args => (
  <OptionTile
    {...args}
    onChange={() => {}} // eslint-disable-line
  >
    {args.children} {/* eslint-disable-line */}
  </OptionTile>
);

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
  children: 'radio default',
  id: 'defaultRadio',
  name: 'default',
  value: 'default',
  label: 'default',
};

export const RadioOptionSelected = Template.bind({});
RadioOptionSelected.args = {
  isSelected: true,
  children: 'radio selected',
  id: 'radioSelected',
  name: 'radioSelected',
  value: 'radioSelected',
  label: 'radioSelected',
};

export const DefaultCheckbox = Template.bind({});
DefaultCheckbox.args = {
  inputType: 'checkbox',
  id: 'checkboxDefault',
  name: 'checkboxDefault',
  children: 'checkbox default',
  value: 'checkboxDefault',
  label: 'checkboxDefault',
};

export const CheckboxSelected = Template.bind({});
CheckboxSelected.args = {
  inputType: 'checkbox',
  id: 'selectedCheckbox',
  name: 'selectedCheckbox',
  children: 'selected checkbox',
  isSelected: true,
  value: 'checkboxSelected',
  label: 'checkboxSelected',
};

export const HiddenInput = Template.bind({});
HiddenInput.args = {
  id: 'hiddenInput',
  name: 'hiddenInput',
  children: 'hidden input',
  hideInput: true,
  value: 'hiddenInput',
  label: 'hiddenInput',
};
