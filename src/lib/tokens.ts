import sizes from '@palmetto/palmetto-design-tokens/build/json/variables-size.json';
import colors from '@palmetto/palmetto-design-tokens/build/json/variables-color.json';
import {
  UnknownPropertiesObjType,
  BorderRadiusSize,
  BreakpointSizeWithBase,
  FontSize,
  FontColor,
  BrandColor,
  SpacingSize,
  Breakpoint,
  ColorName,
} from '../types';


export interface ColorDictionary {
  [name: ColorName]: ColorEntry;
}

export interface ColorEntry {
  base: ColorVariation;
}

export interface ColorVariation {
  attributes?: {
    font: string;
  };
  value: string;
}

export const BORDER_RADIUS_OPTIONS = Object.keys(sizes.size['border-radius']) as BorderRadiusSize[];
export const BORDER_RADIUS_VALUES = Object.values(sizes.size['border-radius']);

export const BREAKPOINT_OPTIONS = Object.keys(sizes.size.breakpoint) as BreakpointSizeWithBase[];
export const BREAKPOINT_VALUES = Object.values(sizes.size.breakpoint);

export const BREAKPOINTS = [...Object.entries(sizes.size.breakpoint), { name: 'base', minWidth: 0 }]
  .map((entry: UnknownPropertiesObjType) => ({
    name: entry[0],
    minWidth: parseInt(entry[1].original.value, 10),
  })) as Breakpoint[];

export const COLOR_VALUES = Object.values(colors.color);
export const BRAND_COLOR_VALUES = Object.values(colors.color.brand);
export const FONT_SIZE_OPTIONS = Object.keys(sizes.size.font) as FontSize[];
export const FONT_SIZE_VALUES = Object.values(sizes.size.font);
export const FONT_COLOR_OPTIONS = Object.keys(colors.color.brand) as FontColor[];

export const BRAND_COLOR_NAMES = Object.keys(colors.color.brand) as ColorName[];
export const BRAND_COLORS = colors.color.brand as ColorDictionary;
export const BACKGROUND_COLOR_OPTIONS = Object.keys(colors.color.brand) as BrandColor[];
export const BORDER_COLOR_OPTIONS = Object.keys(colors.color.brand);
export const SPACING_SIZE_OPTIONS = Object.keys(sizes.size.spacing) as SpacingSize[];

export const SPACING_OPTIONS = Object.keys(sizes.size.spacing);
export const SPACING_VALUES = Object.values(sizes.size.spacing);

export const WIDTH_OPTIONS = Object.keys(sizes.size.width);
export const WIDTH_VALUES = Object.values(sizes.size.width);

export const HEIGHT_OPTIONS = Object.keys(sizes.size.height);
export const HEIGHT_VALUES = Object.values(sizes.size.height);
