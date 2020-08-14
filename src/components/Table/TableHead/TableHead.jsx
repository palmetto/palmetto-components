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
      header={column.name}
      queryParam={column.apiKey}
      onSort={onSort}
      sortedColumn={sortedColumn}
      loading={loading}
      width={column.width}
    />
  );

  const renderFixedColumn = column => (
    <th
      className={styles.header}
      key={column.name}
      style={{ width: `${column.width}px` }}
    >
      {column.name}
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
