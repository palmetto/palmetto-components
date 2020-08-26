import React, { FC, Key, ReactNode } from 'react';
import classNames from 'classnames';
import { Column, Row, EventWithColumnKey } from './types';
import getColumnKeys from '../../lib/getColumnKeys';
import Spinner from '../Spinner/Spinner';
import styles from './Table.module.scss';
import TableBody from './TableBody/TableBody';
import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import TableHeaderCell from './TableHeaderCell/TableHeaderCell';
import TableCell from './TableCell/TableCell';

interface TableProps {
  /**
   * Columns for the table
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
   * Additional classes to add to the table container
   */
  className?: string;
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
   * Responsive tables allow tables to be scrolled horizontally with ease.
   * If table overruns horizontal width of container, allow for horizontal scrolling.
   */
  isResponsive?: boolean;
  /**
   * Adds zebra-striping to any table row within the table body.
   */
  isStriped?: boolean;
  /**
   * Set to true if data is loading.
   */
  isLoading?: boolean;
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
   * The key of the sorted column and its sort direction.
   */
  scroll?: {
    x: number | undefined;
    y: number | undefined;
  };
  /**
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
  /**
   * Truncate overflow inside column based on column width. Can be overwritten on specific columns,
   * by passing `truncateOverflow` value on a specific Column
   */
  truncateOverflow?: boolean;
}

const Table: FC<TableProps> = ({
  className = undefined,
  columns,
  rows,
  rowKey,
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
      [styles.hover]: hoverableRows,
    },
  );

  const isColumnSorted = (columnDataKey: Key): boolean => (
    !!sortedColumn && sortedColumn.dataKey === columnDataKey
  );

  const renderColumnHeaders = (): ReactNode => (
    <>
      {Object.values(columns).map((column, columnIndex) => (
        <TableHeaderCell
          key={getColumnKeys(columns)[columnIndex]}
          dataKey={column.dataKey}
          className={column.className}
          isSortable={column.isSortable}
          onSort={onSort}
          isBorderless={isBorderless}
          isCompact={isCompact}
          sortDirection={sortedColumn && isColumnSorted(column.dataKey) ? sortedColumn.sortDirection : 'none'}
          truncateOverflow={column.truncateOverflow || truncateOverflow}
          width={useFixedWidthColumns ? column.width : undefined}
        >
          {column.title}
        </TableHeaderCell>
      ))}
    </>
  );

  const renderTableRows = (): ReactNode => (
    <>
      {rows.map(row => (
        <TableRow key={row[rowKey]}>
          {Object.values(columns).map((column, columnIndex) => (
            <TableCell
              truncateOverflow={column.truncateOverflow || truncateOverflow}
              key={getColumnKeys(columns)[columnIndex]}
              isBorderless={isBorderless}
              isCompact={isCompact}
            >
              {
                column.render
                  ? column.render(column.dataKey ? row[column.dataKey] : undefined)
                  : row[column.dataKey]
              }
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  return (
    <div
      className={tableContainerClasses}
      style={tableContainerStyles}
    >
      {isLoading && (
        <div className={styles['loading-mask']}>
          <Spinner size="xl" />
        </div>
      )}
      <table className={tableClasses}>
        <TableHead>
          <TableRow>
            {renderColumnHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableRows()}
        </TableBody>
      </table>
    </div>
  );
};

export default Table;
