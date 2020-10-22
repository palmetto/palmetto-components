import { size } from '@palmetto/palmetto-design-tokens/build/json/variables-size.json';
import { color } from '@palmetto/palmetto-design-tokens/build/json/variables-color.json';

import {
  BorderRadiusSize,
  BrandColor,
  Breakpoint,
  BreakpointSizeWithBase,
  ColorName,
  FontColor,
  FontSize,
  FontWeight,
  HeightSize,
  SpacingSize,
  UnknownPropertiesObjType,
  WidthSize,
  ZIndexSize,
} from '../types';

export const BORDER_RADIUS_OPTIONS = Object.keys(size['border-radius']) as BorderRadiusSize[];
export const BORDER_RADIUS_VALUES = Object.values(size['border-radius']);

export const BREAKPOINT_OPTIONS = Object.keys(size.breakpoint) as BreakpointSizeWithBase[];
export const BREAKPOINT_VALUES = Object.values(size.breakpoint);

export const BREAKPOINTS = [...Object.entries(size.breakpoint), ['base', { original: { value: 0 } }]]
  .map((entry: UnknownPropertiesObjType) => ({
    name: entry[0],
    minWidth: parseInt(entry[1].original.value, 10),
  })) as Breakpoint[];

export const BRAND_COLOR_OPTIONS = (Object.keys(color.brand) as ColorName[])
  .map(colorName => (
    Object.keys(color.brand[colorName])
      .map(colorGrade => (colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`))
  )).flat() as BrandColor[];

// export const BRAND_COLOR_OPTIONS = [...BRAND_COLORS] as BrandColor[];
export const BRAND_COLOR_NAMES = Object.keys(color.brand) as ColorName[];
export const BRAND_COLOR_VALUES = Object.values(color.brand);
export const BRAND_COLORS = color.brand;

export const FONT_COLOR_OPTIONS = [...BRAND_COLOR_OPTIONS] as FontColor[];
export const FONT_COLOR_VALUES = Object.values(color.font);

export const FONT_SIZE_OPTIONS = Object.keys(size.font) as FontSize[];
export const FONT_SIZE_VALUES = Object.values(size.font);

export const FONT_WEIGHT_OPTIONS = Object.keys(size['font-weight']) as FontWeight[];
export const FONT_WEIGHT_VALUES = Object.values(size['font-weight']);

export const SPACING_OPTIONS = Object.keys(size.spacing) as SpacingSize[];
export const SPACING_VALUES = Object.values(size.spacing);

export const WIDTH_OPTIONS = Object.keys(size.width) as WidthSize[];
export const WIDTH_VALUES = Object.values(size.width);

export const HEIGHT_OPTIONS = Object.keys(size.height) as HeightSize[];
export const HEIGHT_VALUES = Object.values(size.height);

export const Z_INDEX_OPTIONS = Object.keys(size['z-index']) as ZIndexSize[];
export const Z_INDEX_VALUES = Object.values(size['z-index']);
