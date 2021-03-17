import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export type TabPanelProps = BoxProps;

export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  ...restProps
}) => {

  return (
    <Box {...restProps}>
      {children}
    </Box>
  );
};