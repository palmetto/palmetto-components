import { ReactNode, Key } from 'react';

export interface Column {
  title: string;
  dataKey: string;
  className?: string;
  key?: Key;
  isSortable?: boolean;
  width?: string;
  truncateOverflow: boolean;
  render: (cellData: string | number) => ReactNode;
}

export interface SortedColumn {
  id: string;
  sortOrder: 'asc' | 'desc';
}

export type Row = { [key: string]: string | number; }
