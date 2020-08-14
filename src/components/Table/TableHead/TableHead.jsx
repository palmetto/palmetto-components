import React from 'react';
import TableHeaderSortable from './TableHeaderSortable/TableHeaderSortable';
import styles from './TableHead.module.scss';

export const TableHead = ({ 
  columns, 
  sortedColumn, 
  onSort, 
  loading,
  setPage,
}) => {
  const renderSortableColumns = () => (
    columns.map(column => (
      <TableHeaderSortable
        header={column.name}
        queryParam={column.apiKey}
        sortedColumn={sortedColumn}
        onSort={handleTableHeaderClick}
        loading={loading}
        width={column.width}
      />
    ))
  );

  const renderFixedColumns = () => (
    columns.map(column => <th className={styles.header} key={column.name} style={{ width: `${column.width}px` }}>{column.name}</th>)
  );

  return (
    <thead className={styles['table-head']}>
      <tr>
        {
          useSortedColumns
            ? renderSortableColumns()
            : renderFixedColumns()
        }
      </tr>
    </thead>
  );
};

export default TableHead;
