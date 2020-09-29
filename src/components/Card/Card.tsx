import React, { FC } from 'react';
import classNames from 'classnames';
import Box from '../Box/Box';
import Heading from '../Heading/Heading';
import styles from './Card.module.scss';

interface CardHeader {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
  /**
   * padding
   */
  padding?: string;
  /**
   * The title of the card
   */
  title?: string;
}

export const CardHeader: FC<CardHeader> = ({
  children,
  padding = 'md lg',
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

interface CardSection {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
  /**
   * padding
   */
  padding?: string;
  /**
   * title for the section
   */
  title?: string;
}

export const CardSection: FC<CardSection> = ({
  children,
  padding = 'lg',
  title,
  ...restProps
}) => (
  <Box padding={padding} {...restProps}>
    {title && (
      <Box margin="0 0 md 0">
        <Heading as="h4" size="sm">
          {title}
        </Heading>
      </Box>
    )}
    {children}
  </Box>
);

interface CardFooter {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
  /**
   * padding
   */
  padding?: string;
}

export const CardFooter: FC<CardFooter> = ({
  children,
  padding = 'md lg',
  ...restProps
}) => (
  <Box padding={padding} {...restProps}>
    {children}
  </Box>
);

interface CardProps {
  /**
   * Custom class to be passed to the link.
   */
  className?: string;
}

class Card extends React.Component<CardProps> {
  static Header = CardHeader;

  static Section = CardSection;

  static Footer = CardFooter;

  render(): React.ReactNode {
    const { className, children } = this.props;

    const cardClasses = classNames(
      styles.card,
      className,
    );

    return (
      <Box
        background="white"
        radius="md"
        className={cardClasses}
        overflow="hidden"
      // {...restProps}
      >
        {children}
      </Box>
    );
  }
}

export default Card;
