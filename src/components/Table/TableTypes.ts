export type ColumnType = {
  heading: string;
  id: string;
  isSortable?: boolean;
  width?: string;
}

export type SortedColumnType = {
  id: string;
  sortOrder: 'asc' | 'desc';
}
