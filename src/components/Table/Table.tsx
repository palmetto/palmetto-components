import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Column, Row } from './types';
import getColumnKeys from '../../lib/getColumnKeys';
import Spinner from '../Spinner/Spinner';
import styles from './Table.module.scss';
import TableBody from './TableBody/TableBody';
import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import TableHeaderSortable from './TableHeaderSortable/TableHeaderSortable';
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
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
  /**
   * Truncate overflow inside column based on column width. Can be overwritten on specific columns,
   * by passing `truncateOverflow` value on a specific <Column>
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
  isResponsive = false,
  isStriped = false,
  isLoading = false,
  truncateOverflow = false,
  useFixedWidthColumns = false,
}) => {
  const tableContainerClasses = classNames(
    styles.container,
    className,
    {
      [styles.responsive]: isResponsive,
    },
  );

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

  const renderColumnHeaders = (): ReactNode => (
    <>
      {Object.values(columns).map((column, columnIndex) => (
        <TableCell
          key={getColumnKeys(columns)[columnIndex]}
          className={column.className}
          truncateOverflow={column.truncateOverflow || truncateOverflow}
        >
          {column.title}
        </TableCell>
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
            >
              {row[column.dataKey] || column.render(row[column.dataKey])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  return (
    <div className={tableContainerClasses}>
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
