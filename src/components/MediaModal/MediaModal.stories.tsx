import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MediaModal } from './MediaModal';
import { Button } from '../Button/Button';
import { useOpenClose } from '../../hooks/useOpenClose/useOpenClose';

export default {
  title: 'Components/MediaModal',
  component: MediaModal,
  parameters: {
    chromatic: { delay: 2000, pauseAnimationAtEnd: true },
  },
} as Meta;

export const WithCustomPortalTarget: Story = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;
  const {
    isOpen: isMediaModalOpen,
    handleOpen: openMediaModal,
    handleClose: closeMediaModal,
  } = useOpenClose();

  return (
    <div id="myContainer" ref={ref}>
      <Button variant="light" onClick={openMediaModal}>
        Show Modal
      </Button>
      <MediaModal
        ariaLabel="leaves"
        isOpen={isMediaModalOpen}
        onDismiss={closeMediaModal}
        containerRef={ref}
      >
        <img src="images/landscape-mediamodal.jpg" alt="" />
      </MediaModal>
    </div>
  );
};
