import React from 'react';
import cx from 'classnames';
import styles from './TableRow.module.scss';

export const TableRow = ({ data, truncateOverflow, emptyCellPlaceholder }) => {
  const NotApplicable = () => (
    <span className={styles.notApplicable}>
      {emptyCellPlaceholder}
    </span>
  );

  return (
    <tr>
      {
        data.map((columnContent, index) => (
          <td className={cx(styles['table-cell'], { [styles['truncate-overflow']]: truncateOverflow })} key={index}>
            {columnContent || <NotApplicable />}
          </td>
        ))
      }
    </tr>
  );
};

export default TableRow;
