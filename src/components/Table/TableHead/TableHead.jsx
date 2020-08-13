import React from 'react';
import TableHeaderSortable from './TableHeaderSortable/TableHeaderSortable';
import styles from './TableHead.module.scss';

export const TableHead = ({ 
  columns, 
  sortedColumn, 
  setNewSortedColumn, 
  loading, 
  setPage, 
  useSortedColumns 
}) => {
  const handleTableHeaderClick = clickedColumnName => {
    let direction;

    if (clickedColumnName !== sortedColumn.columnName) {
      direction = 'desc';
    } else {
      direction = (sortedColumn.sortOrder === 'desc') ? 'asc' : 'desc';
    }

    const newSortedColumn = {
      columnName: clickedColumnName,
      sortOrder: direction,
    };

    setNewSortedColumn(newSortedColumn);
    setPage(1);
  };

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
