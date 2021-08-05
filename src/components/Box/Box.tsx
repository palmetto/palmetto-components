import {
  createElement,
  cloneElement,
  FC,
  forwardRef,
  ReactNode,
  ReactElement,
  CSSProperties,
  Children,
} from 'react';
import * as CSS from 'csstype';
import classNames from 'classnames';
import {
  BaseSpacing,
  BorderRadiusSize,
  BorderSize,
  BoxShadowSize,
  BrandColor,
  BreakpointSizeWithBase,
  CssAlignContentValue,
  CssAlignItemsValue,
  CssDisplayValue,
  CssFlexDirectionValue,
  CssFlexValue,
  CssJustifyContentValue,
  CssOverflowValue,
  CssTextAlignValue,
  DimensionSize,
  FontColor,
  FontFamily,
  FontSize,
  FontWeight,
  ResponsiveProp,
  SpacingSize,
  ZIndexSize,
  KnownKeys,
} from '../../types';
import getDimensionCss from '../../lib/getDimensionCss';
import cssShorthandToClasses from '../../lib/cssShorthandToClasses';
import getElementType from '../../lib/getElementType';
import generateResponsiveClasses from '../../lib/generateResponsiveClasses';
import styles from './Box.module.scss';

export type HoverableBoxProperties = 'color' | 'borderColor' | 'shadow' | 'background';
export interface BoxProps {
  /**
   * The element type to be rendered.
   */
  as?: string;
  /**
   * How to align the contents along the cross axis.
   */
  alignItems?: CssAlignItemsValue | ResponsiveProp<CssAlignItemsValue>;
  /**
   * How to align the contents when there is extra space in the cross axis.
   * This property has no effect when there is only one line of flex items.
   */
  alignContent?: CssAlignContentValue | ResponsiveProp<CssAlignContentValue>;
  /**
   * How to align along the cross axis when contained in a Box.
   * This allows the default alignment (or the one specified by `align`) to be overridden for the individual Box.
   */
  alignSelf?: CssAlignItemsValue | ResponsiveProp<CssAlignItemsValue>;
  /**
   * Any valid [brand color token](/?path=/docs/design-tokens-colors--brand), or a `url()` for an image
   */
  background?: BrandColor;
  /**
   * Any valid [brand color token](/?path=/docs/design-tokens-colors--brand) for the border color
   * Or a responsive prop with BrandColor for each breakpoint.
   */
  borderColor?: BrandColor;
  /**
   * Width of the Box's border
   * Can be a single [border width token](/?path=/docs/design-tokens-border-width--page).
   * Can also be a string of [border width tokens](/?path=/docs/design-tokens-border-width--page)
   * that models itself after the css shorthand property,
   * where you can set the border width on all four sides of an element.
   * e.g: "0 sm xs 0" --> top: 0, right: sm, bottom: xs, left: 0;
   */
  borderWidth?: BorderSize | string | ResponsiveProp<BorderSize | string>;
  /**
   * Additional class names to add
   */
  className?: string;
  /**
   * The amount of spacing between child elements.
   * Can be a single [spacing value](/?path=/docs/design-tokens-spacing--page).
   * NOTE: this prop is incompatible with reverse flex direction values (row-reverse, column-reverse).
   */
  childGap?: SpacingSize | ResponsiveProp<SpacingSize>;
  /**
   * The box's contents
   */
  children?: ReactNode;
  /**
   * A color token identifier to use for the text color.
   */
  color?: FontColor;
  /**
   * Cursor style. Use any standard CSS value.
   */
  cursor?: CSS.Property.Cursor;
  /**
   * Sets how flex items are placed inside the Box, defining the main axis and the direction
   * NOTE: reverse directions are incompatible with the `childGap` prop.
   */
  direction?: CssFlexDirectionValue | ResponsiveProp<CssFlexDirectionValue>;
  /**
   * Display property. Only select values supported.
   */
  display?: CssDisplayValue | ResponsiveProp<CssDisplayValue>;
  /**
   * Can be used as shorthand for the flexbox css properties `flex-grow`, `flex-shrink`, `flex-basis`
   */
  flex?: CssFlexValue | ResponsiveProp<CssFlexValue>;
  /**
   * Pass style modifiers for focus states. The following properties can be modified on focus.
   * `* background`
   * `* borderColor`
   * `* borderWidth`
   * `* color`
   * `* shadow`
   */
  focus?: {
    background?: BoxProps['background'];
    borderColor?: BoxProps['borderColor'];
    borderWidth?: BoxProps['borderWidth'];
    color?: BoxProps['color'];
    shadow?: BoxProps['shadow'];
  };
  /**
   * The [font family token](/?path=/docs/design-tokens-font-family--page) identifier for the Box's text
   */
  fontFamily?: FontFamily | ResponsiveProp<FontFamily>;
  /**
   * The [font size token](/?path=/docs/design-tokens-font-size--page) identifier for the Box's text
   */
  fontSize?: FontSize | ResponsiveProp<FontSize>;
  /**
   * The [font weight token](/?path=/story/design-tokens-font-weight--page) identifier for the Box's text
   */
  fontWeight?: FontWeight | ResponsiveProp<FontWeight>;
  /**
   * The height of the element. Can be given a standard css value (px, rem, em, %),
   * or a [height token](/?path=/docs/design-tokens-height--page)
   */
  height?: DimensionSize | ResponsiveProp<DimensionSize> | string;
  /**
   * Pass style modifiers for hover states. The following properties can be modified on hover:
   * `* background`
   * `* borderColor`
   * `* borderWidth`
   * `* color`
   * `* fontSize`
   * `* shadow`
   */
  hover?: {
    background?: BoxProps['background'];
    borderColor?: BoxProps['borderColor'];
    borderWidth?: BoxProps['borderWidth'];
    color?: BoxProps['color'];
    fontSize?: BoxProps['fontSize'];
    shadow?: BoxProps['shadow'];
  };
  /**
   * How space between and around content items is distributed along the main-axis a flex Box
   */
  justifyContent?: CssJustifyContentValue | ResponsiveProp<CssJustifyContentValue>;
  /**
   * Amount of space around the element.
   * Can be a single [spacing value](?path=/docs/design-tokens-spacing--page).
   * Can also be a string of [spacing value](?path=/docs/design-tokens-spacing--page)
   * that models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element.It is shorthand for top, right, bottom, left.
   */
  margin?: BaseSpacing | ResponsiveProp<BaseSpacing>;
  /**
   * The maximum height of the element. Can be given a standard css value (px, rem, em, %),
   * or a [height token](/?path=/docs/design-tokens-height--page)
   */
  maxHeight?: DimensionSize | ResponsiveProp<DimensionSize> | string;
  /**
   * The minimum height of the element. Can be given a standard css value (px, rem, em, %),
   * or a [height token](/?path=/docs/design-tokens-height--page)
   */
  minHeight?: DimensionSize | ResponsiveProp<DimensionSize> | string;
  /**
   * The maximum width of the element. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/docs/design-tokens-width--page)
   */
  maxWidth?: DimensionSize | ResponsiveProp<DimensionSize> | string;
  /**
   * The minimum width of the element. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/docs/design-tokens-width--page)
   */
  minWidth?: DimensionSize | ResponsiveProp<DimensionSize> | string;
  /**
   * The css overflow behavior of the Box
   */
  overflow?: CssOverflowValue | ResponsiveProp<CssOverflowValue>;
  /**
   * Amount of space within the element around the Box contents.
   * Can be a single [spacing value](/?path=/docs/design-tokens-spacing--page).
   * Can also be a string of [spacing value](/?path=/docs/design-tokens-spacing--page)
   * that models itself after the css shorthand property,
   * where you can set the margin area on all four sides of an element. It is shorthand for top, right, bottom, left.
   */
  padding?: BaseSpacing | ResponsiveProp<BaseSpacing>;
  /**
   * CSS position property.
   */
  position?: CSS.Property.Position | ResponsiveProp<CSS.Property.Position>;
  /**
   * Set the radius of all corners
   */
  radius?: BorderRadiusSize | ResponsiveProp<BorderRadiusSize>;
  /**
   * The size of the drop shadow applied to the Box
   */
  shadow?: BoxShadowSize | ResponsiveProp<BoxShadowSize>;
  /**
   * CSS Style object
   */
  style?: CSSProperties;
  /**
   * the alignment of the text
   */
  textAlign?: CssTextAlignValue | ResponsiveProp<CssTextAlignValue>;
  /**
   * By default, a Box's items will all try to fit onto one line.
   * Change that and allow the items to wrap as needed wrap
   */
  wrap?: boolean | ResponsiveProp<boolean>;
  /**
   * The width of the element. Can be given a standard css value (px, rem, em, %),
   * or a [width token](/?path=/docs/design-tokens-width--page)
   */
  width?: DimensionSize | ResponsiveProp<DimensionSize> | string;
  /**
   * ZIndex value for the element. Can be one of the predetermined token values.
   * Can be responsive.
   */
  zIndex?: ZIndexSize | ResponsiveProp<ZIndexSize>;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

/**
 * A `<Box>` is a layout component to build UIs with consistent padding and spacing between
 * elements.
 */
export const Box: FC<BoxProps> = forwardRef((
  {
    as = 'div',
    alignItems = undefined,
    alignContent = undefined,
    alignSelf = undefined,
    background = undefined,
    borderColor = undefined,
    borderWidth = undefined,
    children = undefined,
    childGap = undefined,
    className = '',
    color = undefined,
    cursor = undefined,
    display = 'flex',
    direction = 'column',
    flex = undefined,
    fontFamily = undefined,
    fontSize = 'inherit',
    fontWeight = undefined,
    height = undefined,
    hover = undefined,
    focus = undefined,
    justifyContent = undefined,
    margin = undefined,
    maxHeight = undefined,
    minHeight = undefined,
    maxWidth = undefined,
    minWidth = undefined,
    overflow = undefined,
    padding = undefined,
    position = undefined,
    radius = undefined,
    shadow = undefined,
    style = {},
    textAlign = undefined,
    wrap = undefined,
    width = undefined,
    zIndex = undefined,
    ...restProps
  },
  ref,
) => {
  const heightCss = getDimensionCss('h', height);
  const widthCss = getDimensionCss('w', width);
  const maxHeightCss = getDimensionCss('mh', maxHeight);
  const maxWidthCss = getDimensionCss('mw', maxWidth);
  const minHeightCss = getDimensionCss('minh', minHeight);
  const minWidthCss = getDimensionCss('minw', minWidth);

  const isFlexBox = typeof display === 'string' && display.includes('flex');
  const flexDirectionClasses = isFlexBox ? generateResponsiveClasses('flex-direction', direction) : null;

  const cssPropertyMap: {
    [key: string]: {
      classPrefix: string;
      transformer: typeof generateResponsiveClasses | typeof cssShorthandToClasses;
    };
  } = {
    color: { classPrefix: 'font-color', transformer: generateResponsiveClasses },
    background: { classPrefix: 'background-color', transformer: generateResponsiveClasses },
    borderColor: { classPrefix: 'border-color', transformer: generateResponsiveClasses },
    borderWidth: { classPrefix: 'border-width', transformer: cssShorthandToClasses },
    shadow: { classPrefix: 'shadow', transformer: generateResponsiveClasses },
    fontSize: { classPrefix: 'font-size', transformer: generateResponsiveClasses },
  };

  const getStatefulClasses = (stateKey: 'hover' | 'focus', values: BoxProps['hover' | 'hover']) => values // eslint-disable-line
    ? Object.entries(values).map(([key, value]) => (
      cssPropertyMap[key].transformer(`${stateKey}:${cssPropertyMap[key as keyof BoxProps['focus' | 'hover']].classPrefix}`, value) // eslint-disable-line max-len
    ))
    : undefined;

  const hoverClasses = getStatefulClasses('hover', hover);
  const focusClasses = getStatefulClasses('focus', focus);

  const boxClasses = classNames(
    className,
    cssShorthandToClasses('m', margin),
    cssShorthandToClasses('p', padding),
    cssShorthandToClasses('br', radius),
    heightCss.classes,
    maxHeightCss.classes,
    minHeightCss.classes,
    maxWidthCss.classes,
    minWidthCss.classes,
    widthCss.classes,
    flexDirectionClasses,
    generateResponsiveClasses('display', display),
    generateResponsiveClasses('justify-content', justifyContent),
    generateResponsiveClasses('align-items', alignItems),
    generateResponsiveClasses('align-content', alignContent),
    generateResponsiveClasses('align-self', alignSelf),
    generateResponsiveClasses('font-family', fontFamily),
    generateResponsiveClasses('font-size', fontSize),
    generateResponsiveClasses('overflow', overflow),
    generateResponsiveClasses('shadow', shadow),
    generateResponsiveClasses('flex', flex),
    cssShorthandToClasses('border-width', borderWidth),
    generateResponsiveClasses('font-weight', fontWeight),
    generateResponsiveClasses('text-align', textAlign),
    generateResponsiveClasses('position', position),
    generateResponsiveClasses('z-index', zIndex),
    ...(hoverClasses ?? []),
    ...(focusClasses ?? []),
    {
      'flex-wrap': isFlexBox && wrap,
      'flex-nowrap': isFlexBox && wrap === false,
      [`background-color-${background}`]: background,
      [`font-color-${color}`]: color,
      [`border-color-${borderColor}`]: borderColor,
      [`cursor-${cursor}`]: cursor,
      [styles['box-transition']]: hover || focus,
    },
  );

  const boxStyles = {
    ...style,
    ...heightCss.styles,
    ...maxHeightCss.styles,
    ...maxWidthCss.styles,
    ...widthCss.styles,
    ...minHeightCss.styles,
    ...minWidthCss.styles,
  };

  /**
   * Creates an object that maps the flex direction to either `right` or `bottom`
   * so a margin can be applied to that side.
   */
  const generateChildGapDirection = (): ResponsiveProp<string> => {
    let childGapDirection = {};

    const getChildGapMarginDirection = (d: CssFlexDirectionValue) => {
      let marginDirection = '';
      if (d?.includes('row')) marginDirection = 'right';
      else if (d?.includes('column')) marginDirection = 'bottom';

      return marginDirection;
    };

    if (typeof direction === 'string') {
      childGapDirection = { base: getChildGapMarginDirection(direction) };
    } else if (typeof direction === 'object' && direction !== null) {
      childGapDirection = Object.keys(direction).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: getChildGapMarginDirection(direction[curr as BreakpointSizeWithBase]),
        }),
        {},
      );
    }

