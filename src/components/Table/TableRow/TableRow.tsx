import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface TableRowProps {
  /**
   * Children node to be rendered.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to `<tr>` element.
   */
  className?: string;
}

const TableRow: FC<TableRowProps> = ({
  children = null,
  className = '',
}) => {
  const tableRowClasses = classNames(className);

  return <tr className={tableRowClasses}>{children}</tr>;
};

export default TableRow;
