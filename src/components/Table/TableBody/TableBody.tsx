import React, { FC, ReactNode } from 'react';

interface TableBodyProps {
  children?: ReactNode;
}

const TableBody: FC<TableBodyProps> = ({ children = null }) => (
  <tbody>
    {children}
  </tbody>
);

export default TableBody;
