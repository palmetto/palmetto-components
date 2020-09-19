import React, { FC } from 'react';
import classNames from 'classnames';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';
import styles from './Card.module.scss';

interface CardProps {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
}

const Card: FC<CardProps> = ({
  children,
  className = null,
  ...restProps
}) => {
  const cardClasses = classNames(
    styles.card,
    className,
  );

  return (
    <Box
      background="white"
      radius="md"
      className={cardClasses}
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Card;

interface CardHeader {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
  /**
   * The title of the card
   */
  title?: string;
}

export const CardHeader: FC<CardHeader> = ({
  children,
  title,
  ...restProps
}) => (
  <Box childGap="2xs" {...restProps}>
    {title && (
      <Heading size="lg">
        {title}
      </Heading>
    )}
    {children}
  </Box>
);

interface CardContent {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
}

export const CardContent: FC<CardContent> = ({
  children,
  ...restProps
}) => (
  <Box {...restProps}>
    {children}
  </Box>
);

interface CardFooter {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
}

export const CardFooter: FC<CardFooter> = ({
  children,
  ...restProps
}) => (
  <Box {...restProps}>
    {children}
  </Box>
);
