import sizes from '@palmetto/palmetto-design-tokens/build/json/values/variables-size.json';
import colors from '@palmetto/palmetto-design-tokens/build/json/values/variables-color.json';
import assets from '@palmetto/palmetto-design-tokens/build/json/variables-asset.json';
import { ICON_NAMES as iconNames } from '@palmetto/palmetto-design-tokens/build/icons';

import {
  BorderRadiusSize,
  BorderSize,
  BrandColor,
  Breakpoint,
  BreakpointSizeWithBase,
  BoxShadowSize,
  ColorName,
  FontColor,
  FontSize,
  FontFamily,
  FontWeight,
  HeightSize,
  LineHeightSize,
  SpacingSize,
  WidthSize,
  ZIndexSize,
  IconName,
  BackgroundColor,
} from '../types';

const { size } = sizes;
const { color } = colors;
const { asset } = assets;

export const ICON_NAMES = iconNames as IconName[];
export const BORDER_RADIUS_OPTIONS = Object.keys(size['border-radius']) as BorderRadiusSize[];
export const BORDER_RADIUS_VALUES = Object.values(size['border-radius']);

export const BORDER_SIZE_OPTIONS = Object.keys(size.border) as BorderSize[];
export const BORDER_SIZE_VALUES = Object.values(size.border);

export const BREAKPOINT_OPTIONS = Object.keys(size.breakpoint) as BreakpointSizeWithBase[];
export const BREAKPOINT_VALUES = Object.values(size.breakpoint);

export const BREAKPOINTS = [...Object.entries(size.breakpoint), ['base', 0]]
  .map(([name, value]) => ({
    name,
    minWidth: parseInt(value as string, 10),
  })) as Breakpoint[];

export const BRAND_COLOR_OPTIONS = (Object.keys(color.brand) as ColorName[])
  .map(colorName => (
    Object.keys(color.brand[colorName])
      .map(colorGrade => (colorGrade === 'base' ? colorName : `${colorName}-${colorGrade}`))
  )).flat() as BrandColor[];

export const BRAND_COLOR_NAMES = Object.keys(color.brand) as ColorName[];
export const BRAND_COLOR_VALUES = Object.values(color.brand);
export const BASE_BRAND_COLORS = Object.entries({ ...color.brand })
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value?.base }), {}) as { [c in ColorName]: string };

export const BACKGROUND_COLOR_OPTIONS = [...(Object.keys(color.background)), ...BRAND_COLOR_OPTIONS] as BackgroundColor[];

export const FONT_COLOR_OPTIONS = [...BRAND_COLOR_OPTIONS] as FontColor[];
export const FONT_COLOR_VALUES = color.brand;

export const FONT_SIZE_OPTIONS = Object.keys(size.font) as FontSize[];
export const FONT_SIZE_VALUES = size.font;

export const FONT_FAMILY_OPTIONS = Object.keys(asset.fonts) as FontFamily[];
export const FONT_FAMILY_VALUES = asset.fonts;

export const FONT_WEIGHT_OPTIONS = Object.keys(size['font-weight']) as FontWeight[];
export const FONT_WEIGHT_VALUES = size['font-weight'];

export const LINE_HEIGHT_OPTIONS = Object.keys(size['line-height']) as LineHeightSize[];
export const LINE_HEIGHT_VALUES = size['line-height'];

export const SPACING_OPTIONS = Object.keys(size.spacing) as SpacingSize[];
export const SPACING_VALUES = size.spacing;

export const WIDTH_OPTIONS = Object.keys(size.width) as WidthSize[];
export const WIDTH_VALUES = size.width;

export const HEIGHT_OPTIONS = Object.keys(size.height) as HeightSize[];
export const HEIGHT_VALUES = size.height;

export const Z_INDEX_OPTIONS = Object.keys(size['z-index']) as ZIndexSize[];
export const Z_INDEX_VALUES = size['z-index'];

export const BOX_SHADOW_OPTIONS = Object.keys(size['box-shadow']) as BoxShadowSize[];
export const BOX_SHADOW_VALUES = size['box-shadow'];
