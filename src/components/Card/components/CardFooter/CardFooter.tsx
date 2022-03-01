import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../../../Box/Box';
import styles from '../../Card.module.scss';

export interface CardFooterProps extends BoxProps {
  /**
   * Contents of the Footer.
   */
  children?: ReactNode;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CardFooter: FC<CardFooterProps> = ({
  borderWidth = 'xs 0 0 0',
  children = null,
  className,
  display = 'block',
  padding = 'md lg',
  ...restProps
}) => (
  <Box
    className={classNames(styles['card-footer'], className)}
    display={display}
    padding={padding}
    borderWidth={borderWidth}
    {...restProps}
  >
    {children}
  </Box>
);
