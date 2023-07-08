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
  childGap = 'sm',
  style,
  ...restProps
}) => (
  <Box
    padding={padding}
    direction={direction}
    alignItems={alignItems}
    justifyContent={justifyContent}
    borderWidth="xs 0 0 0"
    childGap={childGap}
    style={{
      flexShrink: 0,
      borderColor: 'var(--modal-border-separator-color, var(--color-brand-grey-100))',
      ...style,
    }}
    {...restProps}
  >
    {children}
  </Box>
);
