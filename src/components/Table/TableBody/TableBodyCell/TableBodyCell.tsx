import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box } from '../../../Box/Box';
import * as TableConstants from '../../constants';
import styles from './TableBodyCell.module.scss';

export interface TableBodyCellProps {
  /**
   * Text alignment for all table cells. Can be superseded by passing the same prop into the `Column` object
   * for a specific column.
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Children node to be rendered.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to `<tr>` element.
   */
  className?: string;
  /**
   * Remove borders around td elements.
   */
  isBorderless?: boolean;
  /**
   * Reduces padding inside table cells.
   */
  isCompact?: boolean;
  /**
   * Will stick to either the left or right side of a table during horizontal scroll.
   */
  sticky?: 'left' | 'right';
  /**
   * Truncates the cell contents based on width established by `Column`
   * NOTE: Truncate only on cells with primitive data types.
   */
  truncateOverflow?: boolean;
  /**
   * Placeholder for an empty cell, will be rendered when content is `null` `undefined`
   * or `''`. Placeholders will not be rendered on values of `0`.
   */
  emptyCellPlaceholder?: ReactNode;
  /**
   * Fixed width for a particular cell.
   * Value should be taken from column config so it matches its parent.
   */
  width?: number;
}

const TableBodyCell: FC<TableBodyCellProps> = ({
  align = 'left',
  children = null,
  className = '',
  emptyCellPlaceholder = null,
  isBorderless = false,
  isCompact = false,
  sticky = undefined,
  truncateOverflow = false,
  width = undefined,
}) => {
  const columnIsSticky = sticky === 'left' || sticky === 'right';
  const tableCellClasses = classNames(
    styles['table-cell'],
    {
      [styles.truncated]: truncateOverflow,
      [styles['sticky-column']]: columnIsSticky,
      [styles['sticky-column-left']]: sticky === 'left',
      [styles['sticky-column-right']]: sticky === 'right',
      [styles['align-right']]: align === 'right',
      [styles['align-center']]: align === 'center',
    },
    className,
  );

  return (
    <Box
      as={columnIsSticky ? 'th' : 'td'}
      className={tableCellClasses}
      display="table-cell"
      borderColor={TableConstants.BORDER_COLOR}
      borderWidth={isBorderless ? '0' : `0 0 ${TableConstants.BORDER_WIDTH} 0`}
      background={TableConstants.BACKGROUND_COLOR}
      padding={isCompact
        ? `${TableConstants.PADDING_VERTICAL_COMPACT} ${TableConstants.PADDING_HORIZONTAL_COMPACT}`
        : `${TableConstants.PADDING_VERTICAL} ${TableConstants.PADDING_HORIZONTAL}`
      }
      width={`${width}px`}
      color={TableConstants.FONT_COLOR}
      fontSize={TableConstants.CELL_FONT_SIZE}
      style={{ ...width && { minWidth: `${width}px`, maxWidth: `${width}px` } }}
      scope="row"
    >
      {(children === null || typeof children === 'undefined' || children === '')
        ? emptyCellPlaceholder
        : children}
    </Box>

  );
};

export default TableBodyCell;
