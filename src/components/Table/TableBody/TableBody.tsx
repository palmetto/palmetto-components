import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './TableBody.module.scss';

interface TableBodyProps {
  /**
   * The children components to render inside the table body
   */
  children?: ReactNode;
  /**
   * A custom class to apply to the table body.
   */
  className?: string;
  /**
   * Whether the table rows have a striped pattern
   */
  isStriped?: boolean;
}

const TableBody: FC<TableBodyProps> = ({
  children = null,
  className = '',
  isStriped = false,
}) => {
  const tableBodyClasses = classNames(
    styles['table-body'],
    { [styles.striped]: isStriped },
    className,
  );

  return (
    <tbody className={tableBodyClasses}>
      {children}
    </tbody>
  );
};

export default TableBody;
