import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import TableHeaderSortable from './TableHeaderSortable';

const mockHandleSort = jest.fn();

describe('TableHead', () => {
  describe('Callback Handling', () => {
    describe('onSort', () => {
      test('onSort event fires callback function on click', () => {
        render(
          <TableHeaderSortable
            heading="ID"
            id="first"
            onSort={mockHandleSort}
          />,
        );

        const sortableColumnHeader = screen.getByText('ID');

        fireEvent.click(sortableColumnHeader);
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });

      test('onSort event fires callback function on Enter keydown', () => {
        render(
          <TableHeaderSortable
            heading="ID"
            id="first"
            onSort={mockHandleSort}
          />,
        );

        const sortableColumnHeader = screen.getByText('ID');

        fireEvent.keyDown(sortableColumnHeader, { key: 'Enter', code: 'Enter' });
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });

      test('onSort event fires callback function on Space keydown', () => {
        render(
          <TableHeaderSortable
            heading="ID"
            id="first"
            onSort={mockHandleSort}
          />,
        );

        const sortableColumnHeader = screen.getByText('ID');

        fireEvent.keyDown(sortableColumnHeader, { key: 'Space', code: 'Space' });
        expect(mockHandleSort).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('States', () => {
    describe('Default', () => {
      test('it renders a sort icon', () => {
        render(
          <TableHeaderSortable
            heading="ID"
            id="first"
            onSort={mockHandleSort}
          />,
        );

        const sortIcon = screen.getByTestId('sort-testid');

        expect(sortIcon).toBeInTheDocument();
      });
    });

    describe('Sorted Descending', () => {
      test('it renders a descending sort icon', () => {
        render(
          <TableHeaderSortable
            heading="ID"
            id="first"
            onSort={mockHandleSort}
            sortedColumn={{ id: 'first', sortOrder: 'desc' }}
          />,
        );

        const sortIcon = screen.getByTestId('arrowDown-testid');

        expect(sortIcon).toBeInTheDocument();
      });
    });

    describe('Sorted Ascending', () => {
      test('it renders a ascending sort icon', () => {
        render(
          <TableHeaderSortable
            heading="ID"
            id="first"
            onSort={mockHandleSort}
            sortedColumn={{ id: 'first', sortOrder: 'asc' }}
          />,
        );

        const sortIcon = screen.getByTestId('arrowUp-testid');

        expect(sortIcon).toBeInTheDocument();
      });
    });

    // describe('Disabled', () => {
    //   test('clicking on the header does nothing', () => {
    //     render(
    //       <TableHeaderSortable
    //         heading="ID"
    //         id="first"
    //         onSort={mockHandleSort}
    //         isLoading
    //       />,
    //     );

    //     const sortableColumnHeader = screen.getByText('ID');

    //     fireEvent.click(sortableColumnHeader);
    //     expect(mockHandleSort).toHaveBeenCalledTimes(0);
    //   });
    // });
  });
});
