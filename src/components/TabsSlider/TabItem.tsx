import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface TabItemProps extends BoxProps {
  isDisabled?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  children,
  isDisabled = false,
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
        style={{
          background: 'transparent',
          whiteSpace: 'nowrap',
        }}
        borderWidth="0"
        color={isDisabled ? 'grey-300' : 'grey-400'}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  );
};
