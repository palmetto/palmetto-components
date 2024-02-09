import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    chromatic: { delay: 2000, pauseAnimationAtEnd: true },
  },
} as Meta;

export const WithCustomPortalTarget: Story = () => {
  const ref = React.useRef() as React.RefObject<HTMLDivElement>;
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div id="myContainer" ref={ref}>
      <Button
        variant="primary"
        tone="neutral"
        onClick={() => setShowModal(true)}
      >
        Show Modal
      </Button>
      <Modal
        ariaLabelledBy="customPortalModal"
        isOpen={showModal}
        onDismiss={() => setShowModal(false)}
        maxWidth="4xl"
        containerRef={ref}
      >
        <Modal.Header
          id="customPortalModal"
          title="Custom Portal"
          onDismiss={() => setShowModal(false)}
        />
        <Modal.Body style={{ lineHeight: 1.5 }}>
          This modal is rendered inside it&apos;s containing div, rather than
          the document.body
        </Modal.Body>
      </Modal>
    </div>
  );
};
