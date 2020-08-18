import React, { FC, ChangeEvent } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './TableHeaderSortable.module.scss';

interface Props {
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
  onSort: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * isLoading is used to disable clicking on a sortable table header while loading is in progress.
   */
  isLoading?: boolean;
  /**
   * The current sorted column.
   */
  sortedColumn?: {
    id: string;
    sortOrder: string;
  };
  /**
   * Width of the column, if using the `useFixedWidthColumns` prop is set to true.
   */
  width?: string;
}

const TableHeaderSortable: FC<Props> = ({
  heading,
  id,
  onSort,
  isLoading = false,
  sortedColumn = undefined,
  width = undefined,
}) => {
  const renderIcon = name => {
    const sortDirection = (sortedColumn && sortedColumn.id === id) ? sortedColumn.sortOrder : null;
    const renderUpDownArrows = () => (
      sortDirection === 'desc' ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />
    );

    return (
      <span>
        {sortDirection ? renderUpDownArrows() : <FontAwesomeIcon icon={faSort} />}
      </span>
    );
  };

  const handleKeyPress = e => {
    const enterKey = 13;
    const spaceKey = 32;

    if (e.keyCode === enterKey || e.keyCode === spaceKey) {
      onSort(id);
    }
  };

  const tableHeaderSortableClasses = classNames(
    styles.header,
    {
      [styles.disabled]: isLoading,
    },
  );

  return (
    <th
      className={tableHeaderSortableClasses}
      style={{ width: `${width}px` }}
      role="button"
      tabIndex={0}
      onClick={() => onSort(id)}
      onKeyDown={handleKeyPress}
    >
      {heading}
      {' '}
      {renderIcon(id)}
    </th>
  );
};

export default TableHeaderSortable;
