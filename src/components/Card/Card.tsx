import React, { FC } from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../Box/Box';
import Heading from '../Heading/Heading';
import styles from './Card.module.scss';

interface CardHeader extends BoxProps {
  /**
   * The title of the card
   */
  title?: string;
}

export const CardHeader: FC<CardHeader> = ({
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

interface CardSection extends BoxProps {
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

// interface CardFooter extends BoxProps {}

export const CardFooter: FC<BoxProps> = ({
  children,
  padding = 'lg',
  ...restProps
}) => (
  <Box padding={padding} {...restProps}>
    {children}
  </Box>
);


class Card extends React.Component<BoxProps> {
  static Header = CardHeader;

  static Section = CardSection;

  static Footer = CardFooter;

  render(): React.ReactNode {
    const { className, children, ...restProps } = this.props;

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
        display="block"
        width="100%"
        {...restProps}
      >
        {children}
      </Box>
    );
  }
}

export default Card;
