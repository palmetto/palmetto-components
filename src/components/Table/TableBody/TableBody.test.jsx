import React from 'react';
import { render, screen } from '@testing-library/react';
import TableBody from './TableBody';
import TableRow from './TableRow/TableRow';

describe('TableBody', () => {
  describe('States', () => {
    describe('Default', () => {
      const row = { id: 1, color: 'red', flavor: 'vanilla' };

      test('it renders the tbody tag', () => {
        render(
          <TableBody>
            <TableRow data={row} key={row.id} id={row.id} />
          </TableBody>,
        );

        const tbody = screen.getByRole('rowgroup');

        expect(tbody).toBeInTheDocument();
      });

      test('it renders its children', () => {
        render(
          <TableBody>
            <TableRow data={row} key={row.id} id={row.id} />
          </TableBody>,
        );

        const tableRow = screen.getByRole('row');

        expect(tableRow).toBeInTheDocument();
      });

      test('it renders an empty table body if no children passed', () => {
        render(
          <TableBody />,
        );

        const tableBody = screen.getByRole('rowgroup');

        expect(tableBody).toBeInTheDocument();
      });
    });
  });
});
