import React from 'react';
import classNames from 'classnames';
import styles from './TableHeaderSortable.module.scss';

export const TableHeaderSortable = ({
  heading,
  id,
  sortedColumn,
  onSort,
  loading,
  width
}) => {
  const renderIcon = name => {
    console.log(sortedColumn);
    console.log(name);
    const sortDirection = (sortedColumn && sortedColumn.id === id) ? sortedColumn.sortOrder : null;
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
      onSort(id);
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
      onClick={() => onSort(id)}
      onKeyDown={handleKeyPress}
    >
      {heading}
      {renderIcon(id)}
    </th>
  );
};

export default TableHeaderSortable;
