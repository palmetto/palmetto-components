import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface TableHeadProps {
  /**
   * Custom class to be applied to the `<thead>` element.
   */
  className?: string;
  /**
   * Callback function to execute when a sortable column's header is clicked.
   */
  children?: ReactNode;
}

const TableHead: FC<TableHeadProps> = ({
  className = '',
  children = null,
}) => {
  const tableHeadClasses = classNames(className);

  return (
    <thead className={tableHeadClasses}>
      {children}
    </thead>
  );
};

export default TableHead;
