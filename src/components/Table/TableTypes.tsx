export interface Column {
  heading: string;
  id: string;
  isSortable?: boolean;
  width?: string;
}

export interface SortedColumn {
  id: string;
  sortOrder: 'asc' | 'desc';
}
