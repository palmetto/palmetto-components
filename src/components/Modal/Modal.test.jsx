import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  test('renders its children', () => {
    const { getByText } = render(<Modal>test modal</Modal>);
    expect(getByText('test modal')).toBeInTheDocument();
  });
});
