import React, { ReactElement, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Toggle, ToggleProps } from './Toggle';
import { TOGGLE_SIZES } from './Toggle.constants';
import { Box } from '../Box/Box';

export default {
  title: 'Components/Toggle/Visual Regression Tests',
  component: Toggle,
} as Meta;

const Template: Story<ToggleProps> = args => (
  <Box childGap="xl">
    {TOGGLE_SIZES.map(size => (
      <Box childGap="md" key={`${args.id}-${size}`}>
        <Toggle
          {...args}
          id={`${args.id}-${size}-checked`}
          label="I agree to the Terms and Conditions and Privacy Policy"
          isChecked
          size={size}
          onChange={() => {}} // eslint-disable-line
        />
        <Toggle
          {...args}
          id={`${args.id}-${size}-unchecked`}
          label="I agree to the Terms and Conditions and Privacy Policy"
          size={size}
          onChange={() => {}} // eslint-disable-line
        />
      </Box>
    ))}
  </Box>
);

export const AllSizes = Template.bind({});
AllSizes.args = { id: 'AllSizes' };

export const AllSizesRequired = Template.bind({});
AllSizesRequired.args = { id: 'AllSizesRequired', isRequired: true };

export const AllSizesError = Template.bind({});
AllSizesError.args = { id: 'AllSizesError', error: 'Agreement is required' };

export const AllSizesDisabled = Template.bind({});
AllSizesDisabled.args = { id: 'AllSizesDisabled', isDisabled: true };

export const AllSizesHideLabel = Template.bind({});
AllSizesHideLabel.args = { id: 'AllSizesHideLabel', hideLabel: true };

export const AllSizesHideLabelError = Template.bind({});
AllSizesHideLabelError.args = {
  id: 'AllSizesHideLabelError',
  hideLabel: true,
  error: 'Agreement is required',
};

export const AllSizesWithHelpText = Template.bind({});
AllSizesWithHelpText.args = {
  id: 'AllSizesWithHelpText',
  helpText: 'This is helpful text',
};

export const AllSizesWithHelpTextRequired = Template.bind({});
AllSizesWithHelpTextRequired.args = {
  id: 'AllSizesWithHelpTextRequired',
  helpText: 'This is helpful text',
  isRequired: true,
};

export const AllSizesWithHelpTextRequiredError = Template.bind({});
AllSizesWithHelpTextRequiredError.args = {
  id: 'AllSizesWithHelpTextRequired',
  helpText: 'This is helpful text',
  isRequired: true,
  error: 'Agreement is required',
};
