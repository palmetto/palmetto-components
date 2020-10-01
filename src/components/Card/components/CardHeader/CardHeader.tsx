import React, { FC, ReactNode } from 'react';
import Box from '../../../Box/Box';
import Heading from '../../../Heading/Heading';

export interface CardHeaderProps {
  /**
   * contents of the Header
   */
  children: React.ReactNode;
  /**
   * Additional class names to add
   */
  className: string;
  /**
   * The title of the card
   */
  title?: ReactNode;
}

const CardHeader: FC<CardHeaderProps> = ({
  children,
  className,
  title,
  ...restProps
}) => {
  const renderTitle = typeof title === 'string'
    ? (
      <Heading size="lg" as="h4">
        {title}
      </Heading>
    ) : title;

  return (
    <Box
      childGap="2xs"
      padding="md lg"
      className={className}
      {...restProps}
    >
      {renderTitle}
      {children}
    </Box>
  );
};

export default CardHeader;
