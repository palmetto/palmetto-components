import { ReactNode, Children } from 'react';

export type FilterFunction = (child: ReactNode, index?: number, children?: ReactNode[]) => boolean;

export const filter = (children: ReactNode, filterFn: FilterFunction): ReactNode[] => (
  Children.toArray(children).filter(filterFn)
);
