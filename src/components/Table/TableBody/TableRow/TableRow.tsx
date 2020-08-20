import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';

interface TableRowProps {
  data: (string | number | ReactNode)[];
  id: string;
  truncateOverflow?: boolean;
  emptyCellPlaceholder?: ReactNode;
}

const TableRow: FC<TableRowProps> = ({
  data,
  id,
  truncateOverflow,
  emptyCellPlaceholder,
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
