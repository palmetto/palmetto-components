import React, { FC } from 'react';
import Box, { BoxProps } from '../../../Box/Box';

const CardFooter: FC<BoxProps> = ({
  children,
  padding = 'lg',
  ...restProps
}) => (
  <Box padding={padding} {...restProps}>
    {children}
  </Box>
);

export default CardFooter;
