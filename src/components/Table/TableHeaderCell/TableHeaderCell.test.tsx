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

        const tableHeaderCell = screen.getByText('ID');

        fireEvent.click(tableHeaderCell);
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

        const tableHeaderCell = screen.getByText('ID');

        fireEvent.keyDown(tableHeaderCell, { keyCode: 13 });
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });

      test('onSort event fires callback function on Space keydown', () => {
        const mockHandleSort = jest.fn();
        render(
          <TableHeaderCell
            isSortable
            onSort={mockHandleSort}
          >
            ID
          </TableHeaderCell>,
        );

        const tableHeaderCell = screen.getByText('ID');

        fireEvent.keyDown(tableHeaderCell, { keyCode: 32 });
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });

      test('onSort does NOT fire callback function on keydown that is not ENTER or SPACE', () => {
        const mockHandleSort = jest.fn();
        render(
          <TableHeaderCell
            isSortable
            onSort={mockHandleSort}
          >
            ID
          </TableHeaderCell>,
        );

        const tableHeaderCell = screen.getByText('ID');

        fireEvent.keyDown(tableHeaderCell, { keyCode: 77 });
        expect(mockHandleSort).toHaveBeenCalledTimes(0);
      });

      test('onSort does NOT fire callback when keyed unless both onSort and isSortable props are provided', () => {
        const mockHandleSort = jest.fn();
        render(
          <TableHeaderCell
            onSort={mockHandleSort}
          >
            ID
          </TableHeaderCell>,
        );

        const tableHeaderCell = screen.getByText('ID');

        fireEvent.keyDown(tableHeaderCell, { keyCode: 32 });
        expect(mockHandleSort).toHaveBeenCalledTimes(0);
      });
    });

    test('onSort does NOT fire callback when clicked unless both onSort and isSortable props are provided', () => {
      const mockHandleSort = jest.fn();
      render(
        <TableHeaderCell
          onSort={mockHandleSort}
        >
          ID
        </TableHeaderCell>,
      );

      const tableHeaderCell = screen.getByText('ID');

      fireEvent.click(tableHeaderCell);
      expect(mockHandleSort).toHaveBeenCalledTimes(0);
    });

    test('th element is rendered with specific width style atrtibute based on width prop', () => {
      render(
        <TableHeaderCell
          width={200}
        >
          ID
        </TableHeaderCell>,
      );

      const tableHeaderCell = screen.getByText('ID');

      expect(tableHeaderCell).toHaveStyle({ width: '200px', maxWidth: '200px' });
    });
  });
});
