import React, { FC } from 'react';
import { ColumnType, SortedColumnType } from '../TableTypes';
import TableHeaderSortable from './TableHeaderSortable/TableHeaderSortable';
import styles from './TableHead.module.scss';

interface TableHeadProps {
  /**
   * Column configuration for the columns.
   */
  columns: ColumnType[];
  /**
   * Callback function to execute when a sortable column's header is clicked.
   */
  onSort?: (id: string) => void;
  /**
   * The current sorted column.
   */
  sortedColumn?: SortedColumnType;
}

const TableHead: FC<TableHeadProps> = ({
  columns,
  onSort = () => undefined,
  sortedColumn = undefined,
}) => {
  const renderSortableColumn = (column: ColumnType) => (
    <TableHeaderSortable
      heading={column.heading}
      id={column.id}
      key={column.id}
      onSort={onSort}
      sortedColumn={sortedColumn}
      width={column.width}
    />
  );

  const renderFixedColumn = (column: ColumnType) => (
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
