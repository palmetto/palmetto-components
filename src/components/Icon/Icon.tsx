import React, { FC, forwardRef } from 'react';
import icons from '@palmetto/palmetto-design-tokens/build/icons/react';
import classNames from 'classnames';
import generateResponsiveClasses from '../../lib/generateResponsiveClasses';
import {
  FontColor, FontSize, IconName, ResponsiveProp,
} from '../../types';
import { Box } from '../Box/Box';

export interface IconProps {
  className?: string;
  /**
   * A color token identifier to use for the text color.
   */
  color?: FontColor | ResponsiveProp<FontColor>;

  /**
   * A [font size token](/?path=/docs/design-tokens-font-size--page) identifier
   */
  size?: FontSize | ResponsiveProp<FontSize>;
  /**
   * Name of the icon
   */
  name: IconName;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

export const Icon: FC<IconProps> = forwardRef<SVGSVGElement, IconProps>(
  ({
    className = undefined, name, color, size, ...restProps
  }, ref) => {
    const IconComponent = icons[name];

    if (!IconComponent) console.error(`Icon '${name}' not found`); // eslint-disable-line no-console

    const iconClasses = classNames(
      className,
      generateResponsiveClasses('font-color', color),
      generateResponsiveClasses('font-size', size),
    );

    return IconComponent ? (
      <IconComponent
        className={iconClasses || null}
        ref={ref}
        data-testid={`icon-testid--${name}`}
        {...restProps}
      />
    ) : (
      <Box
        fontWeight="bold"
        background="danger"
        color="white"
        padding="2xs"
        fontSize="sm"
        display="inline"
      >
        ???
      </Box>
    );
  },
);
