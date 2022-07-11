import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';
import { Column, EventWithColumnKey, Row } from '../../../../types';
import { getColumnKeys } from '../../../../lib/getColumnKeys';
import TableBodyCell from '../../TableBody/TableBodyCell/TableBodyCell';
import { TableHeaderCell } from '../../TableHead/TableHeaderCell/TableHeaderCell';

export interface TableRowProps {
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
   * Custom class to be applied to `<tr>` element.
   */
  className?: string;
  /**
   * A global placeholder for empty cells. Note: can be overwriten by
   * the same attribute passed for an individual column config object.
   */
  emptyCellPlaceholder?: string | number | undefined;
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
   * Determine whether row is hoverable
   */
  isHoverable?: boolean;
  /**
   * Whether the row is inside the table head (thead).
   */
  isTableHead?: boolean;
   /**
   * Callback function to fire on sorting one of the table headers.
   */
  onSort?: (event: EventWithColumnKey) => void;
  /**
   * The specific row to be rendered.
   */
  row?: Row;
  /**
   * The unique key to identify a React node for each row.
   */
  rowIndex?: number;
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

export const TableRow: FC<TableRowProps> = ({
  columns,
  align = 'left',
  className = '',
  emptyCellPlaceholder = '',
  isBorderless = false,
  isCompact = false,
  hasStickyHeader = false,
  isHoverable = false,
  isTableHead = false,
  onSort = undefined,
  sortedColumn = undefined,
  row = undefined,
  rowIndex = undefined,
  truncateOverflow = false,
}) => {
  const tableRowClasses = classNames(
    styles['table-row'],
    { [styles.hoverable]: isHoverable },
    className,
  );

  const renderCellContent = (column: Column):ReactNode => {
    if (column.render) {
      const cellValue = column.dataKey && row ? row[column.dataKey] : undefined;
      return column.render(cellValue, row, rowIndex);
    }

    return column.dataKey && row ? row[column.dataKey] : null;
  };

  const getCellClassName = (column: Column):string|undefined => {
    if (column.cellClassName) {
      if (typeof column.cellClassName === 'function') {
        return column.cellClassName(column, row, rowIndex);
      }
      return column.cellClassName;
    }
    return undefined;
  };

  return (
    <tr className={tableRowClasses}>
      {Object.values(columns).map((column, columnIndex) => (
        isTableHead ? (
          <TableHeaderCell
            column={column}
            align={column.align || align}
            key={getColumnKeys(columns)[columnIndex]}
            dataKey={column.dataKey}
            className={column.headerClassName}
            isSortable={column.isSortable}
            onSort={onSort}
            isBorderless={isBorderless}
            isCompact={isCompact}
            sortedColumn={sortedColumn}
            truncateOverflow={column.truncateOverflow || truncateOverflow}
            width={column.width}
            hasStickyHeader={hasStickyHeader}
            sticky={column.sticky}
          />
        ) : (
          <TableBodyCell
            align={column.align || align}
            className={getCellClassName(column)}
            emptyCellPlaceholder={column.emptyCellPlaceholder || emptyCellPlaceholder}
            truncateOverflow={column.truncateOverflow || truncateOverflow}
            key={getColumnKeys(columns)[columnIndex]}
            isBorderless={isBorderless}
            isCompact={isCompact}
            width={column.width}
            sticky={column.sticky}
          >
            {renderCellContent(column)}
          </TableBodyCell>
        )
      ))}
    </tr>
  );
};
