import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MediaModal, MediaModalProps } from './MediaModal';
import { Button } from '../Button/Button';

export default {
  title: 'Components/MediaModal/Playground',
  component: MediaModal,
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    footerContent: {
      control: 'text',
    },
    closeButton: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: Story<MediaModalProps> = ({ ...args }) => {
  const [showModal, setShowModal] = React.useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <>
      <Button variant="light" onClick={open}>
        Show MediaModal
      </Button>
      <MediaModal {...args} isOpen={showModal} onDismiss={close}>
        <img src="/images/landscape-mediamodal.jpg" alt="landscape test" />
      </MediaModal>
    </>
  );
};

export const Playground = Template.bind({});
Playground.args = {
  title: 'title',
  description: 'description',
  footerContent: 'footer',
};
