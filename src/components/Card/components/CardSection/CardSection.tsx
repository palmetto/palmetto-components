import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Box, BoxProps } from '../../../Box/Box';
import { Heading } from '../../../Heading/Heading';
import { BorderSize, BrandColor, ResponsiveProp } from '../../../../types';
import styles from '../../Card.module.scss';

export interface CardSectionProps extends BoxProps {
  /**
   * If defined as a prop, all themeable styling will be removed.
   * Any valid [brand color token](/?path=/story/design-tokens-design-tokens--page#color), or a `url()` for an image
   */
  background?: BrandColor;
  /**
   * If defined as a prop, all themeable styling will be removed.
   * Any valid [brand color token](/?path=/story/design-tokens-design-tokens--page#color) for the border color
   * Or a responsive prop with BrandColor for each breakpoint.
   */
  borderColor?: BrandColor;
  /**
   * If defined as a prop, all themeable styling will be removed.
   * Width of the section's border
   * Can be a single [border width token](/?path=/story/design-tokens-design-tokens--page#border-width).
   * Can also be a string of [border width tokens](/?path=/story/design-tokens-design-tokens--page#border-width)
   * that models itself after the css shorthand property,
   * where you can set the border width on all four sides of an element.
   * e.g: "0 sm xs 0" --> top: 0, right: sm, bottom: xs, left: 0;
   */
  borderWidth?: BorderSize | string | ResponsiveProp<BorderSize | string>;
  /**
   * Contents of the Section.
   */
  children?: ReactNode;
  /**
   * Custom class to be applied to section container.
   */
  className?: string;
  /**
   * Visually subdued the appearance of the section.
   */
  subdued?: boolean;
  /**
   * Title for the section.
   */
  title?: ReactNode;
}

export const CardSection: FC<CardSectionProps> = ({
  background = undefined,
  borderColor = undefined,
  borderWidth = undefined,
  children = null,
  childGap = undefined,
  className = undefined,
  display = 'block',
  padding = 'md lg',
  subdued = undefined,
  title = undefined,
  ...restProps
}) => {
  const renderTitle = typeof title === 'string' ? (
    <Box className="m-bottom-md">
      <Heading as="h4" size="sm" variant="grey">
        {title}
      </Heading>
    </Box>
  ) : (
    title
  );

  const useTheme = background === undefined && borderColor === undefined && borderWidth === undefined;

  const sectionClasses = classNames(
    {
      [styles['card-section']]: useTheme,
      [styles.subdued]: useTheme && subdued,
    },
    className,
  );

  return (
    <Box
      background={background}
      borderColor={borderColor}
      borderWidth={borderWidth}
      className={sectionClasses}
      display={display}
      padding={padding}
      {...restProps}
    >
      {renderTitle}
      <Box childGap={childGap}>{children}</Box>
    </Box>
  );
};

export default CardSection;
