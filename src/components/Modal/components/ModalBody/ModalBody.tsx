import React, { FC } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

export type ModalBodyProps = Omit<BoxProps, 'as' | 'radius'>;

export const ModalBody: FC<ModalBodyProps> = ({
  children,
  flex = 'auto',
  padding = 'lg',
  ...restProps
}) => (
  <Box padding={padding} flex={flex} {...restProps}>
    {children}
  </Box>
);
