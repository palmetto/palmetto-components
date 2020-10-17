import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box from '../Box/Box';
import Button from '../Button/Button';

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
   * Boolean to determine if individual page buttons (or dropdown are visible). Takes a `ResponsiveProp`
   * if you want to render it differently at different breakpoints
   */
  arePagesVisible?: boolean;
  /**
   * Custom class to pass down to the pagination container.
   */
  className?: string;
  /**
   * Pass true to render a version of Pagination with smaller buttons.
   */
  isCompact?: boolean;
  /**
   * Boolean to determine if the list totals (and current range) are visible.
   * NOTE: these are hidden on mobile regardless of this prop value.
   */
  isTotalVisible?: boolean;
  /**
   * The text (or react node) to pass to the NEXT page button.
   */
  nextPageText?: string | ReactNode;
  /**
   * Range of pages in paginator, not including navigation blocks (prev, next, first, last pages)
   */
  numberOfPagesDisplayed?: number;
  /**
   * The text (or react node) to pass to the PREVIOUS page button.
   */
  prevPageText?: string | ReactNode;
}

const Pagination: FC<PaginationProps> = ({
  activePage,
  itemsPerPage,
  onChange,
  totalItemsCount,
  arePagesVisible = false,
  className = undefined,
  isCompact = false,
  isTotalVisible = true,
  nextPageText = 'Next',
  numberOfPagesDisplayed = 5,
  prevPageText = 'Previous',
}) => {
  const getPageRange = () => (
    numberOfPagesDisplayed > Math.ceil(totalItemsCount / itemsPerPage)
      ? Math.ceil(totalItemsCount / itemsPerPage)
      : numberOfPagesDisplayed
  );

  const pageTotal = Math.ceil(totalItemsCount / itemsPerPage);

  const getActiveListRange = () => {
    const activePageRange: { first?: number; last?: number; } = {};

    if (activePage === 1) {
      activePageRange.first = 1;
      activePageRange.last = totalItemsCount > itemsPerPage ? itemsPerPage : totalItemsCount;
    } else if (activePage < pageTotal) {
      activePageRange.first = (activePage * itemsPerPage) - (itemsPerPage - 1);
      activePageRange.last = activePage * itemsPerPage;
    } else {
      activePageRange.first = (activePage * itemsPerPage) - (itemsPerPage - 1);
      activePageRange.last = totalItemsCount;
    }

    return activePageRange;
  };

  const renderPages = () => {
    const pages = [];
    let startingPage = 1;
    let endingPage = getPageRange();

    if (pageTotal <= getPageRange()) {
      startingPage = 1;
      endingPage = getPageRange();
    } else if (activePage + numberOfPagesDisplayed > pageTotal) {
      startingPage = pageTotal - (numberOfPagesDisplayed - 1);
      endingPage = startingPage + (numberOfPagesDisplayed - 1);
    } else if (activePage > numberOfPagesDisplayed && (activePage + numberOfPagesDisplayed) <= pageTotal) {
      startingPage = activePage - (Math.floor(numberOfPagesDisplayed / 2));
      endingPage = startingPage + (numberOfPagesDisplayed - 1);
    }

    for (let i = startingPage; i <= endingPage; i += 1) {
      pages.push({ pageNumber: i });
    }

    if (pageTotal > pages[pages.length - 1].pageNumber) {
      pages.push(
        { pageNumber: activePage + numberOfPagesDisplayed, isPage: false },
        { pageNumber: pageTotal },
      );
    }

    if (activePage > numberOfPagesDisplayed) {
      pages.unshift(
        { pageNumber: 1 },
        { pageNumber: activePage - numberOfPagesDisplayed, isPage: false },
      );
    }

    const PageButton = ({
      pageNumber,
      buttonClassName,
      isPage = true,
    }: {
      pageNumber: number;
      buttonClassName?: string; // eslint-disable-line react/require-default-props
      isPage?: boolean; // eslint-disable-line react/require-default-props
    }) => (
      <Button
        onClick={() => onChange(pageNumber)}
        isOutlined={activePage !== pageNumber}
        size={isCompact ? 'sm' : 'md'}
        style={{
          minWidth: isCompact ? '33px' : '42px',
          borderRadius: 0,
          border: 0,
        }}
        className={buttonClassName}
      >
        {isPage ? pageNumber : '...'}
      </Button>
    );

    return pages.map(page => (
      <PageButton {...page} />
    ));
  };

  return (
    <Box
      as="nav"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding="lg"
      className={classNames(className)}
    >
      <Box
        direction="row"
        justifyContent={{ base: 'space-between' }}
        flex={{ base: 'auto', tablet: 'none' }}
        childGap={isCompact ? 'xs' : 'sm'}
      >
        <Button
          variant="light"
          size={isCompact ? 'sm' : 'md'}
          isDisabled={activePage === 1}
          onClick={() => onChange(activePage - 1)}
        >
          {prevPageText}
        </Button>
        {arePagesVisible && (
          <Box direction="row">
            {renderPages()}
          </Box>
        )}
        <Button
          variant="light"
          size={isCompact ? 'sm' : 'md'}
          isDisabled={activePage === pageTotal}
          onClick={() => onChange(activePage + 1)}
        >
          {nextPageText}
        </Button>
      </Box>
      <Box
        as="p"
        display={{
          base: 'none',
          tablet: 'block',
        }}
        fontSize={isCompact ? 'sm' : 'md'}
      >
        {isTotalVisible && (
          `Showing ${getActiveListRange().first}-${getActiveListRange().last} of ${totalItemsCount}`
        )}
      </Box>
    </Box>
  );
};

export default Pagination;
