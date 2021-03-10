import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { ModalHeader } from './ModalHeader';

describe('ModalHeader', () => {
  test('renders a title if provided', () => {
    const { getByText } = render(<ModalHeader title="modal title" />);
    expect(getByText('modal title')).toBeInTheDocument();
  });

  test('renders close button if onDismiss is set', () => {
    render(<ModalHeader onDismiss={() => null} />);
    expect(screen.getByLabelText('close')).toBeDefined();
  });

  test('clicking the close button fires onDismiss', () => {
    const mockOnDismiss = jest.fn();
    render(<ModalHeader onDismiss={mockOnDismiss} />);
    fireEvent.click(screen.getByLabelText('close'));
    expect(mockOnDismiss).toBeCalledTimes(1);
  });

  test('lg padding class is applied by default', () => {
    const { container } = render(<ModalHeader>test modal</ModalHeader>);
    expect(container.children[0].classList).toContain('p-lg');
  });

  test('height is set to lg by default', () => {
    const { container } = render(<ModalHeader>test modal</ModalHeader>);
    expect(container.children[0].classList).toContain('h-lg');
  });

  test('bottom border is added  by default', () => {
    const { container } = render(<ModalHeader>test modal</ModalHeader>);
    expect(container.children[0].classList).toContain('border-color-grey-lighter');
    expect(container.children[0].classList).toContain('border-width-bottom-xs');
  });
});
