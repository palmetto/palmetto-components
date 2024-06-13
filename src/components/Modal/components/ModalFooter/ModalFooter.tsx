import React, { FC } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

export type ModalFooterProps = Omit<
  BoxProps,
  'as' | 'background' | 'borderColor' | 'borderWidth' | 'radius'
>;

export const ModalFooter: FC<ModalFooterProps> = ({
  children,
  padding = 'lg',
  direction = 'row',
  alignItems = 'center',
  justifyContent = 'flex-end',
  gap = 'sm',
  style,
  ...restProps
}) => (
  <Box
    padding={padding}
    direction={direction}
    alignItems={alignItems}
    justifyContent={justifyContent}
    borderColor="separator"
    borderWidth="xs 0 0 0"
    gap={gap}
    style={{
      flexShrink: 0,
      ...style,
    }}
    {...restProps}
  >
    {children}
  </Box>
);
