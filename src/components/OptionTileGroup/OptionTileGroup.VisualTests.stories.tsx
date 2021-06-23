import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RESPONSIVE_STORY } from '../../docs/constants';
import { OptionTileGroup, OptionTileGroupProps } from './OptionTileGroup';

export default {
  title: 'Components/OptionTileGroup/Visual Regression Tests',
  component: OptionTileGroup,
} as Meta;

const options = [
  {
    id: 'chocolate_default',
    value: 'chocolate',
    label: 'Chocolate',
  },
  {
    id: 'strawberry_default',
    value: 'strawberry',
    label: 'Strawberry',
  },
  {
    id: 'vanilla_default',
    value: 'vanilla',
    label: 'Vanilla',
  },
];

const Template: Story<OptionTileGroupProps> = args => (
  <OptionTileGroup
    {...args}
    onChange={() => {}} // eslint-disable-line
  />
);

export const DefaultRadio = Template.bind({});
DefaultRadio.args = {
  options,
  name: 'default',
};

export const RadioOptionSelected = Template.bind({});
RadioOptionSelected.args = {
  options,
  value: 'chocolate',
  name: 'optionSelected',
};

export const MultipleOptionsNoneSelected = Template.bind({});
MultipleOptionsNoneSelected.args = {
  options,
  name: 'multiNone',
  isMulti: true,
};

export const MultipleOptionsOneSelected = Template.bind({});
MultipleOptionsOneSelected.args = {
  options,
  name: 'multiOne',
  isMulti: true,
  value: ['chocolate'],
};

export const MultipleOptionsAllSelected = Template.bind({});
MultipleOptionsAllSelected.args = {
  options,
  name: 'multiAll',
  isMulti: true,
  value: ['chocolate', 'vanilla', 'strawberry'],
};

export const RadioWithDisabledOption = Template.bind({});
RadioWithDisabledOption.args = {
  options: [
    ...options,
    {
      label: 'Cookies and Cream',
      value: 'cookies',
      id: 'cookies',
      disabled: true,
    },
  ],
  name: 'radioOneDisabled',
};

export const RadioWithDisabledOptionSelected = Template.bind({});
RadioWithDisabledOptionSelected.args = {
  options: [
    ...options,
    {
      label: 'Cookies and Cream',
      value: 'cookies',
      id: 'cookies',
      disabled: true,
    },
  ],
  name: 'radioOneDisabledSelected',
  value: 'cookies',
};

export const CheckboxWithDisabledOption = Template.bind({});
CheckboxWithDisabledOption.args = {
  options: [
    ...options,
    {
      label: 'Cookies and Cream',
      value: 'cookies',
      id: 'cookies',
      disabled: true,
    },
  ],
  name: 'checkboxWithDisabledOption',
  isMulti: true,
};

export const CheckboxWithDisabledOptionSelected = Template.bind({});
CheckboxWithDisabledOptionSelected.args = {
  options: [
    ...options,
    {
      label: 'Cookies and Cream',
      value: 'cookies',
      id: 'cookies',
      disabled: true,
    },
  ],
  name: 'checkboxWithDisabledOptionSelected',
  value: ['cookies'],
  isMulti: true,
};

export const RadioWithTitle = Template.bind({});
RadioWithTitle.args = {
  options: [
    ...options,
  ],
  name: 'radioWithTitle',
  title: 'Ice cream flavors',
};

export const RadioWithTitleRequired = Template.bind({});
RadioWithTitleRequired.args = {
  options: [
    ...options,
  ],
  name: 'radioWithTitleRequired',
  title: 'Ice cream flavors',
  isRequired: true,
};

export const RadioWithTitleAndDescription = Template.bind({});
RadioWithTitleAndDescription.args = {
  options: [
    ...options,
  ],
  name: 'radioOneWithTitleAndDescription',
  title: 'Ice cream flavors',
  description: 'Only if you finish your dinner',
};

export const RadioWithDescriptionOnly = Template.bind({});
RadioWithDescriptionOnly.args = {
  options: [
    ...options,
  ],
  name: 'radioOneWithDescriptionOnly',
  description: 'Only if you finish your dinner',
};

export const CheckboxWithTitle = Template.bind({});
CheckboxWithTitle.args = {
  options: [
    ...options,
  ],
  name: 'checkboxWithTitle',
  title: 'Ice cream flavors',
  isMulti: true,
};

export const CheckboxWithTitleAndDescription = Template.bind({});
CheckboxWithTitleAndDescription.args = {
  options: [
    ...options,
  ],
  name: 'checkboxOneWithTitleAndDescription',
  title: 'Ice cream flavors',
  description: 'Only if you finish your dinner',
  isMulti: true,
};

export const CheckboxWithDescriptionOnly = Template.bind({});
CheckboxWithDescriptionOnly.args = {
  options: [
    ...options,
  ],
  name: 'checkboxOneWithDescriptionOnly',
  description: 'Only if you finish your dinner',
  isMulti: true,
};

export const RadioWithError = Template.bind({});
RadioWithError.args = {
  options: [
    ...options,
  ],
  name: 'radioWithError',
  error: true,
};

