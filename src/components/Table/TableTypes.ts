import {
  Key,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { UnknownPropertiesObjType } from '../../lib/types';

export type Column = {
  /**
   * CSS Class to be applied uniformly to all individual cells in a column.
   */
  cellClassName?: string;
  /**
   * The key value to be rendered based on the table `rows`.
   */
  dataKey?: string;
  /**
   * Placeholder for empty cells Applies only to the cells of the particular column with this prop.
   */
  emptyCellPlaceholder?: string | number | undefined;
  /**
   * The heading/title text of a column.
   */
  heading?: string;
  /**
   * CSS Class to be applied to the column header cell.
   */
  headerClassName: string;
  /**
   * A custom key to be used when rendering the column array.
   * Not required as our table auto-generates static, but unique column keys if not passed in.
   */
  key?: Key;
  /**
   * Whether the column data is sortable. Controls whether sorting controls should be displayed.
   */
  isSortable?: boolean;
  /**
   * Render method for column cell data. Provides ability to render any aspect of the cell/row with custom
   * markup.
   */
  render?: (cell?: Cell, row?: Row, rowIndex?: number) => ReactNode;
  /**
   * Whether long text should be truncated based on column width. Use in tandem with column width as well as
   * `useFixedWidthColumns` prop in the parent table.
   */
  truncateOverflow?: boolean;
  /**
   * Specific width of the column. Use in tandem with `useFixedWidthColumns` in the parent table.
   */
  width?: number;
}

export type Row = UnknownPropertiesObjType;

export type Cell = string | number | { [key: string]: unknown; } | unknown[];

export type EventWithColumnKey =
  (
    MouseEvent<HTMLTableHeaderCellElement> |
    KeyboardEvent<HTMLTableHeaderCellElement>
  )
  & { sortedKey: Key | undefined; };
