import React, { FC, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { SortedColumnType } from '../../TableTypes';
import styles from './TableHeaderSortable.module.scss';

interface TableHeaderSortableProps {
  /**
   * Heading to display for the column.
   */
  heading: string;
   /**
   * Id for the column.
   */
  id: string;
   /**
   * Callback function to execute when a sortable column's header is clicked.
   */
  onSort: (id: string) => void;
  /**
   * The current sorted column.
   */
  sortedColumn?: SortedColumnType;
  /**
   * Width of the column, if using the `useFixedWidthColumns` prop is set to true.
   */
  width?: string;
}

const TableHeaderSortable: FC<TableHeaderSortableProps> = ({
  heading,
  id,
  onSort,
  sortedColumn = undefined,
  width = undefined,
}) => {
  const renderIcon = () => {
    const sortDirection = (sortedColumn && sortedColumn.id === id) ? sortedColumn.sortOrder : null;
    const renderUpDownArrows = () => (
      sortDirection === 'desc'
        ? <FontAwesomeIcon icon={faArrowDown} data-testid="arrowDown-testid" />
        : <FontAwesomeIcon icon={faArrowUp} data-testid="arrowUp-testid" />
    );

    return (
      <span>
        {sortDirection ? renderUpDownArrows() : <FontAwesomeIcon icon={faSort} data-testid="sort-testid" />}
      </span>
    );
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLTableHeaderCellElement>): void => {
    const enterKey = 13;
    const spaceKey = 32;

    if (event.keyCode === enterKey || event.keyCode === spaceKey) {
      onSort(id);
    }
  };

  return (
    <th
      className={styles.header}
      style={{ width: `${width}px` }}
      role="button"
      tabIndex={0}
      onClick={() => onSort(id)}
      onKeyDown={handleKeyPress}
    >
      {heading}
      {' '}
      {renderIcon()}
    </th>
  );
};

export default TableHeaderSortable;
