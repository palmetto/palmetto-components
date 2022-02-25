import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { RESPONSIVE_STORY } from '../../docs/constants';
import { FileUpload, FileUploadProps } from './FileUpload';

export default {
  title: 'Components/FileUpload/Visual Regression Tests',
  component: FileUpload,
} as Meta;

const Template: Story<FileUploadProps> = ({ ...args }) => (
  <FileUpload {...args}>category filter</FileUpload> // eslint-disable-line @typescript-eslint/no-empty-function
);

export const ResponsiveHelpText = Template.bind({});
ResponsiveHelpText.args = {
  helpText: 'image files only (jpg, png, gif)',
  accept: 'image/*',
};
ResponsiveHelpText.parameters = RESPONSIVE_STORY;