    return childGapDirection;
  };

  /**
   * Shapes the childGap prop into a ResponsiveSpacing object
   * so that we can cross-reference values between direction and childGap values to generate
   * responsive classes.
   */
  const generateChildGap = (): ResponsiveProp<SpacingSize> => {
    let childGapObj = {};

    if (typeof childGap === 'string') {
      childGapObj = { base: childGap };
    } else if (typeof childGap === 'object' && childGap !== null) {
      childGapObj = { ...childGap };
    }

    return childGapObj;
  };

  const childGapClasses: string[] = [];

  if (childGap && direction) {
    const childGapDirection = generateChildGapDirection();
    const childGapValues = generateChildGap();
    const breakpoints: BreakpointSizeWithBase[] = ['hd', 'desktop', 'tablet', 'base'];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findMatchingBreakpoint = (responsiveObj: ResponsiveProp<any>,
      key: BreakpointSizeWithBase): string => {
      const index = breakpoints.findIndex(breakpoint => breakpoint === key);
      let value = '';

      value = responsiveObj[key];

      if (!value) return findMatchingBreakpoint(responsiveObj, breakpoints[index + 1]);

      return value;
    };

    breakpoints.forEach(breakpoint => {
      const foundDirection = findMatchingBreakpoint(
        childGapDirection,
        breakpoint as BreakpointSizeWithBase,
      );
      const foundChildGap = findMatchingBreakpoint(
        childGapValues,
        breakpoint as BreakpointSizeWithBase,
      );

      const classSuffix = breakpoint === 'base' ? '' : `-${breakpoint}`;
      const oppositeDirection = foundDirection === 'bottom' ? 'right' : 'bottom';

      childGapClasses.push(`m-${foundDirection}-${foundChildGap}${classSuffix}`);
      childGapClasses.push(`m-${oppositeDirection}-0${classSuffix}`);
    });
  }

  /**
   * Shallow merges existing classes of child node with a className based on the childGap value.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decorateChildren = (child: string | number | ReactElement<any>, i: number, array: ReactElement<any>[]) => {
    if (
      i === array.length - 1
      || !child
      || typeof child === 'string'
      || typeof child === 'number'
    ) {
      return child; // Not gap if child is last element or if the children are strings or numbers.
    }

    const childClasses = classNames(child.props.className, [...new Set(childGapClasses)]);

    return cloneElement(child, {
      className: childClasses,
      key: child.key ?? i,
    });
  };

  let decoratedChildren = Children.toArray(children).filter(child => child !== null);

  if (childGapClasses && decoratedChildren.length > 1) {
    decoratedChildren = decoratedChildren
      .map((value, index, array) => decorateChildren(
        value as string | number | ReactElement<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
        index,
        array as ReactElement<any>[], // eslint-disable-line @typescript-eslint/no-explicit-any
      ));
  }

  const element = getElementType(Box, { as });

  return createElement(
    element,
    {
      className: boxClasses,
      style: boxStyles,
      ref,
      ...restProps,
    },
    children ? decoratedChildren : null,
  );
});

export const boxPropsKeys: (keyof Pick<BoxProps, KnownKeys<BoxProps>>)[] = [
  'as',
  'alignItems',
  'alignContent',
  'alignSelf',
  'background',
  'borderColor',
  'borderWidth',
  'className',
  'childGap',
  'children',
  'color',
  'cursor',
  'direction',
  'display',
  'flex',
  'focus',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'height',
  'hover',
  'justifyContent',
  'margin',
  'maxHeight',
  'minHeight',
  'maxWidth',
  'minWidth',
  'overflow',
  'padding',
  'position',
  'radius',
  'shadow',
  'style',
  'textAlign',
  'wrap',
  'width',
  'zIndex',
];
