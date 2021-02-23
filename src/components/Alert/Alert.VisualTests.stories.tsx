import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Alert, { AlertProps } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';

export default {
  title: 'Components/Alert/Visual Regression Tests',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = args => (
  <Box>
    {ALERT_VARIANTS.map(variant => (
      <Alert {...args} className="m-bottom-md" variant={variant} key={variant} />
    ))}
    <Box className="m-top-xl m-bottom-md">
      <Heading size="md">isCompact</Heading>
    </Box>
    {ALERT_VARIANTS.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant={variant}
        isCompact
        key={`compact-${variant}`}
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

export const WithMessageWithCloseText = Template.bind({});
WithMessageWithCloseText.args = {
  message: 'Hello world!',
  isClosable: true,
  closeText: 'Close',
};
WithMessageWithCloseText.storyName = 'With Message, Close Text';

export const WithMessageWithIconWithClosable = Template.bind({});
WithMessageWithIconWithClosable.args = {
  message: 'Hello world!',
  isClosable: true,
  hasIcon: true,
};
WithMessageWithIconWithClosable.storyName = 'With Message, Icon, Closable';

export const WithMessageWithIconWithCloseText = Template.bind({});
WithMessageWithIconWithCloseText.args = {
  message: 'Hello world!',
  isClosable: true,
  closeText: 'Close',
  hasIcon: true,
};
WithMessageWithIconWithCloseText.storyName = 'With Message, Icon, Close Text';

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

export const WithMessageWithTitleWithCloseText = Template.bind({});
WithMessageWithTitleWithCloseText.args = {
  title: 'Title',
  message: 'Hello world!',
  closeText: 'Close',
  isClosable: true,
};
WithMessageWithTitleWithCloseText.storyName = 'With Message, Title, Close Text';

export const WithMessageWithTitleWithIconWithClosable = Template.bind({});
WithMessageWithTitleWithIconWithClosable.args = {
  title: 'Title',
  message: 'Hello world!',
  hasIcon: true,
  isClosable: true,
};
WithMessageWithTitleWithIconWithClosable.storyName = 'With Message, Title, Icon, Closable';

export const WithMessageWithTitleWithIconWithCloseText = Template.bind({});
WithMessageWithTitleWithIconWithCloseText.args = {
  title: 'Title',
  message: 'Hello world!',
  hasIcon: true,
  isClosable: true,
  closeText: 'Close',
};
WithMessageWithTitleWithIconWithCloseText.storyName = 'With Message, Title, Icon, Close Text';

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

export const WithTitleWithCloseText = Template.bind({});
WithTitleWithCloseText.args = {
  title: 'Title',
  isClosable: true,
  closeText: 'Close',
};
WithTitleWithCloseText.storyName = 'With Title, Close Text';

export const WithTitleWithIconWithClosable = Template.bind({});
WithTitleWithIconWithClosable.args = {
  title: 'Title',
  hasIcon: true,
  isClosable: true,
};
WithTitleWithIconWithClosable.storyName = 'With Title, Icon, Closable';

export const WithTitleWithIconWithCloseText = Template.bind({});
WithTitleWithIconWithCloseText.args = {
  title: 'Title',
  hasIcon: true,
  isClosable: true,
  closeText: 'Close',
};
WithTitleWithIconWithCloseText.storyName = 'With Title, Icon, Close Text';
