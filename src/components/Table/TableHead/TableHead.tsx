import React, { FC, ChangeEvent } from 'react';
import { Column, SortedColumn } from '../types';
import TableHeaderSortable from './TableHeaderSortable/TableHeaderSortable';
import styles from './TableHead.module.scss';

interface Props {
  /**
   * Column configuration for the columns.
   */
  columns: Column[];
  /**
   * Callback function to execute when a sortable column's header is clicked.
   */
  onSort?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * The current sorted column.
   */
  sortedColumn?: SortedColumn;
}

const TableHead: FC<Props> = ({
  columns,
  onSort = undefined,
  sortedColumn = undefined,
}) => {
  const renderSortableColumn = column => (
    <TableHeaderSortable
      heading={column.heading}
      id={column.id}
      key={column.id}
      onSort={onSort}
      sortedColumn={sortedColumn}
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
