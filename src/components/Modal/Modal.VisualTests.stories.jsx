import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Modal/Visual Regression Tests',
  component: Modal,
  parameters: {
    chromatic: { delay: 1000, pauseAnimationAtEnd: true, viewports: [350, 700, 1012, 1300] },
  },
  decorators: [
    storyFn => (
      <div
        style={{
          width: '1200px',
          height: '800px',
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};

export const BasicExample = () => (
  <Modal ariaLabelledBy="title" isOpen onDismiss={() => null}>
    <Modal.Header id="title" title="The Modal Title" onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => null}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);

export const BodyAndFooter = () => (
  <Modal ariaLabelledBy="title" isOpen onDismiss={() => null}>
    <Modal.Header title="The Modal Title" onDismiss={() => null} />
    <Modal.Body>Modal body content</Modal.Body>
    <Modal.Footer>This is content in the modal footer</Modal.Footer>
  </Modal>
);

export const CloseButton = () => (
  <Modal ariaLabel="close button modal" isOpen onDismiss={() => null}>
    <Modal.Header onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
  </Modal>
);

export const WithoutHeader = () => (
  <Modal ariaLabel="modal without header" isOpen onDismiss={() => null}>
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => null}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);

export const FullScreenOnMobile = () => (
  <Modal ariaLabelledBy="title" fullScreenMobile isOpen onDismiss={() => null}>
    <Modal.Header id="title" title="Fullscreen Modal on Mobile" onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => null}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);

export const WithMaxWidth = () => (
  <Modal ariaLabelledBy="title" maxWidth="300px" isOpen onDismiss={() => null}>
    <Modal.Header id="title" title="Fullscreen Modal on Mobile" onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => null}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);

export const WithResponsiveMaxWidth = () => (
  <Modal
    ariaLabelledBy="title"
    maxWidth={{ tablet: '3xl', desktop: '4xl', hd: '5xl' }}
    isOpen
    onDismiss={() => null}
  >
    <Modal.Header id="title" title="Fullscreen Modal on Mobile" onDismiss={() => null} />
    <Modal.Body>Modal content</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={() => null}>
        Cancel
      </Button>
      <Button variant="primary">Primary Action</Button>
    </Modal.Footer>
  </Modal>
);
