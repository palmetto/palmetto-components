import React from 'react';
import { Box, BoxProps } from '../Box/Box';

export interface AccordionPanelDetailsProps extends BoxProps {}

export const AccordionPanelDetails: React.FC<AccordionPanelDetailsProps> = ({
  children,
  padding = 'sm',
  borderWidth = '0 0 xs 0',
  borderColor = 'grey-100',
  background = 'grey-50',
  ...restProps
}) => (
  <Box
    padding={padding}
    borderWidth={borderWidth}
    borderColor={borderColor}
    background={background}
    {...restProps}
  >
    {children}
  </Box>
)
