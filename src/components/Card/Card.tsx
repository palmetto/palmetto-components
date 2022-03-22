import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import {
  BorderRadiusSize, BoxShadowSize, BrandColor, ResponsiveProp,
} from '../../types';
import { CardFooter, CardHeader, CardSection } from './components';
import styles from './Card.module.scss';

export interface CardProps extends BoxProps {
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Any valid [brand color token](/?path=/story/design-tokens-design-tokens--page#color), or a `url()` for an image
   */
  background?: BrandColor;
  /**
   * The Card's contents.
   */
  children?: ReactNode;
  /**
   * visually subdue the appearance of the entire card.
   */
  subdued?: boolean;
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Radius of the Card's corners
   */
  radius?: BorderRadiusSize | ResponsiveProp<BorderRadiusSize>;
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * The size of the drop shadow applied to the Card
   */
  shadow?: BoxShadowSize | ResponsiveProp<BoxShadowSize>;
}

const CardBaseComponent: React.FC<CardProps> = React.forwardRef(
  (
    {
      background = undefined,
      children,
      subdued,
      className = undefined,
      overflow = 'hidden',
      display = 'block',
      radius = undefined,
      shadow = undefined,
      width = '100',
      ...restProps
    },
    ref,
  ) => {
    const classes = classNames(
      {
        [styles['card-background']]: background === undefined && !subdued,
        [styles['card-radius']]: radius === undefined,
        [styles['card-shadow']]: shadow === undefined && !subdued,
        [styles['card-subdued']]: subdued,
      },
      className,
    );

    return (
      <Box
        background={background}
        overflow={overflow}
        display={display}
        ref={ref}
        width={width}
        radius={radius}
        shadow={shadow}
        className={classes}
        {...restProps}
      >
        {children}
      </Box>
    );
  },
);

export interface CardStatic {
  Header: typeof CardHeader;
  Section: typeof CardSection;
  Footer: typeof CardFooter;
}

export type CardWithStaticComponents = typeof CardBaseComponent & CardStatic;

// Actual component is wrapped in an IIFE for the export
// To allow tree-shaking even with static properties (subcomponents in this case).
export const Card = (() => {
  const Card = CardBaseComponent as CardWithStaticComponents; // eslint-disable-line no-shadow

  Card.Header = CardHeader;
  Card.Section = CardSection;
  Card.Footer = CardFooter;

  return Card;
})();
