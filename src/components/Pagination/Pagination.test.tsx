import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  describe('Default', () => {
    test('It renders a component with a nav tag based on props', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          pageRangeDisplayed={5}
        />,
      );

      const pagination = screen.getByRole('nav');
      expect(pagination).toBeInTheDocument();
    });
  });

  describe('Custom Class', () => {
    test('It renders with a custom class if provided', () => {
      const message = 'Hello world!';
      render(<Pagination message={message} className="custom-class" />);

      const pagination = screen.getByRole('pagination');
      expect(pagination).toHaveClass('custom-class');
    });
  });
});
