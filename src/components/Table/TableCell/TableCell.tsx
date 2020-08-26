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
  isCompact?: boolean;
  truncateOverflow?: boolean;
  emptyCellPlaceholder?: ReactNode;
}

const TableCell: FC<TableCellProps> = ({
  children = null,
  className = '',
  emptyCellPlaceholder = null,
  isCompact = false,
  truncateOverflow = false,
}) => {
  const tableCellClasses = classNames(
    styles['table-cell'],
    {
      [styles.compact]: isCompact,
      [styles['truncate-overflow']]: truncateOverflow,
    },
    className,
  );

  return (
    <td className={tableCellClasses}>
      {children || emptyCellPlaceholder}
    </td>
  );
};

export default TableCell;
