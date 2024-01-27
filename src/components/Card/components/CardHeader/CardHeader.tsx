import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '../../../Box/Box';

export interface CardHeaderProps extends BoxProps {
  /**
   * contents of the Header
   */
  children?: ReactNode;
  /**
   * Additional class names to add
   */
  className?: string;
  /**
   * The title of the card
   */
  title?: ReactNode;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CardHeader: FC<CardHeaderProps> = ({
  childGap = '2xs',
  children = null,
  className = undefined,
  display = 'block',
  padding = 'md lg',
  title = null,
  ...restProps
}) => {
  const renderTitle = () => (
    typeof title === 'string'
      ? <Box fontSize="lg" fontWeight="bold" as="h4">{title}</Box>
      : title
  );

  return (
    <Box
      childGap={childGap}
      display={display}
      padding={padding}
      className={className}
      {...restProps}
    >
      {title && renderTitle()}
      {children}
    </Box>
  );
};
