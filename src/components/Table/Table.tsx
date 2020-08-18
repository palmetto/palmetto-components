import React, { FC, ReactNode, ChangeEvent } from 'react';
import classNames from 'classnames';
import TableHead from './TableHead/TableHead';
import TableRow from './TableRow/TableRow';
import Spinner from '../Spinner/Spinner';
import styles from './Table.module.scss';

interface Props {
  /**
   * Configuration for the columns.
   */
  columnConfig: {
    heading: string;
    id: string;
    isSortable?: boolean;
    width?: string;
  }[];
  /**
   * Data to be displayed in the tbody.
   */
  tableData: any[][]; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * If a cell is missing data, populate it with custom content.
   */
  emptyCellPlaceholder?: string | ReactNode;
  /**
   * Enable a hover state on table rows.
   */
  hoverableRows?: boolean;
  /**
   * Remove borders around table, thead, tbody, td, etc.
   */
  isBorderless?: boolean;
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
  sortedColumn?: {
    id: string;
    sortOrder: string;
  };
  /**
   * If content overruns its cell's width, truncate the content, as opposed to wrapping it.
   */
  truncateOverflow?: boolean;
  /**
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
  /**
   * Make Table more compact by cutting cell padding in half.
   */
  useLessPadding?: boolean;
}

const Table: FC<Props> = ({
  columnConfig,
  tableData,
  className = undefined,
  emptyCellPlaceholder = undefined,
  hoverableRows = false,
  isBorderless = false,
  isResponsive = false,
  isStriped = false,
  isLoading = false,
  onSort = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
  useFixedWidthColumns = false,
  useLessPadding = false,
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
          columns={columnConfig}
          onSort={onSort}
          sortedColumn={sortedColumn}
        />
        <tbody>
          {
            tableData && tableData.map((record, index) => (
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
