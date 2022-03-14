import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MediaModal, MediaModalProps } from './MediaModal';

export default {
  title: 'Components/MediaModal/Playground',
  component: MediaModal,
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    footerContent: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<MediaModalProps> = ({ ...args }) => (
  <MediaModal {...args}>
    <img src="/images/landscape-mediamodal.jpg" alt="landscape test" />
  </MediaModal>
);

export const Playground = Template.bind({});
Playground.args = {
  isOpen: false,
  title: 'title',
  description: 'description',
  footerContent: 'footer',
};
