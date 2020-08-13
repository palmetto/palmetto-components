import React from 'react';
import classNames from 'classnames';
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
  truncateOverflow,
  emptyCellPlaceholder,
  isStriped,
  isBordered,
  isResponsive,
}) => {
  const tableContainerClasses = classNames(
    className,
    {
      [styles.responsive]: isResponsive,
    },
  );
  const tableClasses = classNames(
    styles.table,
    {
      [styles.fixedWidthColumns]: useFixedWidthColumns,
      [styles.striped]: isStriped,
      [styles.bordered]: isBordered,
    },
  );

  return (
    <div className={tableContainerClasses}>
      <table className={tableClasses}>
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
                emptyCellPlaceholder={emptyCellPlaceholder}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Table;
