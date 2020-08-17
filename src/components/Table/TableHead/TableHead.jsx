import React from 'react';
import TableHeaderSortable from './TableHeaderSortable/TableHeaderSortable';
import styles from './TableHead.module.scss';

export const TableHead = ({ 
  columns, 
  onSort, 
  sortedColumn, 
  loading,
}) => {
  const renderSortableColumn = column => (
    <TableHeaderSortable
      heading={column.heading}
      id={column.id}
      key={column.id}
      onSort={onSort}
      sortedColumn={sortedColumn}
      loading={loading}
      width={column.width}
    />
  );

  const renderFixedColumn = column => (
    <th
      className={styles.header}
      key={column.id}
      style={{ width: `${column.width}px` }}
    >
      {column.heading}
    </th>
  );

  return (
    <thead className={styles['table-head']}>
      <tr>
        {columns.map(column => (column.isSortable ? renderSortableColumn(column) : renderFixedColumn(column)))}
      </tr>
    </thead>
  );
};

export default TableHead;
