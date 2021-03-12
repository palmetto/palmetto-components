import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableHead } from './TableHead';

const columns = [
  { heading: 'ID', dataKey: 'id' },
  { heading: 'Color', dataKey: 'color' },
  { heading: 'Flavor', dataKey: 'flavor' },
];

describe('TableHead', () => {
  describe('States', () => {
    test('it renders an empty thead element if no children are passed', () => {
      render(
        <TableHead
          columns={columns}
        />,
      );

      const tableHead = screen.getByRole('rowgroup');
      expect(tableHead).toBeInTheDocument();
    });
  });
});
