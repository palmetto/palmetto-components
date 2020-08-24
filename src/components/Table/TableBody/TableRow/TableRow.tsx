import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';

interface TableRowProps {
  data: (string | number | ReactNode)[];
  id: string;
  emptyCellPlaceholder?: ReactNode;
  truncateOverflow?: boolean;
}

const TableRow: FC<TableRowProps> = ({
  data,
  id,
  emptyCellPlaceholder,
  truncateOverflow,
}) => {
  const tableCellClasses = classNames(
    styles['table-cell'],
    {
      [styles['truncate-overflow']]: truncateOverflow,
    },
  );

  return (
    <tr>
      {Object.values(data).map(cellContent => (
        <td
          className={tableCellClasses}
          key={`${id}${cellContent?.toString()}`}
        >
          {cellContent || emptyCellPlaceholder}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
