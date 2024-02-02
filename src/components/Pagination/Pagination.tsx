import React, { FC, ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import {
  generatePages,
  generatePageRange,
  generatePageTotal,
  generateActiveListRange,
} from './Pagination.utilities';

export interface PaginationProps {
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
   * Number of pages shown in paginator, not including navigation blocks (prev, next), as well as first, last pages.
   * In other words the number of pages displayed 'in the middle', that the user can navigate to.
   */
  numberOfPagesDisplayed?: number;
  /**
   * The text (or react node) to pass to the PREVIOUS page button.
   */
  prevPageText?: string | ReactNode;
}

export const Pagination: FC<PaginationProps> = ({
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
  const pageTotal = useMemo(
    () => generatePageTotal(totalItemsCount, itemsPerPage),
    [totalItemsCount, itemsPerPage],
  );

  const pageRange = useMemo(
    () => generatePageRange(numberOfPagesDisplayed, pageTotal),
    [numberOfPagesDisplayed, pageTotal],
  );

  const activeListRange = useMemo(
    () => generateActiveListRange(activePage, totalItemsCount, itemsPerPage),
    [activePage, totalItemsCount, itemsPerPage],
  );

  const pages = useMemo(
    () => generatePages(pageRange, pageTotal, activePage, numberOfPagesDisplayed),
    [pageRange, pageTotal, activePage, numberOfPagesDisplayed],
  );

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
        gap={isCompact ? 'xs' : 'sm'}
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
          <Box direction="row" gap="2xs">
            {pages.map(({ pageNumber, isPage }) => (
              <Button
                key={pageNumber}
                onClick={() => onChange(pageNumber)}
                isOutlined={activePage !== pageNumber}
                size={isCompact ? 'sm' : 'md'}
                style={{
                  minWidth: isCompact ? '33px' : '42px',
                  border: 0,
                }}
                className={className}
              >
                {isPage ? pageNumber : '...'}
              </Button>
            ))}
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
          `Showing ${activeListRange.first}-${activeListRange.last} of ${totalItemsCount}`
        )}
      </Box>
    </Box>
  );
};
