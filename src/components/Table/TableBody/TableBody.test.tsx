import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import TableBody from './TableBody';

describe('TableBody', () => {
  test('It renders an empty tbody when no children passed', () => {
    render(<TableBody />);

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toBeInTheDocument();
  });

  test('It renders with striped rows if passed \'isStriped\' prop', () => {
    render(<TableBody isStriped />);

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toHaveClass('striped');
  });

  test('It renders with a custom class when passed as a prop', () => {
    render(<TableBody className="my-custom-class" />);

    const tableBody = screen.getByRole('rowgroup');
    expect(tableBody).toHaveClass('my-custom-class');
  });
});
