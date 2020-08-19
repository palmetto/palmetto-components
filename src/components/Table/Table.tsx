import React, { FC, ReactNode, ChangeEvent } from 'react';
import classNames from 'classnames';
import { Column, SortedColumn } from './types';
import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import Spinner from '../Spinner/Spinner';
import styles from './Table.module.scss';

interface Props {
  /**
   * Configuration for the columns.
   */
  columns: Column[];
  /**
   * Data to be displayed in the tbody.
   */
  tableData: ReactNode[][];
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * If a cell is missing data, populate it with custom content.
   */
  emptyCellPlaceholder?: ReactNode;
  /**
   * Enable a hover state on table rows.
   */
  hoverableRows?: boolean;
  /**
   * Remove borders around table, thead, tbody, td, etc.
   */
  isBorderless?: boolean;
   /**
   * Make Table more compact by cutting cell padding in half.
   */
  isCompact?: boolean;
  /**
   * Responsive tables allow tables to be scrolled horizontally with ease.
   * If table overruns horizontal width of container, allow for horizontal scrolling.
   */
  isResponsive?: boolean;
  /**
   * Adds zebra-striping to any table row within the table body.
   */
  isStriped?: boolean;
  /**
   * If data is loading....
   */
  isLoading?: boolean;
  /**
   * If loading failed....
   */
  loadingFailed?: boolean;
  /**
   * Callback function to execute when a sortable column's header is clicked.
   */
  onSort?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * The current sorted column.
   */
  sortedColumn?: SortedColumn;
  /**
   * If content overruns its cell's width, truncate the content, as opposed to wrapping it.
   */
  truncateOverflow?: boolean;
  /**
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
}

const Table: FC<Props> = ({
  columns,
  tableData,
  className = undefined,
  emptyCellPlaceholder = undefined,
  hoverableRows = false,
  isBorderless = false,
  isCompact = false,
  isResponsive = false,
  isStriped = false,
  isLoading = false,
  onSort = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
  useFixedWidthColumns = false,
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
      [styles.compact]: isCompact,
      [styles.hover]: hoverableRows,
    },
  );

  return (
    <div className={tableContainerClasses}>
      {isLoading
        && (
          <div className={styles['loading-mask']}>
            <Spinner size="xl" />
          </div>
        )}
      <table className={tableClasses}>
        <TableHead
          columns={columns}
          onSort={onSort}
          sortedColumn={sortedColumn}
          isLoading={isLoading}
        />
        <tbody>
          {
            tableData && tableData.map(row => (
              <TableRow
                key={row.id}
                data={row}
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
