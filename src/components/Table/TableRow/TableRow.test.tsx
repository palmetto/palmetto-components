import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from './TableRow';

describe('TableRow', () => {
  describe('States', () => {
    test('It renders an empty tr when no children passed', () => {
      render(<TableRow />);

      const tableRow = screen.getByRole('row');
      expect(tableRow).toBeInTheDocument();
    });

    test('It renders with a custom class is passed as prop', () => {
      render(<TableRow className="my-custom-class" />);

      const tableRow = screen.getByRole('row');
      expect(tableRow).toHaveClass('my-custom-class');
    });
  });
});
