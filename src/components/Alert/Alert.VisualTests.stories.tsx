import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Alert, { AlertProps, AlertVariants } from './Alert';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';

export default {
  title: 'Components/Alert/Visual Regression Tests',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = args => (
  <Box>
    {AlertVariants.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant= {variant}
      />
    ))}
    <Box className="m-top-xl m-bottom-md">
      <Heading size="lg">
       isCompact
      </Heading>
    </Box>
    {AlertVariants.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant= {variant}
        isCompact= {true}
      />
    ))}
  </Box>
);

export const VariantsWithMessage = Template.bind({});
VariantsWithMessage.args = {
  message: 'Hello world!',
}

export const WithMessageWithIcon = Template.bind({});
WithMessageWithIcon.args = {
  message: 'Hello world!',
  hasIcon: true,
}

export const WithMessageWithClosable = Template.bind({});
WithMessageWithClosable.args = {
  message: 'Hello world!',
  isClosable: true,
}

export const WithMessageWithIconWithClosable = Template.bind({});
WithMessageWithIconWithClosable.args = {
  message: 'Hello world!',
  isClosable: true,
  hasIcon: true,
}

export const WithMessageWithTitle = Template.bind({});
WithMessageWithTitle.args = {
  title: 'Title',
  message: 'Hello world!',
}

export const WithTitleWithMessageWithClosable = Template.bind({});
WithTitleWithMessageWithClosable.args = {
  title: 'Title',
  message: 'Hello world!',
  isClosable: true,
}

export const WithTitleWithMessageWithIcon = Template.bind({});
WithTitleWithMessageWithIcon.args = {
  title: 'Title',
  message: 'Hello world!',
  hasIcon: true,
}

export const WithTitleWithMessageWithIconWithClosable = Template.bind({});
WithTitleWithMessageWithIconWithClosable.args = {
  title: 'Title',
  message: 'Hello world!',
  hasIcon: true,
  isClosable: true,
}

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Title',
}

export const WithTitleWithClosable = Template.bind({});
WithTitleWithClosable.args = {
  title: 'Title',
  isClosable: true,
}

export const WithTitleWithIcon = Template.bind({});
WithTitleWithIcon.args = {
  title: 'Title',
  hasIcon: true,
}

export const WithTitleWithIconWithClosable = Template.bind({});
WithTitleWithIconWithClosable.args = {
  title: 'Title',
  hasIcon: true,
  isClosable: true,
}