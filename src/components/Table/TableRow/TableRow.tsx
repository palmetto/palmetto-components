import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';
import { Column, Row } from '../TableTypes';
import getColumnKeys from '../../../lib/getColumnKeys';
import TableCell from '../TableCell/TableCell';

interface TableRowProps {
  /**
   * The table columns to be rendered
   */
  columns: Column[];
  /**
   * The unique key to identify a React node for each row.
   */
  rowIndex: number;
  /**
   * The table rows to be rendered
   */
  row: Row;
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
  row,
  rowIndex,
  className = '',
  emptyCellPlaceholder = '',
  isBorderless = false,
  isCompact = false,
  isHoverable = false,
  truncateOverflow = false,
  useFixedWidthColumns = false,
}) => {
  const tableRowClasses = classNames(
    styles['table-row'],
    { [styles.hoverable]: isHoverable },
    className,
  );

  return (
    <tr className={tableRowClasses}>
      {Object.values(columns).map((column, columnIndex) => (
        <TableCell
          emptyCellPlaceholder={column.emptyCellPlaceholder || emptyCellPlaceholder}
          truncateOverflow={column.truncateOverflow || truncateOverflow}
          key={getColumnKeys(columns)[columnIndex]}
          isBorderless={isBorderless}
          isCompact={isCompact}
          width={useFixedWidthColumns ? column.width : undefined}
        >
          {
            /* eslint-disable-next-line no-nested-ternary */
            column.render
              ? column.render((column.dataKey ? row[column.dataKey] : undefined), row, rowIndex)
              : (column.dataKey ? row[column.dataKey] : null)
          }
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow;
