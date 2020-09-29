import React, { FC } from 'react';
import Box, { BoxProps } from '../../../Box/Box';
import Heading from '../../../Heading/Heading';

export interface CardSectionProps extends BoxProps {
  /**
   * title for the section
   */
  title?: string;
}

export const CardSection: FC<CardSectionProps> = ({
  children,
  padding = 'lg',
  title,
  ...restProps
}) => (
  <Box padding={padding} {...restProps}>
    {title && (
      // <Box margin="0 0 md 0">
      <Box className="m-bottom-md">
        <Heading as="h4" size="sm" variant="grey">
          {title}
        </Heading>
      </Box>
    )}
    {children}
  </Box>
);

export default CardSection;
