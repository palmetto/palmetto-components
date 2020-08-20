import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import Button from '../Button/Button';
import Table from './Table';
import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';
import TableRow from './TableBody/TableRow/TableRow';

const columnConfig = [
  { heading: 'ID', id: 'first' },
  { heading: 'Color', id: 'second' },
  { heading: 'Flavor', id: 'third' },
];

const columnConfigSortable = [
  { heading: 'ID', id: 'first', isSortable: true },
  { heading: 'Color', id: 'second' },
  { heading: 'Flavor', id: 'third', isSortable: true },
];

const tableData = [
  { id: 1, color: 'red', flavor: 'vanilla' },
  { id: 2, color: 'blue', flavor: 'chocolate' },
  { id: 3, color: 'green', flavor: 'strawberry' },
];

const mockHandleSort = jest.fn();

describe('Table', () => {
  describe('Callback Handling', () => {
    describe('onSort', () => {
      test('onSort event fires callback function', () => {
        render(
          <Table>
            <TableHead columns={columnConfigSortable} onSort={mockHandleSort} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const sortableColumnHeader = screen.getByText('ID');

        fireEvent.click(sortableColumnHeader);
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders a table', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const table = screen.getByRole('table');

        expect(table).toBeInTheDocument();
      });

      test('it renders a thead and tbody', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const rows = screen.queryAllByRole('rowgroup');

        expect(rows).toHaveLength(2);
      });

      test('it renders 3 column headers', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const rows = screen.queryAllByRole('columnheader');

        expect(rows).toHaveLength(3);
      });

      test('it renders 3 headings', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const idHeader = screen.getByText('ID');
        const colorHeader = screen.getByText('Color');
        const flavorHeader = screen.getByText('Flavor');

        expect(idHeader).toBeInTheDocument();
        expect(colorHeader).toBeInTheDocument();
        expect(flavorHeader).toBeInTheDocument();
      });

      test('it renders 4 rows', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const rows = screen.queryAllByRole('row');

        expect(rows).toHaveLength(4);
      });

      test('it renders 9 cells', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const rows = screen.queryAllByRole('cell');

        expect(rows).toHaveLength(9);
      });

      test('it renders the cell content', () => {
        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const cell = screen.getByText('green');

        expect(cell).toBeInTheDocument();
      });
    });

    describe('Loading', () => {
      test('it renders a loading indicator', () => {
        render(
          <Table isLoading>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const spinner = screen.getByTestId('spinner-testid');

        expect(spinner).toBeInTheDocument();
      });
    });

    describe('Sortable', () => {
      test('it renders 2 sortable table headers', () => {
        render(
          <Table>
            <TableHead columns={columnConfigSortable} />
            <TableBody>
              {tableData.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const sortableHeaders = screen.getAllByTestId('sort-testid');

        expect(sortableHeaders).toHaveLength(2);
      });
    });

    describe('Custom Actions', () => {
      test('if action is triggered, function is called', () => {
        const mockHandleClick = jest.fn();
        const tableDataWithClickableButton = [
          { id: 1, color: null, flavor: <Button onClick={mockHandleClick}>Click me</Button> }, // eslint-disable-line
          { id: 2, color: 'blue', flavor: 'chocolate' },
          { id: 3, color: 'green', flavor: 'strawberry' },
        ];

        render(
          <Table>
            <TableHead columns={columnConfigSortable} />
            <TableBody>
              {tableDataWithClickableButton.map(row => <TableRow data={row} key={row.id} />)}
            </TableBody>
          </Table>,
        );

        const button = screen.getByText('Click me');

        fireEvent.click(button);
        expect(mockHandleClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('Empty Cell Placeholder', () => {
      test('it renders the placeholder in the empty cell', () => {
        const tableDataWithMissingCellContent = [
          { id: 1, color: null, flavor: 'vanilla' },
          { id: 2, color: 'blue', flavor: 'chocolate' },
          { id: 3, color: 'green', flavor: 'strawberry' },
        ];

        render(
          <Table>
            <TableHead columns={columnConfig} />
            <TableBody>
              {tableDataWithMissingCellContent.map(row => (
                <TableRow data={row} key={row.id} emptyCellPlaceholder="--" />
              ))}
            </TableBody>
          </Table>,
        );

        const placeholder = screen.getByText('--');

        expect(placeholder).toBeInTheDocument();
      });
    });
  });
});
