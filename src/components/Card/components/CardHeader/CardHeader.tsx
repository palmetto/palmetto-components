import React, { FC, ReactNode } from 'react';
import Box from '../../../Box/Box';
import Heading from '../../../Heading/Heading';
import { CssDisplayValue } from '../../../../types';

export interface CardHeaderProps {
  /**
   * contents of the Header
   */
  children?: ReactNode;
  /**
   * Additional class names to add
   */
  className?: string;
  /**
   * Display property. Only select values supported.
   */
  display?: CssDisplayValue;
  /**
   * The title of the card
   */
  title?: ReactNode;
}

const CardHeader: FC<CardHeaderProps> = ({
  children = null,
  className = undefined,
  display = 'block',
  title = null,
  ...restProps
}) => {
  const renderTitle = () => (
    typeof title === 'string'
      ? <Heading size="lg" as="h4">{title}</Heading>
      : title
  );

  return (
    <Box
      childGap="2xs"
      display={display}
      padding="md lg"
      className={className}
      {...restProps}
    >
      {title && renderTitle()}
      {children}
    </Box>
  );
};

export default CardHeader;
