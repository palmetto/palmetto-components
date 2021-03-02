import React, { ReactNode } from 'react';
import Box, { BoxProps } from '../Box/Box';
import { CardFooter, CardHeader, CardSection } from './components';

export interface CardProps extends BoxProps {
  /**
   * The Card's contents.
   */
  children?: ReactNode;
  /**
   * visually subdue the appearance of the entire card.
   */
  subdued?: boolean;
}

class Card extends React.Component<CardProps> {
  static Header = CardHeader;

  static Section = CardSection;

  static Footer = CardFooter;

  render(): React.ReactNode {
    const {
      children,
      subdued,
      radius = 'md',
      overflow = 'hidden',
      display = 'block',
      shadow = 'sm',
      background = 'white',
      width = '100',
      ...restProps
    } = this.props;

    const backgroundColor = subdued ? 'grey-lightest' : background;

    return (
      <Box
        background={backgroundColor}
        radius={radius}
        overflow={overflow}
        display={display}
        shadow={subdued ? undefined : shadow}
        width={width}
        {...restProps}
      >
        {children}
      </Box>
    );
  }
}

export default Card;
