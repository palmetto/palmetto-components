import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

interface TableHeadProps {
  /**
   * Callback function to execute when a sortable column's header is clicked.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to the `<thead>` element.
   */
  className?: string;
}

const TableHead: FC<TableHeadProps> = ({
  children = null,
  className = '',
}) => {
  const tableHeadClasses = classNames(className);

  return (
    <thead className={tableHeadClasses}>
      {children}
    </thead>
  );
};

export default TableHead;