export const RadioWithErrorTitleAndDescription = Template.bind({});
RadioWithErrorTitleAndDescription.args = {
  options: [
    ...options,
  ],
  name: 'radioWithErrorTitleAndDescription',
  error: true,
  title: 'Ice Cream Flavors',
  description: 'Only if you finish your dinner',
};

export const RadioRequiredWithErrorTitleAndDescription = Template.bind({});
RadioRequiredWithErrorTitleAndDescription.args = {
  options: [
    ...options,
  ],
  name: 'radioWithErrorTitleAndDescription',
  error: true,
  title: 'Ice Cream Flavors',
  description: 'Only if you finish your dinner',
  isRequired: true,
};

export const RadioWithErrorMessage = Template.bind({});
RadioWithErrorMessage.args = {
  options: [
    ...options,
  ],
  name: 'radioWithErrorMessage',
  error: 'something is wrong',
};

export const RadioWithErrorMessageTitleAndDescription = Template.bind({});
RadioWithErrorMessageTitleAndDescription.args = {
  options: [
    ...options,
  ],
  name: 'radioWithErrorMessageTitleAndDescription',
  title: 'Ice Cream Flavors',
  description: 'Only if you finish your dinner',
  error: 'something is wrong',
};

export const RadioRequiredWithErrorMessageTitleAndDescription = Template.bind({});
RadioRequiredWithErrorMessageTitleAndDescription.args = {
  options: [
    ...options,
  ],
  name: 'radioWithErrorMessageTitleAndDescription',
  title: 'Ice Cream Flavors',
  description: 'Only if you finish your dinner',
  isRequired: true,
  error: 'something is wrong',
};

export const RadioWithErrorAndSelectedOption = Template.bind({});
RadioWithErrorAndSelectedOption.args = {
  options: [
    ...options,
  ],
  name: 'radioWithErrorAndSelectedOption',
  error: true,
  value: 'chocolate',
};

export const RadioWithErrorAndSelectedDisabledOption = Template.bind({});
RadioWithErrorAndSelectedDisabledOption.args = {
  options: [
    ...options,
    {
      label: 'Cookies and Cream',
      value: 'cookies',
      id: 'cookies',
      disabled: true,
    },
  ],
  name: 'radioWithErrorAndSelectedDisabledOption',
  error: true,
  value: 'cookies',
};

export const CheckboxWithErrorAndSelectedOption = Template.bind({});
CheckboxWithErrorAndSelectedOption.args = {
  options: [
    ...options,
  ],
  name: 'checkboxWithErrorAndSelectedOption',
  error: true,
  value: ['chocolate'],
  isMulti: true,
};

export const CheckboxWithErrorAndSelectedDisabledOption = Template.bind({});
CheckboxWithErrorAndSelectedDisabledOption.args = {
  options: [
    ...options,
    {
      label: 'Cookies and Cream',
      value: 'cookies',
      id: 'cookies',
      disabled: true,
    },
  ],
  name: 'checkboxWithErrorAndSelectedOption',
  error: true,
  isMulti: true,
  value: ['cookies'],
};

export const RadioWithHorizontalDirection = Template.bind({});
RadioWithHorizontalDirection.args = {
  options: [
    ...options,
  ],
  name: 'radioWithHorizontalDirection',
  direction: 'row',
};

export const RadioWithContentWidthVertical = Template.bind({});
RadioWithContentWidthVertical.args = {
  options: [
    ...options,
  ],
  name: 'radioWithContentWidthVertical',
  isFullWidth: false,
};

export const RadioWithContentWidthHorizontal = Template.bind({});
RadioWithContentWidthHorizontal.args = {
  options: [
    ...options,
  ],
  name: 'radioWithContentWidthHorizontal',
  isFullWidth: false,
  direction: 'row',
};

export const RadioWithCustomContent = Template.bind({});
RadioWithCustomContent.args = {
  options: [
    ...options,
    {
      label: 'custom',
      value: 'custom',
      id: 'custom',
      render: () => <div>hello world, I am a custom node!</div>,
    },
  ],
  name: 'radioWithCustomContent',
};

export const CheckboxWithCustomContent = Template.bind({});
CheckboxWithCustomContent.args = {
  options: [
    ...options,
    {
      label: 'custom',
      value: 'custom',
      id: 'custom',
      render: () => <div>hello world, I am a custom node!</div>,
    },
  ],
  name: 'checkboxWithCustomContent',
  isMulti: true,
};

export const RadioWithHiddenRadio = Template.bind({});
RadioWithHiddenRadio.args = {
  options: [
    ...options,
  ],
  hideInput: true,
  name: 'radioWithHiddenRadio',
};

export const CheckboxWithHiddenCheckbox = Template.bind({});
CheckboxWithHiddenCheckbox.args = {
  options: [
    ...options,
  ],
  hideInput: true,
  name: 'checkboxWithHiddenCheckbox',
  isMulti: true,
};

export const ResponsiveDirection = Template.bind({});
ResponsiveDirection.args = {
  options: [
    ...options,
  ],
  direction: {
    base: 'column',
    tablet: 'row',
    desktop: 'column',
    hd: 'row',
  },
  name: 'radioWithResponsiveDirection',
};
ResponsiveDirection.parameters = RESPONSIVE_STORY;
