import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal/For Chromatic',
  component: Modal,
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const BasicExample = () => (
  <div style={{ width: '500px', height: '500px' }}>
    <Modal isOpen onDismiss={() => null}>
      <Modal.Header title="The Modal Title" onDismiss={() => null} />
      <Modal.Body>Modal content</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary">Primary Action</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export const BodyAndFooter = () => (
  <Modal isOpen onDismiss={() => null}>
    <Modal.Header title="The Modal Title" onDismiss={() => null} />
    <Modal.Body>Modal body content</Modal.Body>
    <Modal.Footer>This is content in the modal footer</Modal.Footer>
  </Modal>
);

export const CloseButton = () => (
  <Modal isOpen onDismiss={() => null}>
    <Modal.Header onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
  </Modal>
);

export const WithoutHeader = () => (
  <Modal isOpen onDismiss={() => null}>
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => {}}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);

export const FuillscreenOnMobile = () => (
  <Modal fullScreenMobile isOpen onDismiss={() => null}>
    <Modal.Header title="Fullscreen Modal on Mobile" onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => {}}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);
