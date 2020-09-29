import React, { FC, ReactNode } from 'react';
import Box, { BoxProps } from '../../../Box/Box';
import Heading from '../../../Heading/Heading';

export interface CardHeaderProps extends BoxProps {
  /**
   * The title of the card
   */
  title?: ReactNode;
}

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  padding = 'lg',
  title,
  ...restProps
}) => {
  const renderTitle = typeof title === 'string'
    ? (
      <Heading size="lg">
        {title}
      </Heading>
    ) : title;

  return (
    <Box
      childGap="2xs"
      padding={padding}
      {...restProps}
    >
      {renderTitle}
      {children}
    </Box>
  );
};

export default CardHeader;
