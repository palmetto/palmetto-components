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
import { EventWithColumnKey } from '../types';
import styles from './TableHeaderCell.module.scss';

interface TableHeaderCellProps {
  /**
   * Title to display for the column.
   */
  children?: ReactNode;
  /**
   * Custom class to apply to the `<th>` element.
   */
  className?: string | undefined;
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
   * The current sorted column.
   */
  sortDirection?: 'ascending' | 'descending' | 'none';
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
  children = null,
  className = undefined,
  dataKey = undefined,
  isBorderless = false,
  isCompact = false,
  isSortable = false,
  onSort = undefined,
  sortDirection = 'none',
  truncateOverflow = false,
  width = undefined,
}) => {
  const renderIcon = () => {
    const renderArrows = ():ReactNode => {
      if (sortDirection === 'ascending') {
        return <FontAwesomeIcon icon={faSortUp} data-testid="tableHeaderCellSortAsc-testid" />;
      }
      if (sortDirection === 'descending') {
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
    },
    className,
  );

  return (
    <th
      className={tableHeaderClasses}
      style={{ ...width && { width: `${width}px`, maxWidth: `${width}px` } }}
      aria-sort={sortDirection}
      tabIndex={0}
      onClick={handleSort}
      onKeyDown={handleKeyPress}
    >
      {children}
      {isSortable && renderIcon()}
    </th>
  );
};

export default TableHeaderCell;
