import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import TableHeaderCell from './TableHeaderCell';

describe('TableBody', () => {
  describe('States', () => {
    test('It renders an empty th when no children passed', () => {
      render(<TableHeaderCell />);

      const tableHeaderCell = screen.getByRole('columnheader');
      expect(tableHeaderCell).toBeInTheDocument();
    });

    test('It renders the header with sort icon and default sortDirection if \'isSortable\' is passed', () => {
      render(<TableHeaderCell isSortable />);
      const tableHeaderCell = screen.getByRole('columnheader');
      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'none');
      expect(screen.getByTestId('tableHeaderCellSortNone-testid')).toBeInTheDocument();
    });

    test('It renders the header with sort icon and proper sortDirection', () => {
      const { rerender } = render(<TableHeaderCell isSortable sortDirection="none" />);
      const tableHeaderCell = screen.getByRole('columnheader');
      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'none');
      expect(screen.getByTestId('tableHeaderCellSortNone-testid')).toBeInTheDocument();

      rerender(<TableHeaderCell isSortable sortDirection="ascending" />);
      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'ascending');
      expect(screen.getByTestId('tableHeaderCellSortAsc-testid')).toBeInTheDocument();

      rerender(<TableHeaderCell isSortable sortDirection="descending" />);
      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'descending');
      expect(screen.getByTestId('tableHeaderCellSortDesc-testid')).toBeInTheDocument();
    });
  });

  describe('Callback Handling', () => {
    describe('onSort', () => {
      test('onSort event fires callback function on click', () => {
        const mockHandleSort = jest.fn();
        render(
          <TableHeaderCell
            onSort={mockHandleSort}
            isSortable
          >
            ID
          </TableHeaderCell>,
        );

        const sortableColumnHeader = screen.getByText('ID');

        fireEvent.click(sortableColumnHeader);
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });

      test('onSort event fires callback function on Enter keydown', () => {
        const mockHandleSort = jest.fn();
        render(
          <TableHeaderCell
            isSortable
            onSort={mockHandleSort}
          >
            ID
          </TableHeaderCell>,
        );

        const sortableColumnHeader = screen.getByText('ID');

        fireEvent.keyDown(sortableColumnHeader, { keyCode: 13 });
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });

  //     test('onSort event fires callback function on Space keydown', () => {
  //       const mockHandleSort = jest.fn();
  //       render(
  //         <TableHeaderSortable
  //           heading="ID"
  //           id="first"
  //           onSort={mockHandleSort}
  //         />,
  //       );

  //       const sortableColumnHeader = screen.getByText('ID');

  //       fireEvent.keyDown(sortableColumnHeader, { keyCode: 32 });
  //       expect(mockHandleSort).toHaveBeenCalledTimes(1);
  //     });
  //   });

  //   test('onSort does not fire callback function on keypresses that aren\'t Enter or space', () => {
  //     const mockHandleSort = jest.fn();
  //     render(
  //       <TableHeaderSortable
  //         heading="ID"
  //         id="first"
  //         onSort={mockHandleSort}
  //       />,
  //     );

  //     const sortableColumnHeader = screen.getByText('ID');

  //     fireEvent.keyDown(sortableColumnHeader, { keyCode: 1 });
  //     expect(mockHandleSort).toHaveBeenCalledTimes(0);
  //   });
  // });

  // describe('States', () => {
  //   describe('Default', () => {
  //     test('it renders a sort icon', () => {
  //       const mockHandleSort = jest.fn();
  //       render(
  //         <TableHeaderSortable
  //           heading="ID"
  //           id="first"
  //           onSort={mockHandleSort}
  //         />,
  //       );

  //       const sortIcon = screen.getByTestId('sort-testid');

  //       expect(sortIcon).toBeInTheDocument();
  //     });
  //   });

  //   describe('Sorted Descending', () => {
  //     test('it renders a descending sort icon', () => {
  //       const mockHandleSort = jest.fn();
  //       render(
  //         <TableHeaderSortable
  //           heading="ID"
  //           id="first"
  //           onSort={mockHandleSort}
  //           sortedColumn={{ id: 'first', sortOrder: 'desc' }}
  //         />,
  //       );

  //       const sortIcon = screen.getByTestId('arrowDown-testid');

  //       expect(sortIcon).toBeInTheDocument();
  //     });
  //   });

  //   describe('Sorted Ascending', () => {
  //     test('it renders a ascending sort icon', () => {
  //       const mockHandleSort = jest.fn();
  //       render(
  //         <TableHeaderSortable
  //           heading="ID"
  //           id="first"
  //           onSort={mockHandleSort}
  //           sortedColumn={{ id: 'first', sortOrder: 'asc' }}
  //         />,
  //       );

  //       const sortIcon = screen.getByTestId('arrowUp-testid');

  //       expect(sortIcon).toBeInTheDocument();
  //     });
    });
  });
});
