import React, { FC, ReactNode } from 'react';
import Box, { BoxProps } from '../../../Box/Box';

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

const CardFooter: FC<CardFooterProps> = ({ children, display = 'block', ...restProps }) => (
  <Box
    background="grey-50"
    display={display}
    padding="md lg"
    borderColor="grey-100"
    borderWidth="xs 0 0 0"
    {...restProps}
  >
    {children}
  </Box>
);

export default CardFooter;
