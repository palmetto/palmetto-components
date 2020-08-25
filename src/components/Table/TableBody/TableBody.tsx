import React, { FC, ReactNode } from 'react';

interface TableBodyProps {
  /**
   * The children components to render inside the table body
   */
  children?: ReactNode;
  /**
   * A custom class to apply to the table body.
   */
  className?: string;
}

const TableBody: FC<TableBodyProps> = ({ children = null, className = '' }) => (
  <tbody className={className}>
    {children}
  </tbody>
);

export default TableBody;
