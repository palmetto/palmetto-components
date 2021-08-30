import React, {
  FC, Key, KeyboardEvent, MouseEvent, ReactNode,
} from 'react';
import classNames from 'classnames';
import { Box } from '../../../Box/Box';
import { Icon } from '../../../Icon/Icon';
import { Column, EventWithColumnKey } from '../../../../types';
import * as TableConstants from '../../constants';
import styles from './TableHeaderCell.module.scss';

export interface TableHeaderCellProps {
  /**
   * Title to display for the column.
   */
  column: Column;
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Custom class to apply to the `<th>` element.
   */
  className?: string;
  /**
   * Key of corresponding data value in the table.
   */
  dataKey?: Key;
  /**
   * Remove borders around th elements.
   */
  isBorderless?: boolean;
  /**
   * Determines if table header cells should render as compact (less padding);
   */
  isCompact?: boolean;
  /**
   * If table scrolls vertically, header will remain stuck to the top of the table, and not scroll away.
   */
  hasStickyHeader?: boolean;
  /**
   * Boolean to mark if a column is sortable. This will show the sorting icons. Use
   * in conjunction with the `sortDirection` prop to determine which icon is shown.
   */
  isSortable?: boolean;
  /**
   * Callback function to execute when a sortable column's header is clicked.
   * Column can be sorted without providing an onSort method, it means that the arrows
   * will not be clickable, but they will still represent the sort state
   * of a column as determined by the `sortDirection` prop.
   */
  onSort?: (event: EventWithColumnKey) => void;
  /**
   * The key of the sorted column and its sort direction.
   */
  sortedColumn?: {
    dataKey: string | undefined;
    sortDirection: 'none' | 'ascending' | 'descending' | undefined;
  };
  /**
   * Will stick to either the left or right side of a table during horizontal scroll.
   */
  sticky?: 'left' | 'right';
  /**
   * Whether the text should be cut off with ellipsis if it exceeds the width of the column.
   */
  truncateOverflow?: boolean;
  /**
   * Width of the column, if using the `useFixedWidthColumns` prop is set to true.
   */
  width?: number;
}

// eslint-disable-line import/prefer-default-export
export const TableHeaderCell: FC<TableHeaderCellProps> = ({
  column,
  align = 'left',
  className = undefined,
  dataKey = undefined,
  isBorderless = false,
  isCompact = false,
  hasStickyHeader = false,
  isSortable = false,
  onSort = undefined,
  sortedColumn = undefined,
  sticky = undefined,
  truncateOverflow = false,
  width = undefined,
}) => {
  const isColumnSorted = (columnDataKey: Key | undefined): boolean => (
    !!sortedColumn && sortedColumn.dataKey === columnDataKey
  );

  const getSortDirection = (): 'ascending' | 'descending' | 'none' | undefined => (
    sortedColumn && isColumnSorted(column.dataKey) ? sortedColumn.sortDirection : 'none'
  );

  const renderIcon = (): ReactNode => {
    const renderArrows = (): ReactNode => {
      if (getSortDirection() === 'ascending') {
        return <Icon name="caret-sm-up" data-testid="tableHeaderCellSortAsc-testid" />;
      }
      if (getSortDirection() === 'descending') {
        return <Icon name="caret-sm-down" data-testid="tableHeaderCellSortDesc-testid" />;
      }

      return (
        <Box
          display="inline-block"
          width="12px"
          height="12px"
          aria-hidden="true"
          data-testid="tableHeaderCellSortNone-testid"
        />
      );
    };

    return <span className={styles['sort-icon']}>{renderArrows()}</span>;
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTableHeaderCellElement>): void => {
    if (!onSort || !isSortable) return;

    const enterKey = 13;
    const spaceKey = 32;

    if (event.keyCode === enterKey || event.keyCode === spaceKey) {
      const eventWithKey: EventWithColumnKey = { ...event, sortedKey: dataKey };
      onSort(eventWithKey);
    }
  };

  const handleSort = (event: MouseEvent<HTMLTableHeaderCellElement>): void => {
    if (!onSort || !isSortable) return;

    const eventWithKey: EventWithColumnKey = { ...event, sortedKey: dataKey };
    onSort(eventWithKey);
  };

  const tableHeaderClasses = classNames(
    styles['table-header-cell'],
    {
      [styles.sortable]: isSortable,
      [styles.truncated]: truncateOverflow,
      [styles['sticky-header']]: hasStickyHeader,
      [styles['sticky-column']]: sticky === 'left' || sticky === 'right',
      [styles['sticky-column-left']]: sticky === 'left',
      [styles['sticky-column-right']]: sticky === 'right',
      [styles['align-right']]: align === 'right',
      [styles['align-center']]: align === 'center',
    },
    className,
  );

  return (
    <Box
      as="th"
      display="table-cell"
      className={tableHeaderClasses}
      borderColor={TableConstants.BORDER_COLOR}
      borderWidth={isBorderless ? '0' : `0 0 ${TableConstants.BORDER_WIDTH} 0`}
      background={TableConstants.BACKGROUND_COLOR}
      padding={isCompact
        ? `${TableConstants.PADDING_VERTICAL_COMPACT} ${TableConstants.PADDING_HORIZONTAL_COMPACT}`
        : `${TableConstants.PADDING_HEADER_VERTICAL} ${TableConstants.PADDING_HORIZONTAL}`
      }
      width={`${width}px`}
      color={TableConstants.FONT_COLOR}
      fontSize={TableConstants.HEADER_FONT_SIZE}
      fontWeight={TableConstants.HEADER_FONT_WEIGHT}
      aria-sort={
        sortedColumn && isColumnSorted(column.dataKey) ? sortedColumn.sortDirection : 'none'
      }
      tabIndex={isSortable ? 0 : undefined}
      onClick={handleSort}
      onKeyDown={handleKeyPress}
      scope="col"
    >
      <div className={styles.heading}>
        {column.heading}
        {isSortable && renderIcon()}
      </div>
    </Box>
  );
};
