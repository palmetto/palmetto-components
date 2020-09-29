import React, { FC } from 'react';
import Box, { BoxProps } from '../../../Box/Box';
import Heading from '../../../Heading/Heading';

export interface CardHeaderProps extends BoxProps {
  /**
   * The title of the card
   */
  title?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  padding = 'lg',
  title,
  ...restProps
}) => (
  <Box
    childGap="2xs"
    padding={padding}
    {...restProps}
  >
    {title && (
      <Heading size="lg">
        {title}
      </Heading>
    )}
    {children}
  </Box>
);

export default CardHeader;
