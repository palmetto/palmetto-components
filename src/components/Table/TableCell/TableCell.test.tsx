import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import TableCell from './TableCell';

describe('TableCell', () => {
  describe('States', () => {
    test('It renders an empty td when no children passed', () => {
      render(<TableCell />);

      const tableCell = screen.getByRole('cell');
      expect(tableCell).toBeInTheDocument();
    });

    test('td element is rendered with specific width style atrtibute based on width prop', () => {
      render(<TableCell width={200}>ID</TableCell>);

      const tableCell = screen.getByText('ID');

      expect(tableCell).toHaveStyle({ width: '200px', maxWidth: '200px' });
    });

    test('td content is truncated if \'isTruncated\' prop is passed', () => {
      render(
        <TableCell width={50} truncateOverflow>
          Lots of long long long content
        </TableCell>,
      );

      const tableCellWithEllipsis = screen.getByRole('cell');

      expect(tableCellWithEllipsis).toHaveClass('truncated');
    });

    test('td is borderless if \'isBorderless\' prop is passed', () => {
      render(<TableCell isBorderless>ID</TableCell>);

      const tableCellWithEllipsis = screen.getByRole('cell');

      expect(tableCellWithEllipsis).toHaveClass('borderless');
    });

    test('td is compact if \'isCompact\' prop is passed', () => {
      render(<TableCell isCompact>ID</TableCell>);

      const tableCellWithEllipsis = screen.getByRole('cell');

      expect(tableCellWithEllipsis).toHaveClass('compact');
    });

    test('It renders with a custom class is passed as prop', () => {
      render(<TableCell className="my-custom-class" />);

      const tableCell = screen.getByRole('cell');
      expect(tableCell).toHaveClass('my-custom-class');
    });
  });
});
