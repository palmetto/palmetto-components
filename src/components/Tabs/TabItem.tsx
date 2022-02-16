import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface TabItemProps extends BoxProps {
  isDisabled?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  as = 'button',
  isDisabled = false,
  padding = 'md',
  style = {},
  ...restProps
}) => {
  const styles = {
    ...style,
    cursor: !isDisabled ? 'pointer' : 'not-allowed',
    background: style?.background || 'transparent',
    whiteSpace: style?.whiteSpace || 'nowrap',
  };

  return (
    <Box
      style={{ ...styles }}
      role="tab"
      as={as}
      disabled={isDisabled}
      padding={padding}
      borderWidth="0"
      color={isDisabled ? 'grey-100' : 'grey-400'}
      direction="row"
      justifyContent="center"
      {...restProps}
    >
      {children}
    </Box>
  );
};
