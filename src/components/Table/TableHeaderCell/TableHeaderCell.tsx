import React, {
  FC,
  Key,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { Column, EventWithColumnKey } from '../../../types';
import styles from './TableHeaderCell.module.scss';

interface TableHeaderCellProps {
  /**
   * Title to display for the column.
   */
  column: Column;
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Custom class to apply to the `<th>` element.
   */
  className?: string;
  /**
   * Column is fixed to left-hand side of table.
   */
  columnIsSticky?: boolean;
  /**
   * Key of corresponding data value in the table.
   */
  dataKey?: Key;
  /**
   * Remove borders around th elements.
   */
  isBorderless?: boolean;
  /**
   * Determines if table header cells should render as compact (less padding);
   */
  isCompact?: boolean;
  /**
   * Boolean to mark if a column is sortable. This will show the sorting icons. Use
   * in conjunction with the `sortDirection` prop to determine which icon is shown.
   */
  isSortable?: boolean;
  /**
   * Callback function to execute when a sortable column's header is clicked.
   * Column can be sorted without providing an onSort method, it means that the arrows
   * will not be clickable, but they will still represent the sort state
   * of a column as determined by the `sortDirection` prop.
   */
  onSort?: (event: EventWithColumnKey) => void;
  /**
   * The key of the sorted column and its sort direction.
   */
  sortedColumn?: {
    dataKey: string | undefined;
    sortDirection: 'none' | 'ascending' | 'descending' | undefined;
  };
  /**
   * Whether the text should be cut off with ellipsis if it exceeds the width of the column.
   */
  truncateOverflow?: boolean;
  /**
   * Width of the column, if using the `useFixedWidthColumns` prop is set to true.
   */
  width?: number;
}

const TableHeaderCell: FC<TableHeaderCellProps> = ({
  column,
  align = 'left',
  className = undefined,
  columnIsSticky = false,
  dataKey = undefined,
  isBorderless = false,
  isCompact = false,
  isSortable = false,
  onSort = undefined,
  sortedColumn = undefined,
  truncateOverflow = false,
  width = undefined,
}) => {
  const isColumnSorted = (columnDataKey: Key | undefined): boolean => (
    !!sortedColumn && sortedColumn.dataKey === columnDataKey
  );

  const getSortDirection = (): ('ascending' | 'descending' | 'none' | undefined) => (
    sortedColumn && isColumnSorted(column.dataKey) ? sortedColumn.sortDirection : 'none'
  );

  const renderIcon = (): ReactNode => {
    const renderArrows = (): ReactNode => {
      if (getSortDirection() === 'ascending') {
        return <FontAwesomeIcon icon={faSortUp} data-testid="tableHeaderCellSortAsc-testid" />;
      }
      if (getSortDirection() === 'descending') {
        return <FontAwesomeIcon icon={faSortDown} data-testid="tableHeaderCellSortDesc-testid" />;
      }

      return <FontAwesomeIcon icon={faSort} data-testid="tableHeaderCellSortNone-testid" />;
    };

    return (
      <span className={styles['sort-icon']}>
        {renderArrows()}
      </span>
    );
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTableHeaderCellElement>): void => {
    if (!onSort || !isSortable) return;

    const enterKey = 13;
    const spaceKey = 32;

    if (event.keyCode === enterKey || event.keyCode === spaceKey) {
      const eventWithKey: EventWithColumnKey = { ...event, sortedKey: dataKey };
      onSort(eventWithKey);
    }
  };

  const handleSort = (event: MouseEvent<HTMLTableHeaderCellElement>): void => {
    if (!onSort || !isSortable) return;

    const eventWithKey: EventWithColumnKey = { ...event, sortedKey: dataKey };
    onSort(eventWithKey);
  };

  const tableHeaderClasses = classNames(
    styles['table-header-cell'],
    {
      [styles.sortable]: isSortable,
      [styles.borderless]: isBorderless,
      [styles.truncated]: truncateOverflow,
      [styles.compact]: isCompact,
      [styles.sticky]: columnIsSticky,
      [styles['align-right']]: align === 'right',
      [styles['align-center']]: align === 'center',
    },
    className,
  );

  return (
    <th
      className={tableHeaderClasses}
      style={{ width: `${width}px` }}
      aria-sort={sortedColumn && isColumnSorted(column.dataKey) ? sortedColumn.sortDirection : 'none'}
      tabIndex={isSortable ? 0 : undefined}
      onClick={handleSort}
      onKeyDown={handleKeyPress}
    >
      <div className={styles.heading}>
        {column.heading}
        {isSortable && renderIcon()}
      </div>
    </th>
  );
};

export default TableHeaderCell;
