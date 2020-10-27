import { FC, createElement, ReactNode } from 'react';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';

import {
  FontColor,
  FontSize,
} from '../../types';
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
   * A variant token identifier to use for the text variant. Available variants found:
   * [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/variant/font.json).
   */
  variant?: FontColor;
  /**
   * By default, size is determined by the chosen tag (e.g. h1 is bigger than h2).
   * However, size can be set independently so that its size is appropriate for the surrounding content.
   * Available sizes found:
   * [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/size/font.json).
   */
  size?: FontSize;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const Heading: FC<HeadingProps> = ({
  as = 'h4',
  children,
  className,
  variant,
  size,
  ...restProps
}) => {
  const element = getElementType(Heading, { as });

  const headingSize = size || HEADING_DEFAULT_SIZE_MAP[as];

  const classes = classNames(styles.heading, className, {
    [`font-size-${headingSize}`]: headingSize,
    [`font-color-${variant}`]: variant,
  });

  return createElement(element, { className: classes, children, ...restProps });
};

export default Heading;
