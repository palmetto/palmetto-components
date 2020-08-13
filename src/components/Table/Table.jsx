import React from 'react';
import classNames from 'classnames';
import { Table as ReactBootstrapTable } from 'react-bootstrap';
import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import styles from './Table.module.scss';

const Table = ({
  columnConfig,
  tableData,
  className,
  loading,
  loadingFailed,
  useSortedColumns,
  setPage,
  setSortedColumn,
  sortedColumn,
  useFixedWidthColumns,
  truncateOverflow
}) => {
  const tableClasses = classNames(
    className,
    styles.table,
    {
      // [styles.fixedWidthColumns]: useFixedWidthColumns,
    },
  );

  return (
    <ReactBootstrapTable
      className={tableClasses}
      striped
      bordered
      responsive
    >
      <TableHead
        columns={columnConfig}
        sortedColumn={sortedColumn}
        setNewSortedColumn={setSortedColumn}
        setPage={setPage}
        loading={loading}
        useSortedColumns={useSortedColumns}
      />
      <tbody>
        {
          !loading
          && !loadingFailed
          && tableData
          && tableData.map((record, index) => (
            <TableRow
              key={index}
              data={record}
              truncateOverflow={truncateOverflow}
            />
          ))
        }
      </tbody>
    </ReactBootstrapTable>
  );
};

export default Table;
