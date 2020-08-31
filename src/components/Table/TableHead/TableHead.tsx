import React, { FC, Key } from 'react';
import classNames from 'classnames';
import { Column, EventWithColumnKey } from '../TableTypes';
import getColumnKeys from '../../../lib/getColumnKeys';
import TableHeaderCell from '../TableHeaderCell/TableHeaderCell';

interface TableHeadProps {
  /**
   * The table columns to be rendered
   */
  columns: Column[];
  /**
   * Custom class to be applied to the `<thead>` element.
   */
  className?: string;
  /**
   * Whether the table has borders or not.
   */
  isBorderless?: boolean;
  /**
   * Whether the table rows have smaller padding
   */
  isCompact?: boolean;
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

const TableHead: FC<TableHeadProps> = ({
  columns,
  className = '',
  isBorderless = false,
  isCompact = false,
  onSort = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
  useFixedWidthColumns = false,
}) => {
  const isColumnSorted = (columnDataKey: Key | undefined): boolean => (
    !!sortedColumn && sortedColumn.dataKey === columnDataKey
  );

  const tableHeadClasses = classNames(className);

  return (
    <thead className={tableHeadClasses}>
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
    </thead>
  );
};

export default TableHead;
