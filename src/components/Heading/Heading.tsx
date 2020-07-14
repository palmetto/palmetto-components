import React, { createElement } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import classNames from 'classnames';
import { PALMETTO_FONT_SIZE_OPTIONS, PALMETTO_BRAND_COLOR_OPTIONS } from '../../lib/tokens';
import getElementType from '../../lib/getElementType';
import './Heading.scss';
import { HEADING_LEVELS } from './Heading.constants';

/**
 * Use `Headings` as labels for pages or sections of a page that make up an interface.
 * `Headings` can label an entire page, or sections of related content.
 *
 * The `Heading` component allows you to specify an appropriate semantic element (h1-h6)
 * and independently set its size so that it is appropriate for the surrounding content.
 * If no size is specified, a default size will be applied.
 */

const propTypes = {
  /**
   * The DOM tag or react component to use for the element.
   * Select the appropriate semantic element (h1-h6).
   */
  as: PropTypes.oneOf(HEADING_LEVELS).isRequired, // eslint-disable-line react/no-unused-prop-types
  /**
   * Additional class names to add
   */
  className: PropTypes.string.isRequired,
  /**
   * Heading contents
   */
  children: PropTypes.node.isRequired,
  /**
   * A color token identifier to use for the text color.
   */
  color: PropTypes.oneOf(PALMETTO_BRAND_COLOR_OPTIONS).isRequired,
  /**
   * By default, size is determined by the chosen tag (e.g. h1 is bigger than h2).
   * However, size can be set independently so that its size is appropriate for the surrounding content.
   */
  size: PropTypes.oneOf(PALMETTO_FONT_SIZE_OPTIONS).isRequired,
};

const defaultProps = {
  as: 'h4',
  className: '',
  color: 'dark',
  size: 'lg',
};

const Heading = ({
  as,
  className,
  children,
  color,
  size,
}: InferProps<typeof propTypes>) => {
  const element = getElementType(Heading, { as });

  const classes = classNames('Palmetto-Heading', className, 'heading', {
    [`font-size-${size}`]: size,
    [`font-color-${color}`]: color,
  });

  return createElement(element, { className: classes, children, });
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
