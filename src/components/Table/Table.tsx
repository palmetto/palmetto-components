import React, { FC } from 'react';
import classNames from 'classnames';
import { Column, Row, EventWithColumnKey } from '../../types';
import { Spinner } from '../Spinner/Spinner';
import styles from './Table.module.scss';
import { TableBody } from './TableBody/TableBody';
import { TableHead } from './TableHead/TableHead';

export interface TableProps {
  /**
   * Columns for the table. See Column definition below for details.
   */
  columns: Column[];
  /**
   * The data rows to be displayed
   */
  rows: Row[];
  /**
   * Key that represents a unique value for a row. This is necessary in
   * order to supply React with a node key on each row.
   */
  rowKey: string;
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Global placeholder for empty cells. Can be overwritten by setting the same attribute
   * in the `Column` config.
   */
  emptyCellPlaceholder?: string | number | undefined;
  /**
   * Enable a hover state on table rows.
   */
  hoverableRows?: boolean;
  /**
   * Remove borders around table, thead, tbody, td, etc.
   */
  isBorderless?: boolean;
   /**
   * Make Table more compact by cutting cell padding in half.
   */
  isCompact?: boolean;
  /**
   * If table scrolls vertically, header will remain stuck to the top of the table, and not scroll away.
   */
  hasStickyHeader?: boolean;
  /**
   * Set to true if data is loading.
   */
  isLoading?: boolean;
  /**
   * Set the maximum width and height and enable scrolling within the container when the table grows
   * past those values. Useful for when we want to render a large table but not force the parent container
   * to grow and instead make the user scroll. Set values to boolean `true` to enable `overflow: scroll` on the table
   * without specifying a width/height
   */
  isScrollable?: {
    x?: boolean;
    y?: boolean;
  };
  /**
   * Adds zebra-striping to any table row within the table body.
   */
  isStriped?: boolean;
  /**
   * Callback function to fire on sorting one of the table headers.
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
   * Control the `table-layout` css property for the table.
   */
  useFixedTableLayout?: boolean;
  /**
   * Truncate overflow inside column based on column width. Can be overwritten on specific columns,
   * by passing `truncateOverflow` value on a specific Column
   */
  truncateOverflow?: boolean;
}

export const Table: FC<TableProps> = ({
  columns,
  rows,
  rowKey,
  align = 'left',
  className = undefined,
  emptyCellPlaceholder = undefined,
  hoverableRows = false,
  isBorderless = false,
  isCompact = false,
  hasStickyHeader = false,
  isLoading = false,
  isScrollable = undefined,
  isStriped = false,
  onSort = undefined,
  sortedColumn = undefined,
  useFixedTableLayout = false,
  truncateOverflow = false,
}) => {
  const containerClasses = classNames(
    styles.container,
    {
      [styles['full-height']]: !!isScrollable?.y,
    },
  );

  const scrollContainerClasses = classNames(
    styles['scroll-container'],
    {
      [styles.scrollable]: !!isScrollable?.x || !!isScrollable?.y,
      [styles['scrollable-x']]: !!isScrollable?.x,
      [styles['scrollable-y']]: !!isScrollable?.y,
    },
    className,
  );

  const tableClasses = classNames(
    styles.table,
    {
      [styles.fixed]: useFixedTableLayout,
      [styles.striped]: isStriped,
      [styles.borderless]: isBorderless,
      [styles.compact]: isCompact,
    },
  );

  return (
    <div className={containerClasses}>
      {isLoading && (
        <div className={styles['loading-mask']}>
          <Spinner size="xl" />
        </div>
      )}
      <div className={scrollContainerClasses} data-testid="tableContainerDiv-testid">
        <table className={tableClasses}>
          <TableHead
            columns={columns}
            align={align}
            onSort={onSort}
            isBorderless={isBorderless}
            isCompact={isCompact}
            sortedColumn={sortedColumn}
            truncateOverflow={truncateOverflow}
            hasStickyHeader={hasStickyHeader}
          />
          <TableBody
            rows={rows}
            columns={columns}
            rowKey={rowKey}
            align={align}
            isStriped={isStriped}
            emptyCellPlaceholder={emptyCellPlaceholder}
            hoverableRows={hoverableRows}
            truncateOverflow={truncateOverflow}
            isBorderless={isBorderless}
            isCompact={isCompact}
          />
        </table>
      </div>
    </div>
  );
};
