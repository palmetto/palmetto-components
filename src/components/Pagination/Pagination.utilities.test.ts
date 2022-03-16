import {
  generatePages,
  generatePageRange,
  generatePageTotal,
  generateActiveListRange,
} from './Pagination.utilities';

describe('generatePageRange', () => {
  it('returns the number of pages displayed if there are enough total pages', () => {
    const pageRange = generatePageRange(3, 50);
    expect(pageRange).toBe(3);
  });

  it('returns the page total if it is smaller than the number of pages displayed', () => {
    const pageRange = generatePageRange(3, 2);
    expect(pageRange).toBe(2);
  });

  it('returns the number of pages displayed if it is the same as total pages', () => {
    const pageRange = generatePageRange(3, 3);
    expect(pageRange).toBe(3);
  });
});

describe('generatePageTotal', () => {
  it('returns correct number of pages for a variety of inputs', () => {
    const pageTotal1 = generatePageTotal(948, 20);
    expect(pageTotal1).toBe(48);

    const pageTotal2 = generatePageTotal(20, 20);
    expect(pageTotal2).toBe(1);

    const pageTotal3 = generatePageTotal(15, 20);
    expect(pageTotal3).toBe(1);
  });
});

describe('generateActiveListRange', () => {
  it('returns correct active range for a variety of inputs', () => {
    const activeRange = generateActiveListRange(3, 100, 20);

    expect(activeRange.first).toBe(41);
    expect(activeRange.last).toBe(60);

    const activeRange2 = generateActiveListRange(1, 10000, 300);

    expect(activeRange2.first).toBe(1);
    expect(activeRange2.last).toBe(300);
  });
});

describe('generatePages', () => {
  it('returns correct pages -- scenario 1', () => {
    const pages = generatePages(3, 10, 3, 3);
    expect(pages.length).toBe(5);

    expect(pages[0].isPage).toBe(true);
    expect(pages[0].pageNumber).toBe(1);

    expect(pages[1].isPage).toBe(true);
    expect(pages[1].pageNumber).toBe(2);

    expect(pages[2].isPage).toBe(true);
    expect(pages[2].pageNumber).toBe(3);

    expect(pages[3].isPage).toBe(false);
    expect(pages[3].pageNumber).toBe(6);

    expect(pages[4].isPage).toBe(true);
    expect(pages[4].pageNumber).toBe(10);
  });

  it('returns correct pages -- scenario 2', () => {
    const pages = generatePages(3, 10, 6, 3);
    expect(pages.length).toBe(7);

    expect(pages[0].isPage).toBe(true);
    expect(pages[0].pageNumber).toBe(1);

    expect(pages[1].isPage).toBe(false);
    expect(pages[1].pageNumber).toBe(3);

    expect(pages[2].isPage).toBe(true);
    expect(pages[2].pageNumber).toBe(5);

    expect(pages[3].isPage).toBe(true);
    expect(pages[3].pageNumber).toBe(6);

    expect(pages[4].isPage).toBe(true);
    expect(pages[4].pageNumber).toBe(7);

    expect(pages[5].isPage).toBe(false);
    expect(pages[5].pageNumber).toBe(9);

    expect(pages[6].isPage).toBe(true);
    expect(pages[6].pageNumber).toBe(10);
  });

  it('returns correct pages -- scenario 3', () => {
    const pages = generatePages(3, 10, 9, 3);
    expect(pages.length).toBe(5);

    expect(pages[0].isPage).toBe(true);
    expect(pages[0].pageNumber).toBe(1);

    expect(pages[1].isPage).toBe(false);
    expect(pages[1].pageNumber).toBe(6);

    expect(pages[2].isPage).toBe(true);
    expect(pages[2].pageNumber).toBe(8);

    expect(pages[3].isPage).toBe(true);
    expect(pages[3].pageNumber).toBe(9);

    expect(pages[4].isPage).toBe(true);
    expect(pages[4].pageNumber).toBe(10);
  });

  it('returns the correct pages -- one less page range than total', () => {
    const pages = generatePages(2, 3, 1, 2);

    expect(pages[0].isPage).toBe(true);
    expect(pages[0].pageNumber).toBe(1);

    expect(pages[1].isPage).toBe(true);
    expect(pages[1].pageNumber).toBe(2);

    expect(pages[2].isPage).toBe(true);
    expect(pages[2].pageNumber).toBe(3);

    expect(pages.length).toBe(3);
  });
});
