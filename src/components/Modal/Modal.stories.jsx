import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal/ForChromatic',
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
        <Button variant="light" onClick={() => null}>
          Cancel
        </Button>
        <Button variant="primary">Primary Action</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export const BodyAndFooter = () => (
  <div style={{ width: '500px', height: '500px' }}>
    <Modal isOpen onDismiss={() => null}>
      <Modal.Header title="The Modal Title" onDismiss={() => null} />
      <Modal.Body>Modal body content</Modal.Body>
      <Modal.Footer>This is content in the modal footer</Modal.Footer>
    </Modal>
  </div>
);

export const CloseButton = () => (
  <div style={{ width: '500px', height: '500px' }}>
    <Modal isOpen onDismiss={() => null}>
      <Modal.Header onDismiss={() => null} />
      <Modal.Body>Modal content</Modal.Body>
    </Modal>
  </div>
);

export const WithoutHeader = () => (
  <div style={{ width: '500px', height: '500px' }}>
    <Modal isOpen onDismiss={() => null}>
      <Modal.Body>Modal content</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => null}>
          Cancel
        </Button>
        <Button variant="primary">Primary Action</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export const FuillscreenOnMobile = () => (
  <div style={{ width: '500px', height: '500px' }}>
    <Modal fullScreenMobile isOpen onDismiss={() => null}>
      <Modal.Header title="Fullscreen Modal on Mobile" onDismiss={() => null} />
      <Modal.Body>Modal content</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => null}>
          Cancel
        </Button>
        <Button variant="primary">Primary Action</Button>
      </Modal.Footer>
    </Modal>
  </div>
);
