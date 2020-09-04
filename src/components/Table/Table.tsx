import React, { FC } from 'react';
import classNames from 'classnames';
import { Column, Row, EventWithColumnKey } from './TableTypes';
import Spinner from '../Spinner/Spinner';
import styles from './Table.module.scss';
import TableBody from './TableBody/TableBody';
import TableHead from './TableHead/TableHead';

interface TableProps {
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
   * Set to true if data is loading.
   */
  isLoading?: boolean;
  /**
   * Adds zebra-striping to any table row within the table body.
   */
  isStriped?: boolean;
  /**
   * Callback function to fire on sorting one of the table headers.
   */
  onSort?: (event: EventWithColumnKey) => void;
  /**
   * Set the maximum width and height and enable scrolling within the container when the table grows
   * past those values. Useful for when we want to render a large table but not force the parent container
   * to grow and instead make the user scroll.
   */
  scroll?: {
    x: number | undefined;
    y: number | undefined;
  };
  /**
   * The key of the sorted column and its sort direction.
   */
  sortedColumn?: {
    dataKey: string | undefined;
    sortDirection: 'none' | 'ascending' | 'descending' | undefined;
  };
  /**
   * Truncate overflow inside column based on column width. Can be overwritten on specific columns,
   * by passing `truncateOverflow` value on a specific Column
   */
  truncateOverflow?: boolean;
  /**
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
}

const Table: FC<TableProps> = ({
  columns,
  rows,
  rowKey,
  align = 'left',
  className = undefined,
  emptyCellPlaceholder = undefined,
  hoverableRows = false,
  isBorderless = false,
  isCompact = false,
  isStriped = false,
  isLoading = false,
  onSort = undefined,
  scroll = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
  useFixedWidthColumns = false,
}) => {
  const tableContainerClasses = classNames(
    styles.container,
    {
      [styles.scroll]: scroll?.x || scroll?.y,
      [styles['scroll-x']]: scroll?.x,
      [styles['scroll-y']]: scroll?.y,
    },
    className,
  );

  const tableContainerStyles = {
    ...scroll?.x && { maxWidth: `${scroll.x}px` },
    ...scroll?.y && { maxHeight: `${scroll.y}px` },
  };

  const tableClasses = classNames(
    styles.table,
    {
      [styles['fixed-width-columns']]: useFixedWidthColumns,
      [styles.striped]: isStriped,
      [styles.borderless]: isBorderless,
      [styles.compact]: isCompact,
    },
  );

  return (
    <div
      className={tableContainerClasses}
      style={tableContainerStyles}
      data-testid="tableContainerDiv-testid"
    >
      {isLoading && (
        <div className={styles['loading-mask']}>
          <Spinner size="xl" />
        </div>
      )}
      <table className={tableClasses}>
        <TableHead
          columns={columns}
          align={align}
          onSort={onSort}
          isBorderless={isBorderless}
          isCompact={isCompact}
          sortedColumn={sortedColumn}
          truncateOverflow={truncateOverflow}
          useFixedWidthColumns={useFixedWidthColumns}
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
          useFixedWidthColumns={useFixedWidthColumns}
        />
      </table>
    </div>
  );
};

export default Table;
