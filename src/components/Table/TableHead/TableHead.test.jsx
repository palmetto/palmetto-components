import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import TableHead from './TableHead';

const columnConfig = [
  { heading: 'ID', id: 'first' },
  { heading: 'Color', id: 'second' },
  { heading: 'Flavor', id: 'third' },
];

const oneColumnSortableColumnConfig = [
  { heading: 'ID', id: 'first', isSortable: true },
  { heading: 'Color', id: 'second' },
  { heading: 'Flavor', id: 'third' },
];

const twoColumnsSortableColumnConfig = [
  { heading: 'ID', id: 'first', isSortable: true },
  { heading: 'Color', id: 'second' },
  { heading: 'Flavor', id: 'third', isSortable: true },
];

describe('TableHead', () => {
  describe('Callback Handling', () => {
    describe('onSort', () => {
      test('onSort event fires callback function', () => {
        const mockHandleSort = jest.fn();

        render(
          <TableHead
            columns={twoColumnsSortableColumnConfig}
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
      test('it renders 3 column headers', () => {
        render(
          <TableHead columns={columnConfig} />,
        );

        const rows = screen.queryAllByRole('columnheader');

        expect(rows).toHaveLength(3);
      });

      test('it renders 3 headings', () => {
        render(
          <TableHead columns={columnConfig} />,
        );

        const idHeader = screen.getByText('ID');
        const colorHeader = screen.getByText('Color');
        const flavorHeader = screen.getByText('Flavor');

        expect(idHeader).toBeInTheDocument();
        expect(colorHeader).toBeInTheDocument();
        expect(flavorHeader).toBeInTheDocument();
      });

      test('no headers are sortable', () => {
        render(
          <TableHead columns={columnConfig} />,
        );

        const sortableHeaders = screen.queryAllByTestId('sort-testid');
        const headersSortedDesc = screen.queryAllByTestId('arrowDown-testid');
        const headersSortedAsc = screen.queryAllByTestId('arrowUp-testid');

        expect(sortableHeaders).toHaveLength(0);
        expect(headersSortedDesc).toHaveLength(0);
        expect(headersSortedAsc).toHaveLength(0);
      });
    });
  });

  describe('One Header Sortable', () => {
    test('it renders 3 column headers, one sortable', () => {
      render(
        <TableHead columns={oneColumnSortableColumnConfig} />,
      );

      const sortableHeader = screen.queryAllByTestId('sort-testid');

      expect(sortableHeader).toHaveLength(1);
    });
  });

  describe('Two Headers Sortable', () => {
    test('it renders 3 column headers, two sortable', () => {
      render(
        <TableHead columns={twoColumnsSortableColumnConfig} />,
      );

      const sortableHeader = screen.queryAllByTestId('sort-testid');

      expect(sortableHeader).toHaveLength(2);
    });
  });

  describe('One Column Sortable, and Sorted Desc', () => {
    test('it renders 3 column headers, one sortable and sorted desc', () => {
      render(
        <TableHead
          columns={oneColumnSortableColumnConfig}
          sortedColumn={{ id: 'first', sortOrder: 'desc' }}
        />,
      );

      const sortableHeader = screen.queryAllByTestId('arrowDown-testid');

      expect(sortableHeader).toHaveLength(1);
    });
  });

  describe('One Column Sortable, and Sorted Asc', () => {
    test('it renders 3 column headers, one sortable and sorted asc', () => {
      render(
        <TableHead
          columns={oneColumnSortableColumnConfig}
          sortedColumn={{ id: 'first', sortOrder: 'asc' }}
        />,
      );

      const sortableHeader = screen.queryAllByTestId('arrowUp-testid');

      expect(sortableHeader).toHaveLength(1);
    });
  });

  describe('Two Columns Sortable, One Column Sorted', () => {
    test('it renders 3 column headers, two sortable, and one sorted asc', () => {
      render(
        <TableHead
          columns={twoColumnsSortableColumnConfig}
          sortedColumn={{ id: 'first', sortOrder: 'asc' }}
        />,
      );

      const sortableHeaders = screen.queryAllByTestId('sort-testid');
      const sortableHeaderSortedAsc = screen.queryAllByTestId('arrowUp-testid');

      expect(sortableHeaders).toHaveLength(1);
      expect(sortableHeaderSortedAsc).toHaveLength(1);
    });
  });
});
