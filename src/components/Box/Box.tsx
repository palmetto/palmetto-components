import {
  createElement,
  cloneElement,
  FC,
  ReactNode,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  PALMETTO_FONT_SIZES,
  PALMETTO_FONT_COLORS,
  PALMETTO_COLORS,
  PALMETTO_SPACING,
} from '../../lib/tokens';
import {
  DisplayType,
  SpacingFormat,
  CssJustifyContent,
  CssAlignContent,
  CssAlign,
  ResponsiveGeneric,
  CssFlexDirection,
  CssFlex,
  ResponsiveFlex,
  ResponsiveSpacing,
  ResponsiveBoolean,
} from '../../lib/types';
import useBreakpoint from '../../hooks/useBreakpoint';
import getDimensionCss from '../../lib/getDimensionCss';
import getSpacingClasses from '../../lib/getSpacingClasses';
import getElementType from '../../lib/getElementType';
import getFlexCss from '../../lib/getFlexCss';
import generateResponsiveClasses from '../../lib/generateResponsiveClasses';

type MultiPurposeStyleProp =
  string |
  boolean |
  ResponsiveGeneric |
  ResponsiveFlex |
  ResponsiveBoolean |
  undefined;

export interface BoxProps {
  /**
   * The element type to be rendered.
   */
  as?: string;
  /**
   * How to align the contents along the cross axis.
   */
  alignItems?: CssAlign | ResponsiveGeneric;
  /**
   * How to align the contents when there is extra space in the cross axis.
   * This property has no effect when there is only one line of flex items.
   */
  alignContent?: CssAlignContent | ResponsiveGeneric;
  /**
   * How to align along the cross axis when contained in a Box.
   * This allows the default alignment (or the one specified by `align`) to be overridden for the individual Box.
   */
  alignSelf?: CssAlign | ResponsiveGeneric;
  /**
   * Any valid [brand color token](/?path=/docs/design-tokens-colors--brand), or a `url()` for an image
   */
  background?: PALMETTO_COLORS;
  /**
   * Any valid [brand color token](/?path=/docs/design-tokens-colors--brand) for the border color
   */
  border?: PALMETTO_COLORS;
  /**
   * Additional class names to add
   */
  className?: string;
  /**
   * The amount of spacing between child elements.
   * Can be a single [spacing value](?path=/docs/design-tokens-spacing--page).
   */
  childGap?: PALMETTO_SPACING | ResponsiveSpacing;
  /**
   * The box's contents
   */
  children?: ReactNode;
  /**
   * A color token identifier to use for the text color.
   */
  color?: PALMETTO_FONT_COLORS;
  /**
   * Sets how flex items are placed inside the Box, defining the main axis and the direction
   */
  direction?: CssFlexDirection | ResponsiveGeneric;
  /**
   * Display property. Only select values supported.
   */
  display?: DisplayType | ResponsiveGeneric;
  /**
   * Can be used as shorthand for the flexbox css properties `flex-grow`, `flex-shrink`, `flex-basis`
   */
  flex?: CssFlex | ResponsiveFlex;
  /**
   * The [font size token](/?path=/docs/design-tokens-font-size--page) identifier for the Box text
   */
  fontSize?: PALMETTO_FONT_SIZES | ResponsiveGeneric;
  /**
   * The height of the element. Can be given a standard css value (px, rem, em, %),
   * or a [height token](/?path=/docs/design-tokens-height--page)
   */
  height?: string | ResponsiveGeneric;
  /**
   * How space between and around content items is distributed along the main-axis a flex Box
   */
  justifyContent?: CssJustifyContent | ResponsiveGeneric;
  /**
   * Amount of space around the element.
   * Can be a single [spacing value](?path=/docs/design-tokens-spacing--page).
   * Can also be a string of [spacing value](?path=/docs/design-tokens-spacing--page)
   * that models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element.It is shorthand for top, right, bottom, left.
   */
  margin?: SpacingFormat;
  /**
   * The maximum height of the element. Can be given a standard css value (px, rem, em, %),
   * or a [height token](/?path=/docs/design-tokens-height--page)
   */
  maxHeight?: string | ResponsiveGeneric;
  /**
   * The maximum width of the element. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/docs/design-tokens-width--page)
   */
  maxWidth?: string | ResponsiveGeneric;
  /**
   * The overflow property is specified as one or two keywords.
   * If two keywords are specified, the first applies to overflow-x and the second to overflow-y.
   * Otherwise, both overflow-x and overflow-y are set to the same value.
   */
  overflow?:
  'visible'
  | 'hidden'
  | 'clip'
  | 'scroll'
  | 'auto'
  | 'inherit'
  | 'initial'
  | 'unset';
  /**
   * Amount of space within the element around the Box contents.
   * Can be a single [spacing value](?path=/docs/design-tokens-spacing--page).
   * Can also be a string of [spacing value](?path=/docs/design-tokens-spacing--page)
   * that models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element. It is shorthand for top, right, bottom, left.
   */
  padding?: SpacingFormat;
  /**
   * Set the radius of all corners
   */
  radius?: string; // need to define based on design tokens
  /**
   * By default, a Box's items will all try to fit onto one line.
   * Change that and allow the items to wrap as needed wrap
   */
  wrap?: boolean | ResponsiveBoolean;
  /**
   * The width of the element. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/docs/design-tokens-width--page)
   */
  width?: string | ResponsiveGeneric;
}

