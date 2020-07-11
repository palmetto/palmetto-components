import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BRAND_COLOR_OPTIONS,
  PALMETTO_SPACING_VALUES,
} from '../../lib/tokens';
import getElementType from '../../lib/getElementType';
import BorderType from '../../types';
/**
 * A `<Box>` is a layout component to build UIs with consistent padding and spacing between
 * elements.
 */
function Box(props) {
  const {
    a11yTitle,
    align,
    alignContent,
    alignSelf,
    as,
    background,
    basis,
    border,
    color,
    className,
    childGap,
    children,
    flex,
    fontSize,
    height,
    justify,
    margin,
    overflow,
    padding,
    radius,
    wrap,
    width,
    ...rest
  } = props;

  const Element = getElementType(Box, props);

  const classes = classNames(className, {
    [`font-size-${fontSize}`]: fontSize,
    [`font-color-${color}`]: color,
  });

  return (
    <Element
      aria-label={a11yTitle}
      className={classes}
      {...rest}
    >
      {children}
    </Element>
  );
}

Box.propTypes = {
  /**
   * Custom label to be used by screen readers. When provided, an aria-label will be added to the element.
   */
  a11yTitle: PropTypes.string,
  /**
   * How to align the contents along the cross axis.
   */
  align: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  /**
   * How to align the contents when there is extra space in the cross axis
   */
  alignContent: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'between',
    'around',
    'stretch',
  ]),
  /**
   * How to align along the cross axis when contained in a Box or along the column axis when contained in a Grid.
   */
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  /**
   * The DOM tag or react component to use for the element.
   */
  as: PropTypes.elementType,
  /**
   * Any valid color token, or a `url()` for an image
   */
  background: PropTypes.oneOf([]),
  /**
   * The default size of an element before the remaining space is distributed
   */
  basis: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'full', '1/2', '1/4', '3/4', '1/3', '2/3']),
    PropTypes.string,
  ]),
  /**
   * Apply a border to the element
   */
  border: BorderType,
  /**
   * Additional class names to add
   */
  className: PropTypes.string,
  /**
   * The amount of spacing between child elements.
   */
  childGap: PropTypes.string,
  /**
   * The box's contents
   */
  children: PropTypes.node,
  /**
   * A color token identifier to use for the text color.
   */
  color: PropTypes.oneOf(PALMETTO_BRAND_COLOR_OPTIONS),
  /**
   * Sets how flex items are placed inside the Box, defining the main axis and the direction
   */
  direction: PropTypes.oneOf([
    'row',
    'column',
    'row-responsive',
    'row-reverse',
    'column-reverse',
  ]),
  /**
   * Make the Box a flex container, and its children a flex item.
   * Can be used as shorthand for the flexbox css properties `flex-grow` and `flex-shrink`
   */
  flex: PropTypes.oneOf([
    'grow',
    'shrink',
    true,
    false,
    PropTypes.exact({
      grow: PropTypes.number,
      shrink: PropTypes.number,
    }),
  ]),
  /**
   * The font size for the Box contents
   */
  fontSize: PropTypes.oneOf(PALMETTO_FONT_SIZE_OPTIONS), // need to define based on design tokens
  /**
   * The height of the element
   */
  height: PropTypes.string, // need to define based on design tokens
  /**
   * How space between and around content items is distributed along the main-axis a flex Box
   */
  justify: PropTypes.oneOf([
    'around',
    'between',
    'center',
    'end',
    'evenly',
    'start',
    'stretch',
  ]),
  /**
   * Amount of space around the element. It models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element. It is shorthand for top, right, bottom, left.
   */
  margin: PropTypes.number, // need to define based on design tokens
  /**
   * Click handler function
   */
  onClick: PropTypes.func,
  /**
   * The overflow property is specified as one or two keywords.
   * If two keywords are specified, the first applies to overflow-x and the second to overflow-y.
   * Otherwise, both overflow-x and overflow-y are set to the same value.
   */
  overflow: PropTypes.oneOf([
    'visible',
    'hidden',
    'clip',
    'scroll',
    'auto',
    'inherit',
    'initial',
    'unset',
  ]),
  /**
   * Amount of space within the element around the Box contents. It models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element. It is shorthand for top, right, bottom, left.
   */
  padding: PropTypes.number, // need to define based on design tokens
  /**
   * Set the radius of all corners
   */
  radius: PropTypes.string, // need to define based on design tokens
  wrap: PropTypes.oneOf([true, false, 'reverse']),

  /**
   * The width of the element
   */
  width: PropTypes.string, // need to define based on design tokens
};

Box.defaultProps = {
  a11yTitle: undefined,
  align: undefined,
  alignContent: undefined,
  alignSelf: undefined,
  as: 'div',
  background: undefined,
  basis: undefined,
  border: 'none',
  className: undefined,
  childGap: undefined,
  children: undefined,
  color: undefined,
  direction: undefined,
  flex: undefined,
  fontSize: 'inherit',
  height: undefined,
  justify: undefined,
  margin: 0,
  onClick: undefined,
  overflow: 'unset',
  padding: 0,
  radius: 0,
  wrap: false,
  width: undefined,
};

export default Box;
