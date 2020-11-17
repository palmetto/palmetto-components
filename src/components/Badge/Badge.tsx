import React, {
  FC,
} from 'react';
import classNames from 'classnames';
import {
  BrandColor,
  FontColor,
  FontSize,
  BaseSpacing,
} from '../../types';
import styles from './Badge.module.scss';
import Box from '../Box/Box';

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';
export type BadgeVariant = 'info' | 'primary' | 'success' | 'secondary' | 'tertiary' | 'warning' | 'danger' | 'default';
export type BadgeColorAttributes = { font: FontColor; background: BrandColor; };
export type BadgeSizeAttributes = { fontSize: FontSize; padding: BaseSpacing; };

interface BadgeProps {
  /**
   * Custom class to apply to the badge container div.
   */
  className?: string;
  /**
   * The text message or ReactNode to be rendered in the badge.
   */
  message?: string;
  /**
   * The size of the button.
   */
  size?: BadgeSize;
  /**
   * The type/color of the badge to show.
   */
  variant?: BadgeVariant;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const Badge: FC<BadgeProps> = ({
  className = '',
  message = '',
  variant = 'default',
  size = 'md',
  ...restProps
}) => {
  const badgeClasses: string = classNames(
    styles.badge,
    className,
  );

  const colorMap: { [key in BadgeVariant]: BadgeColorAttributes } = {
    info: { font: 'dark-500', background: 'info-100' },
    primary: { font: 'dark-500', background: 'primary-100' },
    success: { font: 'dark-500', background: 'success-100' },
    secondary: { font: 'dark-500', background: 'secondary-100' },
    warning: { font: 'dark-500', background: 'warning-100' },
    tertiary: { font: 'dark-500', background: 'tertiary-100' },
    danger: { font: 'dark-500', background: 'danger-100' },
    default: { font: 'dark-500', background: 'grey-100' },
  };

  const sizeMap: { [key in BadgeSize]: BadgeSizeAttributes} = {
    sm: { fontSize: '2xs', padding: '2xs 2xs' },
    md: { fontSize: 'xs', padding: '2xs xs' },
    lg: { fontSize: 'sm', padding: '2xs xs' },
    xl: { fontSize: 'md', padding: 'xs sm' },
  };

  return (
    <Box
      className={badgeClasses}
      display="flex"
      radius="sm"
      background={colorMap[variant].background}
      color={colorMap[variant].font}
      fontWeight="bold"
      fontSize={sizeMap[size].fontSize}
      padding={sizeMap[size].padding}
      {...restProps}
    >
      {message}
    </Box>
  );
};

export default Badge;
