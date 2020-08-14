import React from 'react';
import classNames from 'classnames';
import styles from './TableHeaderSortable.module.scss';

export const TableHeaderSortable = ({
  header,
  queryParam,
  sortedColumn,
  onSort,
  loading,
  width
}) => {
  const renderIcon = name => {
    console.log(sortedColumn);
    console.log(name);
    const sortDirection = (sortedColumn && sortedColumn.columnName === queryParam) ? sortedColumn.sortOrder : null;
    console.log(sortDirection);

    return (
      <span>
        {sortDirection ? (sortDirection === 'desc' ? 'down' : 'up'): 'sort'}
      </span>
    );
  };

  const handleKeyPress = e => {
    const enterKey = 13;
    const spaceKey = 32;

    if (e.keyCode === enterKey || e.keyCode === spaceKey) {
      onSort(queryParam);
    }
  };

  const tableHeaderSortableClasses = classNames(
    styles.header,
    {
      [styles.disabled]: loading,
    },
  );

  return (
    <th
      className={tableHeaderSortableClasses}
      style={{ width: `${width}px` }}
      role="button"
      tabIndex={0}
      onClick={() => onSort(queryParam)}
      onKeyDown={handleKeyPress}
    >
      {header}
      {renderIcon(queryParam)}
    </th>
  );
};

export default TableHeaderSortable;
