import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MediaModal } from './MediaModal';
import { Button } from '../Button/Button';

export default {
  title: 'Components/MediaModal',
  component: MediaModal,
  parameters: {
    chromatic: { delay: 2000, pauseAnimationAtEnd: true },
  },
} as Meta;

export const WithCustomPortalTarget: Story = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div id="myContainer" ref={ref}>
      <Button variant="light" onClick={() => setShowModal(true)}>
        Show Modal
      </Button>
      <MediaModal
        ariaLabel="leaves"
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        containerRef={ref}
      >
        <img src="images/wes-hicks-6rNitHsIU3c-unsplash.jpg" alt="" />
      </MediaModal>
    </div>
  );
};
