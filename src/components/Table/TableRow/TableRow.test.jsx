import React from 'react';
import { render, screen } from '@testing-library/react';
import TableRow from './TableRow';

describe('TableRow', () => {
  describe('States', () => {
    describe('Default', () => {
      const rowData = { id: 1, color: 'red', flavor: 'vanilla' };

      test('it renders a row', () => {
        render(
          <TableRow data={rowData} />,
        );

        const row = screen.getByRole('row');

        expect(row).toBeInTheDocument();
      });

      test('it renders 3 cells', () => {
        render(
          <TableRow data={rowData} />,
        );

        const rows = screen.queryAllByRole('cell');

        expect(rows).toHaveLength(3);
      });

      test('it renders the cell\'s contents', () => {
        render(
          <TableRow data={rowData} />,
        );

        const idCell = screen.getByText('1');
        const colorCell = screen.getByText('red');
        const flavorCell = screen.getByText('vanilla');

        expect(idCell).toBeInTheDocument();
        expect(colorCell).toBeInTheDocument();
        expect(flavorCell).toBeInTheDocument();
      });
    });

    describe('Empty Cell Placeholder', () => {
      test('it renders a placeholder if the cell is empty', () => {
        const rowData = { id: 1, color: null, flavor: 'vanilla' };
        render(
          <TableRow
            data={rowData}
            emptyCellPlaceholder="--"
          />,
        );

        const placeholder = screen.getByText('--');

        expect(placeholder).toBeInTheDocument();
      });
    });
  });
});
