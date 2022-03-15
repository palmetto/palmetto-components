import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  describe('Default', () => {
    test('It renders a component with a nav tag based on props', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={() => 'blerg'}
        />,
      );

      const pagination = screen.getByRole('navigation');
      expect(pagination).toBeInTheDocument();
    });
  });

  describe('Custom Class', () => {
    test('It renders with a custom class if provided', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          className="custom-class"
        />,
      );

      const pagination = screen.getByRole('navigation');
      expect(pagination).toHaveClass('custom-class');
    });
  });

  describe('Custom button labels', () => {
    test('It renders with a custom class if provided', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          className="custom-class"
          prevPageText="hello"
          nextPageText="goodbye"
        />,
      );

      const prevButton = screen.getByText('hello');
      const nextButton = screen.getByText('goodbye');
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });
  });

  describe('With Page numbers', () => {
    test('It renders width default page numbers for 5 pages or records', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          className="custom-class"
          arePagesVisible
        />,
      );
      const expectedPages = ['1', '2', '3', '4', '5'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pages: any[] = [];

      expectedPages.forEach((_page, i) => {
        pages.push(screen.getByText(expectedPages[i]));
      });

      expectedPages.forEach((_page, i) => {
        expect(pages[i]).toBeInTheDocument();
      });
    });

    test('It does not show excess page numbers if prop passed overshoots the number of records', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={5}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          arePagesVisible
          numberOfPagesDisplayed={4}
        />,
      );
      const expectedPageNumbers = ['1'];
      const excludedPageNumbers = ['2', '3', '4'];

      expectedPageNumbers.forEach((_page, i) => {
        expect(screen.getByText(expectedPageNumbers[i])).toBeInTheDocument();
      });

      excludedPageNumbers.forEach((_page, i) => {
        expect(screen.queryByText(excludedPageNumbers[i])).toBe(null);
      });
    });

    test('It shows the correct range of active entries when not on last page', () => {
      render(
        <Pagination
          activePage={2}
          totalItemsCount={1200}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          arePagesVisible
          numberOfPagesDisplayed={4}
        />,
      );

      const range = screen.getByText('Showing 21-40 of 1200');
      expect(range).toBeInTheDocument();
    });

    test('It shows the correct range of active entries when last page is active', () => {
      render(
        <Pagination
          activePage={12}
          totalItemsCount={1151}
          itemsPerPage={100}
          onChange={() => 'blerg'}
          arePagesVisible
          numberOfPagesDisplayed={4}
        />,
      );

      const range = screen.getByText('Showing 1101-1151 of 1151');
      expect(range).toBeInTheDocument();
    });

    test('It shows ellipsis buttons where appropriate', () => {
      const { rerender } = render(
        <Pagination
          activePage={12}
          totalItemsCount={1151}
          itemsPerPage={100}
          onChange={() => 'blerg'}
          arePagesVisible
          numberOfPagesDisplayed={4}
        />,
      );

      let ellipsisFound: HTMLElement[] = [];

      ellipsisFound = screen.queryAllByText('...');
      expect(ellipsisFound.length).toBe(1);

      rerender(
        <Pagination
          activePage={6}
          totalItemsCount={1151}
          itemsPerPage={100}
          onChange={() => 'blerg'}
          arePagesVisible
          numberOfPagesDisplayed={4}
        />,
      );

      ellipsisFound = screen.queryAllByText('...');
      expect(ellipsisFound.length).toBe(2);

      const buttonsFound = screen.queryAllByRole('button');
      expect(buttonsFound[2]).toHaveTextContent('...');
      expect(buttonsFound[buttonsFound.length - 3]).toHaveTextContent('...');
    });
  });

  describe('Compact', () => {
    test('Renders compact pagination if prop is passed', () => {
      render(
        <Pagination
          activePage={1}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={() => 'blerg'}
          arePagesVisible
          isCompact
        />,
      );

      const buttons = screen.queryAllByRole('button');

      buttons.forEach(button => {
        expect(button).toHaveClass('size-sm');
      });
    });
  });

  describe('Callback Handling', () => {
    test('It fires onChange callback when previous/next buttons are clicked', () => {
      const mockedHandleChange = jest.fn();

      render(
        <Pagination
          activePage={2}
          totalItemsCount={100}
          itemsPerPage={20}
          onChange={mockedHandleChange}
          arePagesVisible
        />,
      );

      const prevButton = screen.getByText('Previous').closest('button');
      const nextButton = screen.getByText('Next').closest('button');
      const pageFour = screen.getByText('4').closest('button');
      if (prevButton) fireEvent.click(prevButton);
      if (nextButton) fireEvent.click(nextButton);
      if (pageFour) fireEvent.click(pageFour);

      expect(mockedHandleChange).toBeCalledTimes(3);
      expect(mockedHandleChange.mock.calls[0][0]).toBe(1);
      expect(mockedHandleChange.mock.calls[1][0]).toBe(3);
      expect(mockedHandleChange.mock.calls[2][0]).toBe(4);
    });
  });
});
