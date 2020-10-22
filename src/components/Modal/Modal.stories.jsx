import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal/For Chromatic',
  component: Modal,
  parameters: {
    chromatic: { delay: 300 },
  },
};

export const BasicExample = () => {
  const [showModal, setShowModal] = React.useState(true);
  const close = () => setShowModal(false);
  return (
    <Modal isOpen={showModal} onDismiss={close}>
      <Modal.Header title="The Modal Title" onDismiss={close} />
      <Modal.Body>Modal content</Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={close}>
          Cancel
        </Button>
        <Button variant="primary">Primary Action</Button>
      </Modal.Footer>
    </Modal>
  );
};

export const BodyAndFooter = () => {
  const [showModal, setShowModal] = React.useState(true);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <div>
      <Button variant="light" onClick={open}>
        Show Modal
      </Button>
      <Modal isOpen={showModal} onDismiss={close}>
        <Modal.Header title="The Modal Title" onDismiss={close} />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>This is content in the modal footer</Modal.Footer>
      </Modal>
    </div>
  );
};

export const CloseButton = () => {
  const [showModal, setShowModal] = React.useState(true);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <div>
      <Button variant="light" onClick={open}>
        Show Modal
      </Button>
      <Modal isOpen={showModal} onDismiss={close}>
        <Modal.Header onDismiss={close} />
        <Modal.Body>Modal content</Modal.Body>
      </Modal>
    </div>
  );
};

export const WithoutHeader = () => {
  const [showModal, setShowModal] = React.useState(true);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <div>
      <Button variant="light" onClick={open}>
        Show Modal
      </Button>
      <Modal isOpen={showModal} onDismiss={close}>
        <Modal.Body>Modal content</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary">Primary Action</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const FuillscreenOnMobile = () => {
  const [showModal, setShowModal] = React.useState(true);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <div>
      <Button variant="light" onClick={open}>
        Show Modal
      </Button>
      <Modal fullScreenMobile isOpen={showModal} onDismiss={close}>
        <Modal.Header title="Fullscreen Modal on Mobile" onDismiss={close} />
        <Modal.Body>Modal content</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={close}>
            Cancel
          </Button>
          <Button variant="primary">Primary Action</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
