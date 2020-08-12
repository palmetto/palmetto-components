import React from 'react';
import PropTypes from 'prop-types';

import TableHeaderSortable from 'components/common/TableHeaderSortable/TableHeaderSortable';

import styles from './TableHead.module.scss';

export const TableHead = ({ columns, sortedColumn, setNewSortedColumn, loading, setPage, useSortedColumns }) => {
  const handleTableHeaderClick = (clickedColumnName) => {
    let direction;

    if (clickedColumnName !== sortedColumn.columnName) {
      direction = 'desc';
    } else {
      direction = (sortedColumn.sortOrder === 'desc') ? 'asc' : 'desc';
    }

    const newSortedColumn = {
      columnName: clickedColumnName,
      sortOrder: direction
    }

    setNewSortedColumn(newSortedColumn);
    setPage(1);
  }

  const renderSortableColumns = () => (
    columns.map((column) => (
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
    columns.map((column) => <th className={styles.header} key={column.name} style={{'width': `${column.width}px`}}>{column.name}</th>)
  );

  return (
    <thead className={styles.tableHead}>
      <tr>
        {useSortedColumns
          ? renderSortableColumns()
          : renderFixedColumns()
        }
      </tr>
    </thead>
  )
};

TableHead.defaultProps = {
  sortedColumn: null,
  setNewSortedColumn: null,
  loading: null,
  setPage: null,
  useSortedColumns: null
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    apiKey: PropTypes.string,
    width: PropTypes.string
  })).isRequired,
  sortedColumn: PropTypes.shape({
    columnName: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired
  }),
  setNewSortedColumn: PropTypes.func,
  loading: PropTypes.bool,
  setPage: PropTypes.func,
  useSortedColumns: PropTypes.bool
};

export default TableHead;
