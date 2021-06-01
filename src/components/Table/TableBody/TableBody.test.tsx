import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { TableBody } from './TableBody';

const columns = [
  { heading: 'ID', dataKey: 'id' },
  { heading: 'Color', dataKey: 'color' },
  { heading: 'Flavor', dataKey: 'flavor' },
];

const rows = [
  { id: 1, color: 'red', flavor: 'vanilla' },
  { id: 2, color: 'blue', flavor: 'chocolate' },
  { id: 3, color: 'green', flavor: 'strawberry' },
];

describe('TableBody', () => {
  test('It renders with striped rows if passed \'isStriped\' prop', () => {
    render(
      <TableBody
        columns={columns}
        rows={rows}
        rowKey="id"
        isStriped
      />,
    );

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toHaveClass('striped');
  });

  test('It renders with a custom class when passed as a prop', () => {
    render(
      <TableBody
        columns={columns}
        rows={rows}
        rowKey="id"
        className="my-custom-class"
      />,
    );

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toHaveClass('my-custom-class');
  });
});
