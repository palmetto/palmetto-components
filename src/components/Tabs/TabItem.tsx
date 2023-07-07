import React, { FC, forwardRef } from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface TabItemProps extends BoxProps {
  isDisabled?: boolean;
}

export const TabItem: FC<TabItemProps> = forwardRef(
  ({
    children,
    as = 'button',
    isDisabled = false,
    padding = 'md',
    style = {},
    ...restProps
  }, ref) => {
    const styles = {
      ...style,
      cursor: !isDisabled ? 'pointer' : 'not-allowed',
      background: style?.background || 'transparent',
      whiteSpace: style?.whiteSpace || 'nowrap',
    };

    return (
      <Box
        style={{ ...styles }}
        ref={ref}
        role="tab"
        as={as}
        disabled={isDisabled}
        padding={padding}
        borderWidth="0"
        color={isDisabled ? 'grey-200' : 'grey-500'}
        direction="row"
        justifyContent="center"
        {...restProps}
      >
        {children}
      </Box>
    );
  },
);
