import React from 'react';
import { render, screen } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  describe('Default', () => {
    test('It renders a button', () => {
      render(<Drawer isSelected={false}>default button</Drawer>);

      const buttonElement = screen.getByText('default button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveAttribute('role', 'checkbox');
    });
  });
});
