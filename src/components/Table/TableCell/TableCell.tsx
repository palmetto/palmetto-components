import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableCell.module.scss';

interface TableCellProps {
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
  isCompact?: boolean;
  truncateOverflow?: boolean;
  emptyCellPlaceholder?: ReactNode;
  width?: number;
}

const TableCell: FC<TableCellProps> = ({
  children = null,
  className = '',
  emptyCellPlaceholder = null,
  isBorderless = false,
  isCompact = false,
  truncateOverflow = false,
  width = undefined,
}) => {
  const tableCellClasses = classNames(
    styles['table-cell'],
    {
      [styles.compact]: isCompact,
      [styles.borderless]: isBorderless,
      [styles.truncated]: truncateOverflow,
    },
    className,
  );

  return (
    <td
      className={tableCellClasses}
      style={{ ...width && { width: `${width}px`, maxWidth: `${width}px` } }}
    >
      {(children === null || typeof children === 'undefined' || children === '') ? emptyCellPlaceholder : children}
    </td>
  );
};

export default TableCell;
