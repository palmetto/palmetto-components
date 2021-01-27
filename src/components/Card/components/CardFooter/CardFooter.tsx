import React, { FC, ReactNode } from 'react';
import Box from '../../../Box/Box';
import { CssDisplayValue } from '../../../../types';

export interface CardFooterProps {
  /**
   * Contents of the Footer.
   */
  children?: ReactNode;
  /**
   * Display property. Only select values supported.
   */
  display?: CssDisplayValue;
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
