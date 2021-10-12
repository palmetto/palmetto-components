import { Key } from 'react';
import { Column } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const getColumnKeys = (columns: Column[]): Key[] => {
  const INTERNAL_KEY_PREFIX = 'columnKeyPrefix';
  const columnKeys: React.Key[] = [];
  const keys: Record<React.Key, boolean> = {};

  columns.forEach(column => {
    const { key, dataKey } = column || {};
    const shapedDataKey = dataKey?.includes(' ') ? dataKey.split(' ').join('-') : dataKey;

    let mergedKey = key || shapedDataKey || INTERNAL_KEY_PREFIX;

    while (keys[mergedKey]) {
      mergedKey = `${mergedKey}_next`;
    }
    keys[mergedKey] = true;

    columnKeys.push(mergedKey);
  });

  return columnKeys;
};
