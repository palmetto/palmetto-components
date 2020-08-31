import {
  Key,
  ReactNode,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { UnknownPropertiesObjType } from '../../lib/types';

export interface Column {
  heading?: string;
  dataKey?: string;
  className?: string;
  emptyCellPlaceholder?: string | number | undefined;
  key?: Key;
  isSortable?: boolean;
  width?: number;
  truncateOverflow?: boolean;
  render?: (cell?: Cell, row?: Row, rowIndex?: number) => ReactNode;
}

export type Row = UnknownPropertiesObjType

export type Cell = string | number | { [key: string]: unknown; } | unknown[];

export type EventWithColumnKey =
  (
    MouseEvent<HTMLTableHeaderCellElement> |
    KeyboardEvent<HTMLTableHeaderCellElement>
  )
  & { sortedKey: Key | undefined; };
