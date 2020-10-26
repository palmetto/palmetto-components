import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableCell.module.scss';

interface TableCellProps {
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Children node to be rendered.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to `<tr>` element.
   */
  className?: string;
  /**
   * Remove borders around td elements.
   */
  isBorderless?: boolean;
  /**
   * Reduces padding inside table cells.
   */
  isCompact?: boolean;
  /**
   * Will stick to left side of table during horizontal scroll.
   */
  isColumnSticky?: boolean;
  /**
   * Truncates the cell contents based on width established by `Column`
   * NOTE: Truncate only on cells with primitive data types.
   */
  truncateOverflow?: boolean;
  /**
   * Placeholder for an empty cell, will be rendered when content is `null` `undefined`
   * or `''`. Placeholders will not be rendered on values of `0`.
   */
  emptyCellPlaceholder?: ReactNode;
  /**
   * Fixed width for a particular cell.
   * Value should be taken from column config so it matches its parent.
   */
  width?: number;
}

const TableCell: FC<TableCellProps> = ({
  align = 'left',
  children = null,
  className = '',
  emptyCellPlaceholder = null,
  isBorderless = false,
  isCompact = false,
  isColumnSticky = false,
  truncateOverflow = false,
  width = undefined,
}) => {
  const tableCellClasses = classNames(
    styles['table-cell'],
    {
      [styles.compact]: isCompact,
      [styles.borderless]: isBorderless,
      [styles.truncated]: truncateOverflow,
      [styles.sticky]: isColumnSticky,
      [styles['align-right']]: align === 'right',
      [styles['align-center']]: align === 'center',
    },
    className,
  );

  return (
    <>
      {isColumnSticky
        ? (
          <th
            className={tableCellClasses}
            style={{ ...width && { minWidth: `${width}px`, maxWidth: `${width}px` } }}
          >
            {(children === null || typeof children === 'undefined' || children === '') ? emptyCellPlaceholder : children}
          </th>
        ) : (
          <td
            className={tableCellClasses}
            style={{ ...width && { minWidth: `${width}px`, maxWidth: `${width}px` } }}
          >
            {(children === null || typeof children === 'undefined' || children === '') ? emptyCellPlaceholder : children}
          </td>
        )
      }
    </>
  );
};

export default TableCell;
