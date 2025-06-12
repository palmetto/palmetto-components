import React, { FC, Key, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableBody.module.scss';
import { Column, Row } from '../../../types';
import { TableRow } from '../common/TableRow/TableRow';
import { Box } from '../../Box/Box';

export interface TableBodyProps {
  /**
   * The table columns to be rendered
   */
  columns: Column[];
  /**
   * The unique key to identify a React node for each row.
   */
  rowKey: Key;
  /**
   * The table rows to be rendered
   */
  rows: Row[];
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * A custom class to apply to the table body.
   */
  className?: string;
  /**
   * A global placeholder for empty cells. Note: can be overwriten by
   * the same attribute passed for an individual column config object.
   */
  emptyCellPlaceholder?: string | number | undefined;
  /**
   * Enable a hover state on table rows.
   */
  hoverableRows?: boolean;
  /**
   * Whether the table has borders or not.
   */
  isBorderless?: boolean;
  /**
   * Whether the table rows have smaller padding
   */
  isCompact?: boolean;
  /**
   * Whether the table rows have a striped pattern
   */
  isStriped?: boolean;
  /**
   * Truncate overflow inside column based on column width. Can be overwritten on specific columns,
   * by passing `truncateOverflow` value on a specific Column
   */
  truncateOverflow?: boolean;
  expandedRowRender?: (row: Row, rowIndex: number) => ReactNode;
  /**
   * Currently expanded row key
   */
  expandedRow?: React.Key;
  /**
   * Callback when row expand state changes
   */
  onExpandedRowChange?: (rowId: React.Key | undefined) => void;
  expandLabels?: {
    expand: string;
    collapse: string;
  };
  expandColumn?: Column;
  expandBoxProps?: Partial<React.ComponentProps<typeof Box>>;
}

export const TableBody: FC<TableBodyProps> = ({
  columns,
  rowKey,
  rows,
  align = 'left',
  className = '',
  emptyCellPlaceholder = '',
  hoverableRows = false,
  isBorderless = false,
  isCompact = false,
  isStriped = false,
  truncateOverflow = false,
  expandedRowRender,
  expandedRow,
  onExpandedRowChange,
  expandLabels = {
    expand: 'Show details',
    collapse: 'Hide details',
  },
  expandColumn,
  expandBoxProps = {},
}) => {
  const tableBodyClasses = classNames(
    styles['table-body'],
    {
      [styles.striped]: isStriped,
      [styles.hover]: hoverableRows,
    },
    className,
  );

  const handleExpand = (rowId: React.Key | undefined) => {
    onExpandedRowChange?.(rowId === expandedRow ? undefined : rowId);
  };

  return (
    <tbody className={tableBodyClasses}>
      {rows.map((row, rowIndex) => (
        <React.Fragment key={row[rowKey]}>
          <TableRow
            columns={[
              ...columns,
              expandedRowRender && expandColumn && {
                ...expandColumn,
                render: () => (
                  <Box
                    onClick={() => handleExpand(row[rowKey] as React.Key)}
                    {...expandBoxProps}
                  >
                    {expandedRow === row[rowKey]
                      ? expandLabels.collapse
                      : expandLabels.expand}
                  </Box>
                ),
              },
            ].filter((column): column is Column => Boolean(column))}
            row={row}
            rowIndex={rowIndex}
            align={align}
            emptyCellPlaceholder={emptyCellPlaceholder}
            truncateOverflow={truncateOverflow}
            isBorderless={isBorderless}
            isCompact={isCompact}
          />
          {expandedRowRender && expandedRow === row[rowKey] && (
            <tr>
              <td colSpan={columns.length + 1}>
                {expandedRowRender(row, rowIndex)}
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );
};
