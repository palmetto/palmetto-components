  
import type { ReactNode } from 'react';
import { Children } from 'react';

export type FilterFunction = (child: ReactNode, index?: number, children?: ReactNode[]) => boolean;

export const filter = (children: ReactNode, filterFn: FilterFunction): ReactNode[] => {
  return Children.toArray(children).filter(filterFn);
};