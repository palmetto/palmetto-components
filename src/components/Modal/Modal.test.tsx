import React from 'react';
import { render, fireEvent, queryHelpers } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  test('renders its children', () => {
    const { getByText } = render(
      <Modal isOpen onDismiss={() => {}} ariaLabel="testDefault">
        test modal
      </Modal>
    );
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('it open and closes based on isOpen prop', () => {
    const { queryByText, getByText, rerender } = render(
      <Modal isOpen={false} onDismiss={() => {}} ariaLabel="testIsOpen">test modal</Modal>
    );

    expect(queryByText('test modal')).toBe(null);

    rerender(
      <Modal isOpen onDismiss={() => {}} ariaLabel="testIsOpen">test modal</Modal>
    );
    
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('Subcomponents', () => {
    const { getByText } = render(
      <Modal isOpen onDismiss={() => {}} ariaLabel="testSubcomponents">
        <Modal.Header id="titleFooterBody" title="The Modal Title" onDismiss={close} />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>This is content in the modal footer</Modal.Footer>
      </Modal>
    );

    expect(getByText('The Modal Title')).toBeInTheDocument();
    expect(getByText('Modal body content')).toBeInTheDocument();
    expect(getByText('This is content in the modal footer')).toBeInTheDocument();
  });

  test('onDismiss', async () => {
    const mockOnDismiss = jest.fn();
    const { getByTestId } = render(
      <Modal isOpen onDismiss={mockOnDismiss} ariaLabel="testSubcomponents">
        <Modal.Header id="titleFooterBody" title="The Modal Title" onDismiss={mockOnDismiss} />
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer>This is content in the modal footer</Modal.Footer>
      </Modal>
    );
    
    const closeButton = getByTestId('icon-testid--remove').closest('button');
    expect(closeButton).toBeInTheDocument();

    if (closeButton) {
      await fireEvent.click(closeButton);
    }

    expect(mockOnDismiss).toHaveBeenCalledTimes(1);
  });
});
