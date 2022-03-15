export interface Page {
  isPage: boolean;
  pageNumber: number;
}

export const generatePages = (
  pageRange: number,
  pageTotal: number,
  activePage: number,
  numberOfPagesDisplayed: number,
): Page[] => {
  const pages: Page[] = [];
  let startingPage = 1;
  let endingPage = pageRange;

  if (pageTotal <= pageRange) {
    startingPage = 1;
    endingPage = pageRange;
  } else if (activePage + numberOfPagesDisplayed > pageTotal) {
    startingPage = pageTotal - (numberOfPagesDisplayed - 1);
    endingPage = startingPage + (numberOfPagesDisplayed - 1);
  } else if (activePage > numberOfPagesDisplayed && (activePage + numberOfPagesDisplayed) <= pageTotal) {
    startingPage = activePage - (Math.floor(numberOfPagesDisplayed / 2));
    endingPage = startingPage + (numberOfPagesDisplayed - 1);
  }

  for (let i = startingPage; i <= endingPage; i += 1) {
    pages.push({ pageNumber: i, isPage: true });
  }

  if (pageTotal > pages[pages.length - 1]?.pageNumber) {
    const secondToLastPage = pageTotal !== activePage + numberOfPagesDisplayed
      ? activePage + numberOfPagesDisplayed
      : pageTotal - 1;

    // only add ellipsis if there are more than 0 pages between the final page and the rest of the pages
    if (pageTotal > numberOfPagesDisplayed + 1) {
      pages.push({ pageNumber: secondToLastPage, isPage: false });
    }

    pages.push(
      { pageNumber: pageTotal, isPage: true },
    );
  }

  if (activePage > numberOfPagesDisplayed) {
    const threeDotsPage = activePage - numberOfPagesDisplayed > 1
      ? activePage - numberOfPagesDisplayed
      : activePage - numberOfPagesDisplayed + 1;

    pages.unshift(
      { pageNumber: 1, isPage: true },
      { pageNumber: threeDotsPage, isPage: false },
    );
  }

  return [...pages];
};

// Return the true page range in cases
// where number of pages wanted for display is larger than the actual page total.
export const generatePageRange = (
  numberOfPagesDisplayed: number,
  pageTotal: number,
): number => (
  numberOfPagesDisplayed > pageTotal
    ? pageTotal
    : numberOfPagesDisplayed
);

export const generatePageTotal = (totalItemsCount: number, itemsPerPage: number): number => (
  Math.ceil(totalItemsCount / itemsPerPage)
);

// Returns the range of current items displayed based on the specific page.
// E.G: if the items per page is 20 and we are on page 1, it will return:
// { first: 1, last: 20 }
export const generateActiveListRange = (
  activePage: number,
  totalItemsCount: number,
  itemsPerPage: number,
): { first?: number; last?: number; } => {
  const activePageRange: { first?: number; last?: number; } = {};

  const pageTotal = generatePageTotal(totalItemsCount, itemsPerPage);

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
