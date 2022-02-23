import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
import { CardFooter, CardHeader, CardSection } from './components';
import styles from './Card.module.scss';

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

const CardBaseComponent: React.FC<CardProps> = React.forwardRef((
  {
    children,
    subdued,
    className = undefined,
    overflow = 'hidden',
    display = 'block',
    width = '100',
    ...restProps
  },
  ref,
) => {
  const classes = classNames(styles.card, className,
    {
      [styles.subdued]: subdued,
    });

  return (
    <Box
      overflow={overflow}
      display={display}
      ref={ref}
      width={width}
      className={classes}
      {...restProps}
    >
      {children}
    </Box>
  );
});

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
