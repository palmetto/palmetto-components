import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import Box from '../../../Box/Box';
import styles from '../../Card.module.scss';

const CardFooter: FC<{ children: ReactNode; className: string; }> = ({
  children,
  className,
  ...restProps
}) => {
  const footerClasses = classNames(
    styles['card-footer'],
    className,
  );
  return (
    <Box
      background="grey-lightest"
      className={footerClasses}
      padding="lg"
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default CardFooter;
