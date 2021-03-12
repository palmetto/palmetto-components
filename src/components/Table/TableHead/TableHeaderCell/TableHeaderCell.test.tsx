import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';
import { TableHeaderCell } from './TableHeaderCell';

const column = {
  heading: 'ID',
  dataKey: 'id',
};

const sortedColumn = (direction: 'none' | 'ascending' | 'descending' | undefined) => ({
  dataKey: 'id',
  sortDirection: direction,
});

describe('TableHeaderCell', () => {
  describe('Callback Handling', () => {
    describe('onSort', () => {
      test('onSort event fires callback function on click', () => {
        const mockHandleSort = jest.fn();
        render(
          <TableHeaderCell
            column={column}
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
            column={column}
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
            column={column}
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
            column={column}
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
            column={column}
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
          column={column}
          onSort={mockHandleSort}
        >
          ID
        </TableHeaderCell>,
      );

      const tableHeaderCell = screen.getByText('ID');

      fireEvent.click(tableHeaderCell);
      expect(mockHandleSort).toHaveBeenCalledTimes(0);
    });
  });

  describe('States', () => {
    test('It renders the header with sort icon and default sortDirection if \'isSortable\' is passed', () => {
      render(
        <TableHeaderCell
          column={column}
          isSortable
        />,
      );

      const tableHeaderCell = screen.getByRole('columnheader');

      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'none');
      expect(screen.getByTestId('tableHeaderCellSortNone-testid')).toBeInTheDocument();
    });

    test('It renders the header with sort icon and proper sortDirection', () => {
      const { rerender } = render(
        <TableHeaderCell
          column={column}
          isSortable
          sortedColumn={sortedColumn('none')}
        />,
      );

      const tableHeaderCell = screen.getByRole('columnheader');

      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'none');
      expect(screen.getByTestId('tableHeaderCellSortNone-testid')).toBeInTheDocument();

      rerender(
        <TableHeaderCell
          column={column}
          isSortable
          sortedColumn={sortedColumn('ascending')}
        />,
      );

      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'ascending');
      expect(screen.getByTestId('tableHeaderCellSortAsc-testid')).toBeInTheDocument();

      rerender(
        <TableHeaderCell
          column={column}
          isSortable
          sortedColumn={sortedColumn('descending')}
        />,
      );

      expect(tableHeaderCell).toHaveAttribute('aria-sort', 'descending');
      expect(screen.getByTestId('tableHeaderCellSortDesc-testid')).toBeInTheDocument();
    });

    test('th element is rendered with specific width style attribute based on width prop', () => {
      render(
        <TableHeaderCell
          column={column}
          width={200}
        >
          ID
        </TableHeaderCell>,
      );

      const tableHeaderCell = screen.getByText('ID').closest('th');

      expect(tableHeaderCell).toHaveStyle({ width: '200px' });
    });

    test('th element is rendered with custom class when passed as a prop', () => {
      render(<TableHeaderCell column={column} className="my-custom-class" />);

      const tableHeaderCell = screen.getByRole('columnheader');

      expect(tableHeaderCell).toHaveClass('my-custom-class');
    });

    describe('Sticky', () => {
      test('it renders as a <th> element with correct classes and attributes if sticky is passed as a prop with "left" as its value', () => { // eslint-disable-line max-len
        render(
          <TableHeaderCell
            column={column}
            sticky="left"
          />,
        );

        const tableColumnHeader = screen.getByRole('columnheader');

        expect(tableColumnHeader).toBeInTheDocument();
        expect(tableColumnHeader).toHaveAttribute('scope', 'col');
        expect(tableColumnHeader).toHaveClass('sticky-column');
        expect(tableColumnHeader).toHaveClass('sticky-column-left');
      });

      test('it renders as a <th> element with correct classes and attributes if sticky is passed as a prop with "right" as its value', () => { // eslint-disable-line max-len
        render(
          <TableHeaderCell
            column={column}
            sticky="right"
          />,
        );

        const tableColumnHeader = screen.getByRole('columnheader');

        expect(tableColumnHeader).toBeInTheDocument();
        expect(tableColumnHeader).toHaveAttribute('scope', 'col');
        expect(tableColumnHeader).toHaveClass('sticky-column');
        expect(tableColumnHeader).toHaveClass('sticky-column-right');
      });
    });
  });
});
