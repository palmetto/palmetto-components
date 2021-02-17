import React, { FC } from 'react';
import Box, { BoxProps } from '../../../Box/Box';

export type ModalBodyProps = Omit<BoxProps, 'as' | 'radius'>;

const ModalBody: FC<ModalBodyProps> = ({
  children,
  flex = 'auto',
  padding = 'lg',
  overflow = 'auto',
  ...restProps
}) => (
  <Box padding={padding} overflow={overflow} flex={flex} {...restProps}>
    {children}
  </Box>
);

export default ModalBody;
