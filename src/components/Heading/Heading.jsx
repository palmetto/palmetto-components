import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { size as palmettoSizes } from '@palmetto/palmetto-design-tokens/build/js/variables-size';
import { color as palmettoColors } from '@palmetto/palmetto-design-tokens/build/js/variables-color';
import getElementType from '../../lib/getElementType';
import './Heading.scss';
import { HEADING_LEVELS } from './Heading.constants';

const PALMETTO_FONT_SIZES = Object.keys(palmettoSizes.font);
const PALMETTO_BRAND_COLORS = Object.keys(palmettoColors.brand);

/**
 * Use `Headings` as labels for pages or sections of a page that make up an interface.
 * `Headings` can label an entire page, or sections of related content.
 *
 * The `Heading` component allows you to specify an appropriate semantic element (h1-h6)
 * and independently set its size so that it is appropriate for the surrounding content.
 * If no size is specified, a default size will be applied.
 */
const Heading = props => {
  const {
    className,
    children,
    size,
    color,
  } = props;

  const Element = getElementType(Heading, props);

  const classes = classNames(className, 'heading', {
    [`font-size-${size}`]: size,
    [`font-color-${color}`]: color,
  });

  return <Element className={classes}>{children}</Element>;
};

Heading.propTypes = {
  as: PropTypes.oneOf(HEADING_LEVELS), // eslint-disable-line react/no-unused-prop-types
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(PALMETTO_BRAND_COLORS),
  size: PropTypes.oneOf(PALMETTO_FONT_SIZES),
};

Heading.defaultProps = {
  as: 'h4',
  className: '',
  color: '',
  size: '',
};

export default Heading;
