import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import {
  BrandColor, FontColor, FontSize, BaseSpacing, ResponsiveProp,
} from '../../types';
import { generateResponsiveClasses } from '../../lib/generateResponsiveClasses';
import styles from './Badge.module.scss';
import { Box } from '../Box/Box';

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';

export type BadgeVariant =
  | 'info'
  | 'primary'
  | 'success'
  | 'secondary'
  | 'tertiary'
  | 'warning'
  | 'danger'
  | 'default';

export type BadgeColorAttributes = { font: FontColor; background: BrandColor; };

export type BadgeSizeAttributes = { fontSize: FontSize; padding: BaseSpacing; };
export interface BadgeProps {
  /**
   * Custom class to apply to the badge container div.
   */
  className?: string;
  /**
   * The text message or ReactNode to be rendered in the badge.
   */
  message?: string | ReactNode;
  /**
   * The size of the button.
   */
  size?: BadgeSize | ResponsiveProp<BadgeSize>;
  /**
   * The type/color of the badge to show.
   */
  variant?: BadgeVariant;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const Badge: FC<BadgeProps> = ({
  className = '',
  message = '',
  variant = 'default',
  size = 'md',
  ...restProps
}) => {
  const responsiveClasses = generateResponsiveClasses('size', size).map(c => styles[c]);

  const badgeClasses: string = classNames(
    styles.badge,
    className,
    responsiveClasses,
    {
      [styles[variant]]: variant,
    },
  );

  return (
    <Box
      className={badgeClasses}
      display="inline-block"
      {...restProps}
    >
      {message}
    </Box>
  );
};
