import React, { FC, ReactNode } from 'react';
import Box from '../Box/Box';
import Button from '../Button/Button';
// import SelectInput from '../SelectInput/SelectInput';

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
   * Boolean to determine if individual page buttons (or dropdown are visible).
   */
  arePagesVisible?: boolean;
  /**
   * Pass true to render a version of Pagination with smaller buttons.
   */
  isCompact?: boolean;
  /**
   * The text (or react node) to pass to the NEXT page button.
   */
  nextPageText?: string | ReactNode;
  /**
   * Range of pages in paginator, not including navigation blocks (prev, next, first, last pages)
   */
  pageRangeDisplayed?: number;
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
  nextPageText = 'Next',
  pageRangeDisplayed = 5,
  prevPageText = 'Previous',
  isCompact = false,
}) => {
  const getPageRange = () => (
    pageRangeDisplayed > Math.ceil(totalItemsCount / itemsPerPage)
      ? Math.ceil(totalItemsCount / itemsPerPage)
      : pageRangeDisplayed
  );

  const pageTotal = Math.ceil(totalItemsCount / itemsPerPage);

  const getActivePageRange = () => {
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
    for (let i = 1; i <= getPageRange(); i += 1) {
      pages.push(i);
    }

    return pages.map(pageNumber => (
      <Button
        onClick={() => onChange(pageNumber)}
        isOutlined={activePage !== pageNumber}
        size={isCompact ? 'sm' : 'md'}
        // variant={activePage !== pageNumber ? 'light' : 'primary'}
        style={{
          minWidth: isCompact ? '33px' : '42px',
          borderRadius: 0,
          ...pageNumber !== pageTotal && { borderRight: '0' },
        }}
      >
        {pageNumber}
      </Button>
    ));
  };

  return (
    <Box
      as="nav"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding="lg"
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
            {/* <SelectInput  */}
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
        display={{
          base: 'none',
          tablet: 'block',
        }}
      >
        {`Showing ${getActivePageRange().first}-${getActivePageRange().last} of ${totalItemsCount}`}
      </Box>
    </Box>
  );
};

export default Pagination;
