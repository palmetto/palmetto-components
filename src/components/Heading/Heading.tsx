import React, { createElement, ReactNode } from 'react';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';
import './Heading.scss';

/**
 * Use `Headings` as labels for pages or sections of a page that make up an interface.
 * `Headings` can label an entire page, or sections of related content.
 *
 * The `Heading` component allows you to specify an appropriate semantic element (h1-h6)
 * and independently set its size so that it is appropriate for the surrounding content.
 * If no size is specified, a default size will be applied.
 */

type HEADING_LEVELS_TYPE = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const HEADING_LEVELS: HEADING_LEVELS_TYPE[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']; // eslint-disable-line import/prefer-default-export

export const HEADING_DEFAULT_SIZE_MAP = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  h5: 'md',
  h6: 'sm',
};

interface Props {
  /**
   * The DOM tag or react component to use for the element.
   * Select the appropriate semantic element (h1-h6).
   */
  as?: HEADING_LEVELS_TYPE;
  /**
   * Additional class names to add
   */
  className?: string;
  /**
   * Heading contents
   */
  children?: ReactNode;
  /**
   * A color token identifier to use for the text color. Available colors found [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/color/brand.json) 
   */
  color?: string;
  /**
   * By default, size is determined by the chosen tag (e.g. h1 is bigger than h2).
   * However, size can be set independently so that its size is appropriate for the surrounding content.
   * Available sizes found [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/size/font.json)
   */
  size?: string;
};

const Heading: React.FC<Props> = ({
  as = 'h4',
  className,
  children,
  color,
  size,
}: Props) => {
  const element = getElementType(Heading, { as });

  const headingSize = size || HEADING_DEFAULT_SIZE_MAP[as];

  const classes = classNames('Palmetto-Heading', className, 'heading', {
    [`font-size-${headingSize}`]: headingSize,
    [`font-color-${color}`]: color,
  });

  return createElement(element, { className: classes, children, });
};

export default Heading;
