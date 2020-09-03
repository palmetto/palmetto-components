import React, { FC } from 'react';
import classNames from 'classnames';
import { Column, EventWithColumnKey } from '../TableTypes';
import TableRow from '../TableRow/TableRow';

interface TableHeadProps {
  /**
   * The table columns to be rendered
   */
  columns: Column[];
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
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
  align = 'left',
  className = '',
  isBorderless = false,
  isCompact = false,
  onSort = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
  useFixedWidthColumns = false,
}) => {
  const tableHeadClasses = classNames(className);

  return (
    <thead className={tableHeadClasses}>
      <TableRow
        columns={columns}
        align={align}
        isTableHead
        isBorderless={isBorderless}
        isCompact={isCompact}
        onSort={onSort}
        sortedColumn={sortedColumn}
        truncateOverflow={truncateOverflow}
        useFixedWidthColumns={useFixedWidthColumns}
      />
    </thead>
  );
};

export default TableHead;
