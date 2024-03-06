import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Box } from '../components/Box/Box';
import { SelectInput } from '../components/SelectInput/SelectInput';
import { SelectInputNative } from '../components/SelectInputNative/SelectInputNative';
import { TextInput } from '../components/TextInput/TextInput';
import { TextInputInset } from '../components/TextInputInset/TextInputInset';
import { Toggle } from '../components/Toggle/Toggle';

export default {
  title: 'Patterns/Form Controls/Visual Regression Tests',
} as Meta;

const Template: Story = args => {
  const [formValues, setFormValues] = useState({
    textInputSm: '',
    textInputMd: '',
    textInputLg: '',
    selectInput: {
      value: 'chocolate',
      label: 'Chocolate',
    },
    toggleValue: false,
  });
  const options = [
    {
      value: 'chocolate',
      label: 'Chocolate',
    },
    {
      value: 'strawberry',
      label: 'Strawberry',
    },
    {
      value: 'vanilla',
      label: 'Vanilla',
    },
  ];
  const handleChange = (key: string, value: unknown) => {
    setFormValues(prevFields => ({
      ...prevFields,
      [key]: value,
    }));
  };
  return (
    <Box direction="row" gap="xs">
      <Box gap="sm" width="110px">
        <Box height="32px" />
        <Box display="block">
          <TextInputInset
            label="floating md"
            id="mdTextInset"
            value={formValues.textInputMd}
            placeholder="Medium"
            onChange={event => handleChange('textInputMd', event.target.value)}
            {...args}
          />
        </Box>
        <Box>
          <TextInputInset
            label="floating lg"
            id="lgTextInset"
            value={formValues.textInputLg}
            placeholder="Large"
            size="lg"
            onChange={event => handleChange('textInputLg', event.target.value)}
            {...args}
          />
        </Box>
      </Box>
      <Box gap="sm" width="110px">
        <Box display="block">
          <TextInput
            id="smText"
            label="Small"
            value={formValues.textInputSm}
            placeholder="Small"
            size="sm"
            onChange={event => handleChange('textInputSm', event.target.value)}
            {...args}
          />
        </Box>
        <Box display="block">
          <TextInput
            id="mdText"
            label="Medium"
            value={formValues.textInputMd}
            placeholder="Medium"
            onChange={event => handleChange('textInputMd', event.target.value)}
            {...args}
          />
        </Box>
        <Box>
          <TextInput
            id="lgText"
            label="Large"
            value={formValues.textInputLg}
            placeholder="Large"
            size="lg"
            onChange={event => handleChange('textInputLg', event.target.value)}
            {...args}
          />
        </Box>
      </Box>
      <Box gap="sm" width="150px" alignItems="flex-start">
        <SelectInputNative
          id="smallSelectNative"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput.value}
          size="sm"
          {...args}
        />
        <SelectInputNative
          id="mediumSelectNative"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput.value}
          size="md"
          {...args}
        />
        <SelectInputNative
          id="largeSelectNative"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput.value}
          size="lg"
          {...args}
        />
      </Box>
      <Box gap="sm" width="150px" alignItems="flex-start">
        <SelectInput
          id="smallSelect"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput}
          size="sm"
          {...args}
        />
        <SelectInput
          id="mediumSelect"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput}
          size="md"
          {...args}
        />
        <SelectInput
          id="largeSelect"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput}
          size="lg"
          {...args}
        />
      </Box>
      <Box gap="sm" width="200px" alignItems="flex-start">
        <SelectInput
          id="smallMultiSelect"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput}
          isMulti
          size="sm"
          {...args}
        />
        <SelectInput
          id="mediumMultiSelect"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput}
          isMulti
          size="md"
          {...args}
        />
        <SelectInput
          id="largeMultiSelect"
          label="Label"
          onChange={event => handleChange('selectInput', event.target.value)}
          options={options}
          value={formValues.selectInput}
          isMulti
          size="lg"
          {...args}
        />
      </Box>
      <Box gap="sm">
        <Toggle
          id="smToggle"
          label="small toggle"
          onChange={event => handleChange('toggleValue', event.target.checked)}
          isChecked={formValues.toggleValue}
          size="sm"
          {...args}
        />
        <Toggle
          id="mdToggle"
          label="medium toggle"
          onChange={event => handleChange('toggleValue', event.target.checked)}
          isChecked={formValues.toggleValue}
          size="md"
          {...args}
        />
        <Toggle
          id="lgToggle"
          label="large toggle"
          onChange={event => handleChange('toggleValue', event.target.checked)}
          isChecked={formValues.toggleValue}
          size="lg"
          {...args}
        />
      </Box>
    </Box>
  );
};

export const SizesWithoutLabels = Template.bind({});
SizesWithoutLabels.args = { hideLabel: true };

export const SizesWithoutLabelsAndErrors = Template.bind({});
SizesWithoutLabelsAndErrors.args = {
  hideLabel: true,
  error: 'validation error message',
};

export const SizesWithLabels = Template.bind({});

export const SizesWithLabelsAndErrors = Template.bind({});
SizesWithLabelsAndErrors.args = { error: 'validation error message' };
