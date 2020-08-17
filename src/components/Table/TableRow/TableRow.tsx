import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './TableRow.module.scss';

interface Props {
  data: (string | number | ReactNode)[];
  truncateOverflow?: boolean;
  emptyCellPlaceholder?: ReactNode | string;
}

const TableRow: FC<Props> = ({
  data,
  truncateOverflow,
  emptyCellPlaceholder,
}) => {
  const renderEmptyCellPlaceholder = () => (
    <span>
      {emptyCellPlaceholder}
    </span>
  );

  return (
    <tr>
      {
        data.map((columnContent, index) => (
          <td className={cx(styles['table-cell'], { [styles['truncate-overflow']]: truncateOverflow })} key={index}>
            {columnContent || renderEmptyCellPlaceholder()}
          </td>
        ))
      }
    </tr>
  );
};

export default TableRow;
