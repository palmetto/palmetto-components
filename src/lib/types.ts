import {
  BreakpointOption,
  PalmettoTokensDimension,
  PalmettoTokensRadius,
  PALMETTO_SPACING,
} from './tokens';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownPropertiesObjType = { [key: string]: any; };

export interface FlexProperty {
  flexGrow?: number | string;
  flexShrink?: number | string;
  flexBasis?: number | string;
  flex?: number | string;
}
export interface CssStylesAndClasses {
  styles?: {
    [key: string]: string;
  };
  classes?: string[];
}

export interface FlexStylesAndClasses {
  styles?: FlexProperty;
  classes?: string[];
}

export type CssDimension = 'h' | 'w' | 'mw' | 'mh';

export type CssSpacing = 'm' | 'p';

export type CssJustifyContent =
  'space-around' |
  'space-between' |
  'center' |
  'flex-end' |
  'space-evenly' |
  'flex-start' |
  'stretch';

export type CssAlignContent =
  'flex-start' |
  'flex-end' |
  'center' |
  'stretch' |
  'space-between' |
  'space-around';

export type CssFlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

export type CssAlign =
  'flex-start' |
  'flex-end' |
  'center' |
  'baseline' |
  'stretch';

export type CssFlex =
  'auto' |
  'initial' |
  'none' |
  'inherit' |
  'unset' |
  string;

export type CssOverflow =
  'visible' |
  'hidden' |
  'clip' |
  'scroll' |
  'auto' |
  'inherit' |
  'initial' |
  'unset';

export type DisplayType = 'flex' | 'inline-flex' | 'block' | 'inline-block' | 'inline' | 'inherit';

export type BaseSpacing = 'base' | PALMETTO_SPACING | string | undefined;

export type ResponsiveSpacing = { [breakpoint in BreakpointOption]: BaseSpacing };

export type ResponsiveGeneric = { [breakpoint in BreakpointOption]: string };

export type ResponsiveFlex = { [breakpoint in BreakpointOption]: CssFlex };

export type ResponsiveBoolean = { [breakpoint in BreakpointOption]: boolean };

export type ResponsiveRadius = { [breakpoint in BreakpointOption]: PalmettoTokensRadius };

export type ResponsiveOverflow = { [breakpoint in BreakpointOption]: CssOverflow };

export type ResponsiveDimension = { [breakpoint in BreakpointOption]: PalmettoTokensDimension };

export type SpacingFormat = BaseSpacing | ResponsiveSpacing;
