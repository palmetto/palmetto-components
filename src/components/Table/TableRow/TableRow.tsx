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
  // truncateOverflow?: boolean;
  // emptyCellPlaceholder?: ReactNode;
}

const TableRow: FC<TableRowProps> = ({
  children = null,
  className = '',
}) => {
  // const tableCellClasses = classNames(
  //   styles['table-cell'],
  //   {
  //     [styles['truncate-overflow']]: truncateOverflow,
  //   },
  // );
  const tableRowClasses = classNames(className);

  return <tr className={tableRowClasses}>{children}</tr>;
  // <td
  //   className={tableCellClasses}
  //   key={`${id}${cellContent?.toString()}`}
  // >
  //   {cellContent || emptyCellPlaceholder}
  // </td>
};

export default TableRow;
