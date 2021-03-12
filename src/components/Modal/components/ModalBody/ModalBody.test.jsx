import React from 'react';
import { render } from '@testing-library/react';
import { ModalBody } from './ModalBody';

describe('ModalBody', () => {
  test('renders its children', () => {
    const { getByText } = render(<ModalBody>test modal</ModalBody>);
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('lg padding class is applied by default', () => {
    const { container } = render(<ModalBody>test modal</ModalBody>);
    expect(container.children[0].classList).toContain('p-lg');
  });

  test('flex-auto class is applied by default', () => {
    const { container } = render(<ModalBody>test modal</ModalBody>);
    expect(container.children[0].classList).toContain('flex-auto');
  });
});
