import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableRow } from './TableRow';

const row = { id: 1, flavor: 'vanilla' };
const rowIndex = 1;
const columns = [
  { heading: 'ID', dataKey: 'id' },
  { heading: 'Flavor', dataKey: 'flavor' },
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

    test('It renders with a custom cell class (function) is passed as prop', () => {
      const func = jest.fn().mockReturnValue('my-custom-class');
      const customClassCell = [
        { heading: 'ID', dataKey: 'id', cellClassName: func },
      ];
      render(
        <TableRow
          row={row}
          rowIndex={rowIndex}
          columns={customClassCell}
        />,
      );
      expect(func).toHaveBeenCalledWith(customClassCell[0], row, rowIndex);
      const element = document.getElementsByClassName('my-custom-class')[0];
      expect(element).toBeInTheDocument();
    });

    test('It renders with a custom cell class (string) is passed as prop', () => {
      const customClassCell = [
        { heading: 'ID', dataKey: 'id', cellClassName: 'string-class' },
      ];
      render(
        <TableRow
          row={row}
          rowIndex={rowIndex}
          columns={customClassCell}
        />,
      );
      const element = document.getElementsByClassName('string-class')[0];
      expect(element).toBeInTheDocument();
    });
  });
});
