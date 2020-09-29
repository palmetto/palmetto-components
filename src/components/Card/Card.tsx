import React from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../Box/Box';
import styles from './Card.module.scss';

import { CardFooter, CardHeader, CardSection } from './components';

// TODO
// childGap in Card.Section without a title fails
// BOX margin/padding proptype error when setting to CSS shorthand
//

interface CardProps extends BoxProps {
  muted?: boolean;
}

class Card extends React.Component<CardProps> {
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
