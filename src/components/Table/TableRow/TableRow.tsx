import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';

interface TableRowProps {
  /**
   * Children node to be rendered.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to `<tr>` element.
   */
  className?: string;
  /**
   * Determine whether row is hoverable
   */
  isHoverable?: boolean;
}

const TableRow: FC<TableRowProps> = ({
  children = null,
  className = '',
  isHoverable = false,
}) => {
  const tableRowClasses = classNames(
    styles['table-row'],
    { [styles.hoverable]: isHoverable },
    className,
  );

  return <tr className={tableRowClasses}>{children}</tr>;
};

export default TableRow;
