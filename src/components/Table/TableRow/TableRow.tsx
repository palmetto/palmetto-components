import React, { FC, ReactNode } from 'react';
import cx from 'classnames';
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
}) => (
  <tr>
    {
      data.map((columnContent, index) => (
        <td className={cx(styles['table-cell'], { [styles['truncate-overflow']]: truncateOverflow })} key={index}>
          {columnContent || emptyCellPlaceholder}
        </td>
      ))
    }
  </tr>
);

export default TableRow;
