import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './TableRow.module.scss';


export const TableRow = ({ data, truncateOverflow }) => {
  const NotApplicable = () => <span className={styles.notApplicable}>N/A</span>;

  return (
    <tr>
      {data.map((columnContent, index) => (
          <td className={cx(styles.tableCell, {[styles.truncateOverflow]: truncateOverflow })} key={index}>
            {columnContent || <NotApplicable/>}
          </td>
        )
      )}
    </tr>
  );
}

TableRow.defaultProps = {
  truncateOverflow : null
}

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  truncateOverflow: PropTypes.bool
};

export default TableRow;
