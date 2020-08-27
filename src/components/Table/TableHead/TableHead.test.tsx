import React from 'react';
import { render, screen } from '@testing-library/react';
import TableHead from './TableHead';

describe('TableHead', () => {
  describe('States', () => {
    test('it renders an empty thead element if no children are passed', () => {
      render(<TableHead />);

      const tableHead = screen.getByRole('rowgroup');
      expect(tableHead).toBeInTheDocument();
    });
  });
});
