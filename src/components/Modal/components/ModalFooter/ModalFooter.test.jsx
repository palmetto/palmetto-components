import React from 'react';
import { render } from '@testing-library/react';
import ModalFooter from './ModalFooter';

describe('ModalFooter', () => {
  test('renders its children', () => {
    const { getByText } = render(<ModalFooter>test modal</ModalFooter>);
    expect(getByText('test modal')).toBeInTheDocument();
  });

  test('lg padding class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.children[0].classList).toContain('p-lg');
  });

  test('row direction class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.children[0].classList).toContain('flex-direction-row');
  });

  test('align-items center class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.children[0].classList).toContain('align-items-center');
  });

  test('justify content flex-end class is applied by default', () => {
    const { container } = render(<ModalFooter>test modal</ModalFooter>);
    expect(container.children[0].classList).toContain('justify-content-flex-end');
  });
});
