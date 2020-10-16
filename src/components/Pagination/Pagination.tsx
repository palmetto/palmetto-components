import React, { MouseEvent, KeyboardEvent, FC } from 'react';
import Box from '../Box/Box';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PaginationProps {
  /**
   * The current page number being displayed.
   */
  activePage: number;
  /**
   * The number of list items contained in a page.
   */
  itemsPerPage: number;
  /**
   * Callback fired when the user clicks a page or prev/next button.
   */
  onChange: (pageNumber: number) => void;
  /**
   * The total number of items in the list
   */
  totalItemsCount: number;
  /**
   * Range of pages in paginator, not including navigation blocks (prev, next, first, last pages)
   */
  pageRangeDisplayed?: number;
}

const Pagination: FC<PaginationProps> = ({
  activePage,
  itemsPerPage,
  onChange,
  pageRangeDisplayed = 5,
  totalItemsCount,
}) => {
  const getPageRange = () => (
    pageRangeDisplayed < Math.ceil(totalItemsCount / itemsPerPage)
      ? pageRangeDisplayed
      : Math.ceil(totalItemsCount / itemsPerPage)
  );

  const handlePageKeyPress = (event: KeyboardEvent<HTMLButtonElement>): void => {
    // const enterKey = 13;
    // const spaceKey = 32;
    console.log(event);

    // if (event.keyCode === enterKey || event.keyCode === spaceKey) {
    //   onChange(eventWithKey);
    // }
  };

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= getPageRange(); i += 1) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Box as="nav" direction="row" childGap="sm">
      <Button variant="light"><FontAwesomeIcon icon="chevron-left" /></Button>
      {getPages().map(pageNumber => (
        <Button onClick={() => onChange(pageNumber)} onKeyDown={handlePageKeyPress}>
          {pageNumber}
        </Button>
      ))}
      <Button variant="light"><FontAwesomeIcon icon="chevron-left" /></Button>
    </Box>
  );
};

export default Pagination;
