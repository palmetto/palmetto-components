import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';
import { Column, EventWithColumnKey, Row } from '../TableTypes';
import getColumnKeys from '../../../lib/getColumnKeys';
import TableCell from '../TableCell/TableCell';
import TableHeaderCell from '../TableHeaderCell/TableHeaderCell';

interface TableRowProps {
  /**
   * The table columns to be rendered
   */
  columns: Column[];
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
  /**
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
}

const TableRow: FC<TableRowProps> = ({
  columns,
  className = '',
  emptyCellPlaceholder = '',
  isBorderless = false,
  isCompact = false,
  isHoverable = false,
  isTableHead = false,
  onSort = undefined,
  sortedColumn = undefined,
  row = undefined,
  rowIndex = undefined,
  truncateOverflow = false,
  useFixedWidthColumns = false,
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

  return (
    <tr className={tableRowClasses}>
      {Object.values(columns).map((column, columnIndex) => (
        isTableHead ? (
          <TableHeaderCell
            column={column}
            key={getColumnKeys(columns)[columnIndex]}
            dataKey={column.dataKey}
            className={column.headerClassName}
            isSortable={column.isSortable}
            onSort={onSort}
            isBorderless={isBorderless}
            isCompact={isCompact}
            sortedColumn={sortedColumn}
            truncateOverflow={column.truncateOverflow || truncateOverflow}
            width={useFixedWidthColumns ? column.width : undefined}
          />
        ) : (
          <TableCell
            className={column.cellClassName}
            emptyCellPlaceholder={column.emptyCellPlaceholder || emptyCellPlaceholder}
            truncateOverflow={column.truncateOverflow || truncateOverflow}
            key={getColumnKeys(columns)[columnIndex]}
            isBorderless={isBorderless}
            isCompact={isCompact}
            width={useFixedWidthColumns ? column.width : undefined}
          >
            {renderCellContent(column)}
          </TableCell>
        )
      ))}
    </tr>
  );
};

export default TableRow;
