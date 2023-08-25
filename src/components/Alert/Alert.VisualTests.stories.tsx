import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Alert, AlertProps } from './Alert';
import { ALERT_VARIANTS } from './Alert.constants';
import { Box } from '../Box/Box';
import { Heading } from '../Heading/Heading';

export default {
  title: 'Components/Alert/Visual Regression Tests',
  component: Alert,
} as Meta;

const Template: Story<AlertProps> = args => (
  <Box>
    {ALERT_VARIANTS.map(variant => (
      <Alert
        {...args}
        className="m-bottom-md"
        variant={variant}
        key={variant}
      />
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

export const AllProps = Template.bind({});
AllProps.args = {
  title: 'Title Text',
  message: 'Message text',
  hasIcon: true,
  isClosable: true,
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'Title Text Only',
};

export const MessageOnly = Template.bind({});
MessageOnly.args = {
  message: 'Message text only',
};
