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
        variant={variant}
      />
    ))}
    <Box className="m-top-xl m-bottom-md">
      <Heading size="md">
        isCompact
      </Heading>
    </Box>
    {AlertVariants.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant={variant}
        isCompact
      />
    ))}
  </Box>
);

export const VariantsWithMessage = Template.bind({});
VariantsWithMessage.args = {
  message: 'Hello world!',
};

export const WithMessageWithIcon = Template.bind({});
WithMessageWithIcon.args = {
  message: 'Hello world!',
  hasIcon: true,
};
WithMessageWithIcon.storyName = 'With Message, Icon';

export const WithMessageWithClosable = Template.bind({});
WithMessageWithClosable.args = {
  message: 'Hello world!',
  isClosable: true,
};
WithMessageWithClosable.storyName = 'With Message, Closable';

export const WithMessageWithIconWithClosable = Template.bind({});
WithMessageWithIconWithClosable.args = {
  message: 'Hello world!',
  isClosable: true,
  hasIcon: true,
};
WithMessageWithIconWithClosable.storyName = 'With Message, Icon, Closable';

export const WithMessageWithTitle = Template.bind({});
WithMessageWithTitle.args = {
  title: 'Title',
  message: 'Hello world!',
};
WithMessageWithTitle.storyName = 'With Message, Title';

export const WithMessageWithTitleWithIcon = Template.bind({});
WithMessageWithTitleWithIcon.args = {
  title: 'Title',
  message: 'Hello world!',
  hasIcon: true,
};
WithMessageWithTitleWithIcon.storyName = 'With Message, Title, Icon';

export const WithMessageWithTitleWithClosable = Template.bind({});
WithMessageWithTitleWithClosable.args = {
  title: 'Title',
  message: 'Hello world!',
  isClosable: true,
};
WithMessageWithTitleWithClosable.storyName = 'With Message, Title, Closable';

export const WithMessageWithTitleWithIconWithClosable = Template.bind({});
WithMessageWithTitleWithIconWithClosable.args = {
  title: 'Title',
  message: 'Hello world!',
  hasIcon: true,
  isClosable: true,
};
WithMessageWithTitleWithIconWithClosable.storyName = 'With Message, Title, Icon, Closable';

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Title',
};

export const WithTitleWithIcon = Template.bind({});
WithTitleWithIcon.args = {
  title: 'Title',
  hasIcon: true,
};
WithTitleWithIcon.storyName = 'With Title, Icon';

export const WithTitleWithClosable = Template.bind({});
WithTitleWithClosable.args = {
  title: 'Title',
  isClosable: true,
};
WithTitleWithClosable.storyName = 'With Title, Closable';

export const WithTitleWithIconWithClosable = Template.bind({});
WithTitleWithIconWithClosable.args = {
  title: 'Title',
  hasIcon: true,
  isClosable: true,
};
WithTitleWithIconWithClosable.storyName = 'With Title, Icon, Closable';
