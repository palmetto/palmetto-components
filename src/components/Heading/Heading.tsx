import { FC, createElement, ReactNode } from 'react';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';
import {
  PALMETTO_FONT_SIZES,
  PALMETTO_FONT_COLORS,
} from '../../lib/tokens';
import { HEADING_LEVELS_TYPE, HEADING_DEFAULT_SIZE_MAP } from './Heading.constants';
import styles from './Heading.module.scss';

interface HeadingProps {
  /**
   * The DOM tag or react component to use for the element.
   * Select the appropriate semantic element (h1-h6).
   */
  as?: HEADING_LEVELS_TYPE;
  /**
   * Content of the heading. Can be a string or any valid DOM node.
   */
  children?: ReactNode;
  /**
   * Additional class names to add.
   */
  className?: string;
  /**
   * A color token identifier to use for the text color. Available colors found:
   * [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/color/font.json).
   */
  color?: PALMETTO_FONT_COLORS;
  /**
   * By default, size is determined by the chosen tag (e.g. h1 is bigger than h2).
   * However, size can be set independently so that its size is appropriate for the surrounding content.
   * Available sizes found:
   * [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/size/font.json).
   */
  size?: PALMETTO_FONT_SIZES;
}

const Heading: FC<HeadingProps> = ({
  as = 'h4',
  children,
  className,
  color,
  size,
}) => {
  const element = getElementType(Heading, { as });

  const headingSize = size || HEADING_DEFAULT_SIZE_MAP[as];

  const classes = classNames(styles.heading, className, {
    [`font-size-${headingSize}`]: headingSize,
    [`font-color-${color}`]: color,
  });

  return createElement(element, { className: classes, children });
};

export default Heading;
