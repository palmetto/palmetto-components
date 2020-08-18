import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableRow.module.scss';

interface Props {
  data: (string | number | ReactNode)[];
  truncateOverflow?: boolean;
  emptyCellPlaceholder?: ReactNode;
}

const TableRow: FC<Props> = ({
  data,
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
      {
        Object.values(data).map(columnContent => (
          <td
            className={tableCellClasses}
            key={columnContent}
          >
            {columnContent || emptyCellPlaceholder}
          </td>
        ))
      }
    </tr>
  );
};

export default TableRow;
