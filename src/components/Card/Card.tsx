import React from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../Box/Box';
import styles from './Card.module.scss';

import { CardFooter, CardHeader, CardSection } from './components';

// TODO
// childGap in Card.Section without a title fails
// Box margin/padding proptype error when setting to CSS shorthand
// Box individual border sides
//

interface CardProps extends BoxProps {
  /**
   * visually subdue the appearance of the entire card
   */
  subdue?: boolean;
}

class Card extends React.Component<CardProps> {
  static Header = CardHeader;

  static Section = CardSection;

  static Footer = CardFooter;

  render(): React.ReactNode {
    const {
      className,
      children,
      subdue,
      ...restProps
    } = this.props;

    const cardClasses = classNames(
      styles.card,
      className,
    );

    const backgroundColor = subdue ? 'grey-lightest' : 'white';

    return (
      <Box
        background={backgroundColor}
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
