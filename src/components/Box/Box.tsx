import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import {
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_FONT_COLORS,
  PALMETTO_BRAND_COLOR_OPTIONS,
  PALMETTO_BACKGROUND_COLOR_OPTIONS,
  PALMETTO_SPACING_SIZE_OPTIONS,
} from '../../lib/tokens';
import getElementType from '../../lib/getElementType';
// import BorderType from '../../types';

function getSpacingCss(attribute, value) {
  if (value === undefined) {
    return {
      styles: {},
      classes: [],
    };
  }

  const classes = [];
  let styles;

  // value is css shorthand
  if (value.split && value.split(' ').length > 1) {
    const side = value.split(' ');
    // x and y, e.g. 'xs sm'
    if (side.length === 2) {
      if (side[0] !== '0') classes.push(`${attribute}-v-${side[0]}`);
      if (side[1] !== '0') classes.push(`${attribute}-h-${side[1]}`);
    } else if (side.length === 3) { // top, horizontal, bottom
      if (side[0] !== '0') classes.push(`${attribute}-top-${side[0]}`);
      if (side[1] !== '0') classes.push(`${attribute}-h-${side[1]}`);
      if (side[2] !== '0') classes.push(`${attribute}-bottom-${side[2]}`);
    } else if (side.length === 4) { // top, right, bottom left
      if (side[0] !== '0') classes.push(`${attribute}-top-${side[0]}`);
      if (side[1] !== '0') classes.push(`${attribute}-right-${side[1]}`);
      if (side[2] !== '0') classes.push(`${attribute}-bottom-${side[2]}`);
      if (side[3] !== '0') classes.push(`${attribute}-left-${side[3]}`);
    }
  } else if (typeof value === 'string') {
    if (value === 'inherit') {
      styles = 'inherit';
    } else {
      classes.push(`${attribute}-${value}`);
    }
  }

  return ({
    styles,
    classes,
  });
}

interface BoxProps {
  /**
   * Custom label to be used by screen readers. When provided, an aria-label will be added to the element.
   */
  a11yTitle?: string;
  // /**
  //  * How to align the contents along the cross axis.
  //  */
  // align: PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
  // /**
  //  * How to align the contents when there is extra space in the cross axis
  //  */
  // alignContent: PropTypes.oneOf([
  //   'start',
  //   'center',
  //   'end',
  //   'between',
  //   'around',
  //   'stretch',
  // ]),
  // /**
  //  * How to align along the cross axis when contained in a Box or along the column axis when contained in a Grid.
  //  */
  // alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  /**
   * The DOM tag or react component to use for the element.
   */
  as?: elementType;
  /**
   * Any valid color token, or a `url()` for an image
   */
  background?: PALMETTO_BACKGROUND_COLOR_OPTIONS;
  // /**
  //  * The default size of an element before the remaining space is distributed
  //  */
  // basis: PropTypes.oneOfType([
  //   PropTypes.oneOf(['auto', 'full', '1/2', '1/4', '3/4', '1/3', '2/3']),
  //   PropTypes.string,
  // ]),
  /**
   * Any valid color token for the border color
   */
  border?: PALMETTO_BRAND_COLOR_OPTIONS;
  /**
   * Additional class names to add
   */
  className?: string;
  // /**
  //  * The amount of spacing between child elements.
  //  */
  // childGap: PropTypes.string,
  /**
   * The box's contents
   */
  children?: ReactNode;
  /**
   * A color token identifier to use for the text color.
   */
  color?: PALMETTO_FONT_COLORS;
  // /**
  //  * Sets how flex items are placed inside the Box, defining the main axis and the direction
  //  */
  // direction: PropTypes.oneOf([
  //   'row',
  //   'column',
  //   'row-responsive',
  //   'row-reverse',
  //   'column-reverse',
  // ]),
  // /**
  //  * Make the Box a flex container, and its children a flex item.
  //  * Can be used as shorthand for the flexbox css properties `flex-grow` and `flex-shrink`
  //  */
  // flex: PropTypes.oneOf([
  //   'grow',
  //   'shrink',
  //   true,
  //   false,
  //   PropTypes.exact({
  //     grow: PropTypes.number,
  //     shrink: PropTypes.number,
  //   }),
  // ]),
  /**
   * The font size for the Box contents
   */
  fontSize?: PALMETTO_FONT_SIZE_OPTIONS;
  // /**
  //  * The height of the element
  //  */
  // height: PropTypes.string, // need to define based on design tokens
  // /**
  //  * How space between and around content items is distributed along the main-axis a flex Box
  //  */
  // justify: PropTypes.oneOf([
  //   'around',
  //   'between',
  //   'center',
  //   'end',
  //   'evenly',
  //   'start',
  //   'stretch',
  // ]),
  /**
   * Amount of space around the element. It models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element.It is shorthand for top, right, bottom, left.
   */
  margin?: PALMETTO_SPACING_SIZE_OPTIONS;
  // /**
  //  * Click handler function
  //  */
  // onClick: PropTypes.func,
  // /**
  //  * The overflow property is specified as one or two keywords.
  //  * If two keywords are specified, the first applies to overflow-x and the second to overflow-y.
  //  * Otherwise, both overflow-x and overflow-y are set to the same value.
  //  */
  // overflow: PropTypes.oneOf([
  //   'visible',
  //   'hidden',
  //   'clip',
  //   'scroll',
  //   'auto',
  //   'inherit',
  //   'initial',
  //   'unset',
  // ]),
  /**
   * Amount of space within the element around the Box contents. It models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element. It is shorthand for top, right, bottom, left.
   */
  padding?: PALMETTO_SPACING_SIZE_OPTIONS;
  /**
   * Set the radius of all corners
   */
  radius?: string; // need to define based on design tokens
  // wrap: PropTypes.oneOf([true, false, 'reverse']),

  // /**
  //  * The width of the element
  //  */
  // width: PropTypes.string, // need to define based on design tokens
}


/**
 * A `<Box>` is a layout component to build UIs with consistent padding and spacing between
 * elements.
 */
const Box: FC<BoxProps> = ({
  a11yTitle,
  // align,
  // alignContent,
  // alignSelf,
  as = 'div',
  background,
  // basis,
  border,
  color,
  className,
  // childGap,
  children,
  // flex,
  fontSize = 'inherit',
  // height,
  // justify,
  margin,
  // overflow,
  padding,
  radius,
  // wrap,
  // width,
  ...rest
}) => {
  const Element = getElementType(Box, { as });

  const marginCss = getSpacingCss('m', margin);
  const paddingCss = getSpacingCss('p', padding);

  const classes = classNames(
    className,
    marginCss.classes,
    paddingCss.classes,
    {
      [`background-color-${background}`]: background,
      [`border-color-${border}`]: border,
      [`font-color-${color}`]: color,
      [`font-size-${fontSize}`]: fontSize,
      [`border-radius-${radius}`]: radius,
    },
  );

  const boxStyles = {};

  Object.assign(boxStyles, { margin: marginCss.styles });

  if (border) {
    Object.assign(boxStyles, {
      borderWidth: '1px',
      borderStyle: 'solid',
    });
  }

  return (
    <Element
      aria-label={a11yTitle}
      className={classes}
      style={boxStyles}
    >
      {children}
    </Element>
  );
};

export default Box;
