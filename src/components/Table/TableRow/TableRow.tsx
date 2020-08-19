import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';

interface Props {
  data: (string | number | ReactNode)[];
  uniqueId: string;
  truncateOverflow?: boolean;
  emptyCellPlaceholder?: ReactNode;
}

const TableRow: FC<Props> = ({
  data,
  uniqueId,
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
    <tr key={uniqueId}>
      {Object.values(data).map(cellContent => (
        <td
          className={tableCellClasses}
          key={`${uniqueId}${cellContent?.toString()}`}
        >
          {cellContent || emptyCellPlaceholder}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
