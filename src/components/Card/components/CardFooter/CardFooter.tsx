import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

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
  background = 'grey-50',
  borderColor = 'grey-100',
  borderWidth = 'xs 0 0 0',
  children = null,
  display = 'block',
  padding = 'md lg',
  ...restProps
}) => (
  <Box
    background={background}
    display={display}
    padding={padding}
    borderColor={borderColor}
    borderWidth={borderWidth}
    {...restProps}
  >
    {children}
  </Box>
);
