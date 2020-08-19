import React, { FC, ReactNode, ChangeEvent } from 'react';
import classNames from 'classnames';
import { SortedColumn } from './types';
import Spinner from '../Spinner/Spinner';
import styles from './Table.module.scss';

interface TableProps {
  /**
   * Data to be displayed in the tbody.
   */
  tableData: ReactNode[][];
  /**
   * Additional classes to add.
   */
  className?: string;
  /**
   * The children components to render inside the table
   */
  children?: ReactNode;
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
   * Fix the width of the columns. Can be useful if sorting is enabled and the content of
   * the columns is changing; prevents the horizontal jump when this occurres.
   */
  useFixedWidthColumns?: boolean;
}

const Table: FC<TableProps> = ({
  className = undefined,
  children = null,
  hoverableRows = false,
  isBorderless = false,
  isCompact = false,
  isResponsive = false,
  isStriped = false,
  isLoading = false,
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
      {isLoading && (
        <div className={styles['loading-mask']}>
          <Spinner size="xl" />
        </div>
      )}
      <table className={tableClasses}>
        {children}
      </table>
    </div>
  );
};

export default Table;
