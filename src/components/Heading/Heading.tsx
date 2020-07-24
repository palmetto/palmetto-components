import { createElement, FC } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getElementType from '../../lib/getElementType';
import {
  PALMETTO_BRAND_COLOR_OPTIONS,
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_COLORS, PALMETTO_FONTS,
} from '../../lib/tokens';
import { HEADING_LEVELS_TYPE, HEADING_DEFAULT_SIZE_MAP, HEADING_LEVELS } from './Heading.constants';
import styles from './Heading.module.scss';

/**
 * Use `Headings` as labels for pages or sections of a page that make up an interface.
 * `Headings` can label an entire page, or sections of related content.
 *
 * The `Heading` component allows you to specify an appropriate semantic element (h1-h6)
 * and independently set its size so that it is appropriate for the surrounding content.
 * If no size is specified, a default size will be applied.
 */

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
   * A color token identifier to use for the text color. Available colors found:
   * [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/color/brand.json)
   */
  color?: PALMETTO_COLORS;
  /**
   * By default, size is determined by the chosen tag (e.g. h1 is bigger than h2).
   * However, size can be set independently so that its size is appropriate for the surrounding content.
   * Available sizes found:
   * [here](https://github.com/palmetto/palmetto-design-tokens/blob/develop/properties/size/font.json)
   */
  size?: PALMETTO_FONTS;
}

const Heading: FC<Props> = ({
  as = 'h4',
  className,
  children,
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

Heading.propTypes = {
  as: PropTypes.oneOf(HEADING_LEVELS),
  className: PropTypes.string,
  color: PropTypes.oneOf(PALMETTO_BRAND_COLOR_OPTIONS),
  size: PropTypes.oneOf(PALMETTO_FONT_SIZE_OPTIONS),
};

export default Heading;
