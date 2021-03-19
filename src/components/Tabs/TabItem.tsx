import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface TabItemProps extends BoxProps {
  isDisabled?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  isDisabled = false,
  padding = 'md',
  style,
  ...restProps
}) => {
  const styles = {
    ...style,
    cursor: !isDisabled ? 'pointer' : 'not-allowed',
  };

  return (
    <Box as="li" style={{ ...styles }} role="presentation" {...restProps}>
      <Box
        as="button"
        disabled={isDisabled}
        style={{ whiteSpace: 'nowrap' }}
        padding={padding}
        borderWidth="0"
        background="white"
        color={isDisabled ? 'grey-100' : 'grey-400'}
        direction="row"
        justifyContent="center"
      >
        {children}
      </Box>
    </Box>
  );
};
