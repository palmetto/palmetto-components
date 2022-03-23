import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../../../Box/Box';
import { BrandColor } from '../../../../types';
import styles from '../../Card.module.scss';

export interface CardFooterProps extends BoxProps {
  /**
   * Contents of the Footer.
   */
  children?: ReactNode;
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Any valid [brand color token](/?path=/story/design-tokens-design-tokens--page#color), or a `url()` for an image
   */
  background?: BrandColor;
  /**
   * If defined as a prop, this value will take higher precedence than the corresponding component design token value
   * Any valid [brand color token](/?path=/story/design-tokens-design-tokens--page#color) for the border color
   * Or a responsive prop with BrandColor for each breakpoint.
   */
  borderColor?: BrandColor;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const CardFooter: FC<CardFooterProps> = ({
  background = undefined,
  borderColor = undefined,
  borderWidth = 'xs 0 0 0',
  children = null,
  className,
  display = 'block',
  padding = 'md lg',
  ...restProps
}) => {
  const classes = classNames(
    {
      [styles['card-footer-background']]: background === undefined,
      [styles['card-footer-border-color']]: borderColor === undefined,
    },
    className,
  );

  return (
    <Box
      className={classes}
      display={display}
      padding={padding}
      background={background}
      borderColor={borderColor}
      borderWidth={borderWidth}
      {...restProps}
    >
      {children}
    </Box>
  );
};
