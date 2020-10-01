import React from 'react';
import classNames from 'classnames';
import Box, { BoxProps } from '../Box/Box';
import { CardFooter, CardHeader, CardSection } from './components';
import styles from './Card.module.scss';

type BoxPropsShallow = Omit<BoxProps,
  'as' |
  'align' |
  'alignContent' |
  'justifyContent' |
  'alignSelf' |
  'background' |
  'direction' |
  'flex' |
  'fontSize' |
  'justify' |
  'radius' |
  'wrap' |
  'childGap' |
  'display'
>;

interface CardProps extends BoxPropsShallow {
  /**
   * visually subdued the appearance of the entire card
   */
  subdued?: boolean;
}

class Card extends React.Component<CardProps> {
  static Header = CardHeader;

  static Section = CardSection;

  static Footer = CardFooter;

  render(): React.ReactNode {
    const {
      className,
      children,
      subdued,
      ...restProps
    } = this.props;

    const cardClasses = classNames(
      {
        [styles.card]: !subdued,
      },
      className,
    );

    const backgroundColor = subdued ? 'grey-lightest' : 'white';

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