/**
 * A `<Box>` is a layout component to build UIs with consistent padding and spacing between
 * elements.
 */
const Box: FC<BoxProps> = ({
  as = 'div',
  alignItems = undefined,
  alignContent = undefined,
  alignSelf = undefined,
  background = undefined,
  border = undefined,
  children = undefined,
  childGap = undefined,
  className = '',
  color = undefined,
  display = 'flex',
  direction = 'column',
  flex = undefined,
  fontSize = 'inherit',
  height = undefined,
  justifyContent = undefined,
  margin = undefined,
  maxHeight = undefined,
  maxWidth = undefined,
  overflow = 'initial',
  padding = undefined,
  radius = undefined,
  wrap = undefined,
  width = undefined,
  ...restProps
}) => {
  const activeBreakpoint = useBreakpoint();
  const [activeWidth, setActiveWidth] = useState<string | undefined>(undefined);
  const [activeHeight, setActiveHeight] = useState<string | undefined>(undefined);
  const [activeMaxWidth, setActiveMaxWidth] = useState<string | undefined>(undefined);
  const [activeMaxHeight, setActiveMaxHeight] = useState<string | undefined>(undefined);
  const [activeFlex, setActiveFlex] = useState<string | undefined>(undefined);
  const [activeChildGap, setActiveChildGap] = useState<string | undefined>(undefined);
  const [activeWrap, setActiveWrap] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const getProp = (prop?: MultiPurposeStyleProp) => {
      if (typeof prop === 'string' || prop === undefined || typeof prop === 'boolean') { 
        return prop;
      }

      return prop[activeBreakpoint.name];
    };

    setActiveWidth(getProp(width) as string);
    setActiveHeight(getProp(height) as string);
    setActiveMaxWidth(getProp(maxWidth) as string);
    setActiveMaxHeight(getProp(maxHeight) as string);
    setActiveFlex(getProp(flex) as string);
    setActiveChildGap(getProp(childGap) as string);
    setActiveWrap(getProp(wrap) as boolean);
  }, [activeBreakpoint, width, height, maxWidth, maxHeight, flex, childGap, wrap]);

  const heightCss = getDimensionCss('h', activeHeight);
  const widthCss = getDimensionCss('w', activeWidth);
  const maxHeightCss = getDimensionCss('mh', activeMaxHeight);
  const maxWidthCss = getDimensionCss('mw', activeMaxWidth);
  const flexCss = getFlexCss(activeFlex);

  const wrapClass = typeof display === 'string' && display.includes('flex') && activeWrap ? 'flex-wrap' : 'flex-nowrap';

  const boxClasses = classNames(
    className,
    wrapClass,
    getSpacingClasses('m', margin),
    getSpacingClasses('p', padding),
    heightCss.classes,
    maxHeightCss.classes,
    maxWidthCss.classes,
    widthCss.classes,
    flexCss.classes,
    generateResponsiveClasses('display', display),
    generateResponsiveClasses('flex-direction', direction),
    generateResponsiveClasses('justify-content', justifyContent),
    generateResponsiveClasses('align-items', alignItems),
    generateResponsiveClasses('align-content', alignContent),
    generateResponsiveClasses('align-self', alignSelf),
    generateResponsiveClasses('font-size', fontSize),
    generateResponsiveClasses('overflow', overflow),
    {
      [`background-color-${background}`]: background,
      [`border-color-${border}`]: border,
      [`font-color-${color}`]: color,
      [`border-radius-${radius}`]: radius,
    },
  );

  const boxStyles = {
    ...heightCss.styles,
    ...maxHeightCss.styles,
    ...maxWidthCss.styles,
    ...widthCss.styles,
    ...flexCss.styles,
    ...border && { borderWidth: '1px', borderStyle: 'solid' },
  };

  const childGapClass = classNames({
    [`m-bottom-${activeChildGap}`]: activeChildGap && typeof direction === 'string' && direction.includes('column'),
    [`m-right-${activeChildGap}`]: activeChildGap && typeof direction === 'string' && direction.includes('row'),
  });

  let decoratedChildren = children;

  /**
   * Shallow merges existing classes of child node with a className based on the childGap value.
   */
  const decorateChildren = (child: ReactElement, i: number, childrenArr: ReactElement[]) => {
    if (i === childrenArr.length - 1 || !child) return child; // Not gap if child is last element.

    const childClasses = classNames(child.props.className, childGapClass);

    return cloneElement(child, {
      className: childClasses,
      key: child.key ?? i,
    });
  };

  if (childGapClass && Array.isArray(children)) {
    decoratedChildren = (children as ReactElement[]).map(decorateChildren);
  }

  const element = getElementType(Box, { as });

  return createElement(
    element,
    { className: boxClasses, style: boxStyles, ...restProps },
    decoratedChildren,
  );
};

export default Box;
