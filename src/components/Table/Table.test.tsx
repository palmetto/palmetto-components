import React from 'react';
import {
  render,
  fireEvent,
  screen,
  within,
} from '@testing-library/react';
import { Cell } from './TableTypes';
import Button from '../Button/Button';
import Table from './Table';

const columnConfig = [
  { title: 'ID', dataKey: 'id' },
  { title: 'Color', dataKey: 'color' },
  { title: 'Flavor', dataKey: 'flavor' },
];

const columnConfigSortable = [
  { title: 'ID', dataKey: 'id', isSortable: true },
  { title: 'Color', dataKey: 'color' },
  { title: 'Flavor', dataKey: 'flavor', isSortable: true },
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
          <Table
            columns={columnConfigSortable}
            rows={tableData}
            rowKey="id"
            onSort={mockHandleSort}
          />,
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
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);

        const table = screen.getByRole('table');

        expect(table).toBeInTheDocument();
      });

      test('it renders a thead and tbody', () => {
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);

        const rows = screen.queryAllByRole('rowgroup');

        expect(rows).toHaveLength(2);
      });

      test(`it renders the correct amount of headers: ${columnConfig.length}`, () => {
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);

        const rows = screen.queryAllByRole('columnheader');

        expect(rows).toHaveLength(3);
      });

      test(`it renders 3 headings that match columns titles: ${[...columnConfig.map(c => `${c.title}, `)]}`, () => {
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);

        const idHeader = screen.getByText('ID');
        const colorHeader = screen.getByText('Color');
        const flavorHeader = screen.getByText('Flavor');

        expect(idHeader).toBeInTheDocument();
        expect(colorHeader).toBeInTheDocument();
        expect(flavorHeader).toBeInTheDocument();
      });

      test(`it renders correct amount of rows based on data: ${tableData.length} + 1 (header row)`, () => {
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);

        const rows = screen.queryAllByRole('row');

        expect(rows).toHaveLength(4);
      });

      test(
        `it renders correct amount of cells based on columns and rows: ${columnConfig.length + tableData.length}`,
        () => {
          render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);

          const rows = screen.queryAllByRole('cell');

          expect(rows).toHaveLength(9);
        },
      );

      test('it renders the cell content', () => {
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" />);
        const tableRowArrays = tableData.map(row => Object.values(row).map(v => v.toString()));
        const cellData = tableRowArrays.reduce((target, current) => [...current, ...target], []);

        cellData.map(value => expect(screen.getByText(value)).toBeInTheDocument());
      });
    });

    describe('Loading', () => {
      test('it renders a loading indicator', () => {
        render(<Table columns={columnConfig} rows={tableData} rowKey="id" isLoading />);

        const spinner = screen.getByTestId('spinner-testid');

        expect(spinner).toBeInTheDocument();
      });
    });

    describe('Sortable', () => {
      test('it renders 2 sortable table headers', () => {
        render(<Table columns={columnConfigSortable} rows={tableData} rowKey="id" />);

        const sortableHeaders = screen.getAllByTestId('tableHeaderCellSortNone-testid');

        expect(sortableHeaders).toHaveLength(2);
      });

      test('it passes the sorted column properly to the correct th element', () => {
        render(<Table
          columns={columnConfigSortable}
          rows={tableData}
          rowKey="id"
          sortedColumn={{ dataKey: 'flavor', sortDirection: 'ascending' }}
        />);

        const { getByTestId } = within(screen.getByText('Flavor'));

        expect(getByTestId('tableHeaderCellSortAsc-testid')).toBeInTheDocument();
      });
    });

    describe('Scrollable', () => {
      test('It renders the table container limited by width/height attributes', () => {
        render(<Table
          columns={columnConfig}
          rows={tableData}
          rowKey="id"
          scroll={{ x: 100, y: 200 }}
        />);

        const tableContainer = screen.getByTestId('tableContainerDiv-testid');

        expect(tableContainer).toHaveStyle({ maxWidth: '100px', maxHeight: '200px' });
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

        render(<Table columns={columnConfig} rows={tableDataWithClickableButton} rowKey="id" />);

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
          <Table
            columns={columnConfig}
            rows={tableDataWithMissingCellContent}
            emptyCellPlaceholder="--"
            rowKey="id"
          />,
        );

        const placeholder = screen.getByText('--');

        expect(placeholder).toBeInTheDocument();
      });
    });

    describe('Custom width in column config', () => {
      test('it renders columns with fixed width based on prop.', () => {
        render(
          <Table
            columns={[...columnConfig.map(col => ({ ...col, width: 100 }))]}
            rows={tableData}
            rowKey="id"
            useFixedWidthColumns
          />,
        );

        const tableHeaderCell = screen.getByText('Flavor');
        expect(tableHeaderCell).toHaveStyle({ width: '100px', maxWidth: '100px' });
      });
    });

    describe('Column with no corresponding data key', () => {
      test('it renders a column despite not matching a data key in the rows collection', () => {
        const columnConfigNoKey = [
          { title: 'ID', dataKey: 'id', isSortable: true },
          { title: 'Color', dataKey: 'color' },
          { title: 'Flavor', isSortable: true },
        ];

        render(
          <Table
            columns={columnConfigNoKey}
            rows={tableData}
            rowKey="id"
          />,
        );

        const tableHeaderCell = screen.getByText('Flavor');
        expect(tableHeaderCell).toBeInTheDocument();
      });
    });

    describe('Column with render method', () => {
      test('it renders a column with a custom render method', () => {
        const columnConfigRender = [
          { title: 'ID', dataKey: 'id', isSortable: true },
          { title: 'Color', dataKey: 'color' },
          { title: 'Flavor', isSortable: true, render: () => <button type="submit">Submit</button> },
        ];

        render(
          <Table
            columns={columnConfigRender}
            rows={tableData}
            rowKey="id"
          />,
        );

        const submitButtons = screen.getAllByText('Submit');
        expect(submitButtons).toHaveLength(tableData.length);
      });
    });

    describe('Column with render method based on row', () => {
      test('it renders a column with a custom render method', () => {
        const columnConfigRender = [
          { title: 'ID', dataKey: 'id', isSortable: true },
          { title: 'Color', dataKey: 'color' },
          { title: 'Flavor', dataKey: 'flavor', render: (cell?: Cell) => <button type="submit">{cell}</button> },
        ];

        render(
          <Table
            columns={columnConfigRender}
            rows={tableData}
            rowKey="id"
          />,
        );

        const submitButton = screen.getByText('vanilla');
        expect(submitButton).toBeInTheDocument();
      });
    });
  });
});
