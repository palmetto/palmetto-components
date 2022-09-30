import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { FileUpload, FileUploadProps } from './FileUpload';
import { ICON_NAMES } from '../../lib/tokens';
import { BUTTON_SIZES } from '../Button/Button.constants';

export default {
  title: 'Components/FileUpload/Playground',
  component: FileUpload,
  argTypes: {
    accept: {
      control: 'text',
    },
    id: {
      control: 'text',
    },
    buttonText: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    fullWidth: {
      control: 'boolean',
    },
    helpText: {
      control: 'text',
    },
    hasIcon: {
      control: 'boolean',
    },
    iconName: {
      control: {
        type: 'select',
        options: [null, ...ICON_NAMES],
      },
    },
    isDisabled: {
      control: 'boolean',
    },
    isOutlined: {
      control: 'boolean',
    },
    isRequired: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    name: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    labelText: {
      control: 'text',
    },
    variant: {
      control: {
        type: 'radio',
        options: ['light', 'dark', 'primary', 'white'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: BUTTON_SIZES,
      },
    },
  },
} as Meta;

const Template: Story<FileUploadProps> = ({ ...args }) => (
  <FileUpload {...args} />
);

export const Playground = Template.bind({});
Playground.args = {
  id: 'playGroundFileUpload',
  buttonText: 'Playground FileUpload',
  labelText: 'Upload a file',
  helpText: 'Helpful text',
};
