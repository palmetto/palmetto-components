import React from 'react';
import cx from 'classnames';
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa';

import styles from './TableHeaderSortable.module.scss';


export const TableHeaderSortable = ({ header, queryParam, sortedColumn, onSort, loading, width }) => {
  const renderIcon = (sortedColumnName, sortColumnOrder, name) => {
    const sortDirection = (sortedColumnName === name) ? sortColumnOrder : null;

    return (
      <span>
        {sortDirection ? (sortDirection === 'desc' ? <FaArrowDown/> : <FaArrowUp/>): <FaSort className={styles.sortIcon}/>}
      </span>
    );
  };

  const handleKeyPress = (e) => {
    const enterKey = 13;
    const spaceKey = 32;

    if (e.keyCode === enterKey || e.keyCode === spaceKey) {
      onSort(queryParam);
    }
  };

  return (
    <th
      className={ cx(styles.header, {[styles.disabled]: loading}) }
      style={{'width': `${width}px`}}
      role="button"
      tabIndex={0}
      onClick={() => onSort(queryParam)}
      onKeyDown={handleKeyPress}
    >
      {header} {renderIcon(sortedColumn.columnName, sortedColumn.sortOrder, queryParam)}
    </th>
  )
};

export default TableHeaderSortable;
