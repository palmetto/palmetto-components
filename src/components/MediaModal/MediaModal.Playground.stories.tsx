import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MediaModal, MediaModalProps } from './MediaModal';
import { Button } from '../Button/Button';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';

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
  const {
    isOpen: isMediaModalOpen,
    handleOpen: openMediaModal,
    handleClose: closeMediaModal,
  } = useOpenClose();
  return (
    <>
      <Button variant="primary" tone="neutral" onClick={openMediaModal}>
        Show MediaModal
      </Button>
      <MediaModal
        {...args}
        isOpen={isMediaModalOpen}
        onDismiss={closeMediaModal}
      >
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
