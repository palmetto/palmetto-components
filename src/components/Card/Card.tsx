import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../Box/Box';
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

const CardBaseComponent: React.FC<CardProps> = React.forwardRef((
  {
    children,
    subdued,
    className = undefined,
    radius = 'md',
    overflow = 'hidden',
    display = 'block',
    shadow = 'sm',
    background = 'white',
    width = '100',
    ...restProps
  },
  ref,
) => {
  const backgroundColor = subdued ? 'grey-lightest' : background;

  return (
    <Box
      background={backgroundColor}
      radius={radius}
      overflow={overflow}
      display={display}
      ref={ref}
      shadow={subdued ? undefined : shadow}
      width={width}
      className={classNames('palmetto-components__variables__card', className)}
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
