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
  onSort,
  sortedColumn,
  useFixedWidthColumns,
  truncateOverflow,
  emptyCellPlaceholder,
  isStriped,
  isBorderless,
  isResponsive,
  useLessPadding,
  hover,

}) => {
  const tableContainerClasses = classNames(
    styles.container,
    className,
    {
      [styles.responsive]: isResponsive,
    },
  );
  const tableClasses = classNames(
    styles.table,
    {
      [styles['fixed-width-columns']]: useFixedWidthColumns,
      [styles.striped]: isStriped,
      [styles.borderless]: isBorderless,
      [styles['less-padding']]: useLessPadding,
      [styles.hover]: hover,
    },
  );

  return (
    <div className={tableContainerClasses}>
      <table className={tableClasses}>
        <TableHead
          columns={columnConfig}
          loading={loading}
          onSort={onSort}
          sortedColumn={sortedColumn}
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
