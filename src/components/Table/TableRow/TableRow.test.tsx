import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from './TableRow';

const row = { id: 1, flavor: 'vanilla' };
const rowIndex = 1;
const columns = [
  { title: 'ID', dataKey: 'id' },
  { title: 'Flavor', dataKey: 'flavor' },
];

describe('TableRow', () => {
  describe('States', () => {
    test('It renders with a custom class is passed as prop', () => {
      render(
        <TableRow
          row={row}
          rowIndex={rowIndex}
          columns={columns}
          className="my-custom-class"
        />,
      );

      const tableRow = screen.getByRole('row');
      expect(tableRow).toHaveClass('my-custom-class');
    });
  });
});
