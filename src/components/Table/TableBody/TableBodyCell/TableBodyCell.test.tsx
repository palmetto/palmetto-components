import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import TableBodyCell from './TableBodyCell';

describe('TableBodyCell', () => {
  describe('States', () => {
    test('It renders an empty td when no children passed', () => {
      render(<TableBodyCell />);

      const tableBodyCell = screen.getByRole('cell');
      expect(tableBodyCell).toBeInTheDocument();
    });

    test('td element is rendered with specific width style attribute based on width prop', () => {
      render(<TableBodyCell width={200}>ID</TableBodyCell>);

      const tableBodyCell = screen.getByText('ID').parentElement;

      expect(tableBodyCell).toHaveStyle({ minWidth: '200px', maxWidth: '200px' });
    });

    test('td content is truncated if \'isTruncated\' prop is passed', () => {
      render(
        <TableBodyCell width={50} truncateOverflow>
          Lots of long long long content
        </TableBodyCell>,
      );

      const tableBodyCellWithEllipsis = screen.getByRole('cell').children[0];

      expect(tableBodyCellWithEllipsis).toHaveClass('truncated');
    });

    test('td is borderless if \'isBorderless\' prop is passed', () => {
      render(<TableBodyCell isBorderless>ID</TableBodyCell>);

      const tableBodyCellWithEllipsis = screen.getByRole('cell');

      expect(tableBodyCellWithEllipsis).toHaveClass('borderless');
    });

    test('td is compact if \'isCompact\' prop is passed', () => {
      render(<TableBodyCell isCompact>ID</TableBodyCell>);

      const tableBodyCellWithEllipsis = screen.getByRole('cell');

      expect(tableBodyCellWithEllipsis).toHaveClass('compact');
    });

    test('It renders with a custom class if className is passed as prop', () => {
      render(<TableBodyCell className="my-custom-class" />);

      const tableBodyCell = screen.getByRole('cell');
      const customClassContainer = tableBodyCell.children[0];
      expect(customClassContainer).toHaveClass('my-custom-class');
    });

    describe('Sticky', () => {
      test('it renders as a <th> element if sticky is passed as a prop with "left" as its value', () => {
        render(
          <TableBodyCell
            sticky="left"
          />,
        );

        const tableRowHeader = screen.getByRole('rowheader');

        expect(tableRowHeader).toBeInTheDocument();
        expect(tableRowHeader).toHaveAttribute('scope', 'row');
        expect(tableRowHeader).toHaveClass('sticky-column');
        expect(tableRowHeader).toHaveClass('sticky-column-left');
      });

      test('it renders as a <th> element if sticky is passed as a prop with "right" as its value', () => {
        render(
          <TableBodyCell
            sticky="right"
          />,
        );

        const tableRowHeader = screen.getByRole('rowheader');

        expect(tableRowHeader).toBeInTheDocument();
        expect(tableRowHeader).toHaveAttribute('scope', 'row');
        expect(tableRowHeader).toHaveClass('sticky-column');
        expect(tableRowHeader).toHaveClass('sticky-column-right');
      });
    });
  });
});
