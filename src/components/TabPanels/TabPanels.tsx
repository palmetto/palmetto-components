import React from 'react';
import { filter } from '../../lib/react-children-utilities';
import { Box, BoxProps } from '../Box/Box';

export interface TabPanelsProps extends BoxProps {
  value: number;
}

export const TabPanels: React.FC<TabPanelsProps> = ({
  children,
  value,
}) => {
  const filteredChildren = filter(children, (_child, index) => index === value);
  return (
    <Box role="tabpanel">
      {filteredChildren}
    </Box>
  );
};
