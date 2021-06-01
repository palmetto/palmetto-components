import React, { FC } from 'react';
import classNames from 'classnames';
import { Column, EventWithColumnKey } from '../../../types';
import { TableRow } from '../common/TableRow/TableRow';

export interface TableHeadProps {
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
   * If table scrolls vertically, header will remain stuck to the top of the table, and not scroll away.
   */
  hasStickyHeader?: boolean;
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
}

export const TableHead: FC<TableHeadProps> = ({
  columns,
  align = 'left',
  className = '',
  isBorderless = false,
  isCompact = false,
  hasStickyHeader = false,
  onSort = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
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
        hasStickyHeader={hasStickyHeader}
      />
    </thead>
  );
};
