import sizes from '@palmetto/palmetto-design-tokens/build/js/variables-size';
import colors from '@palmetto/palmetto-design-tokens/build/js/variables-color';

export type PALMETTO_COLORS =
  'primary' |
  'secondary' |
  'tertiary' |
  'grey' |
  'success' |
  'warning' |
  'danger' |
  'info' |
  'dark' |
  'light' |
  'black';

export type PALMETTO_FONT_SIZES =
  'xs' |
  'sm' |
  'md' |
  'lg' |
  'xl' |
  '2xl' |
  '3xl' |
  '4xl' |
  '5xl' |
  'base';

export type PALMETTO_FONT_COLORS =
  'base' |
  'inverse' |
  'primary' |
  'secondary' |
  'tertiary' |
  'success' |
  'warning' |
  'danger' |
  'grey' |
  'grey-light' |
  'grey-lighter' |
  'grey-dark' |
  'grey-darker';

export type PALMETTO_SPACING =
  '2xs' |
  'xs' |
  'sm' |
  'md' |
  'lg' |
  'xl' |
  '2xl' |
  '3xl' |
  '4xl' |
  '5xl' |
  'base';

export interface ColorDictionary {
  [name: string]: ColorEntry;
}

export interface ColorEntry {
  base: ColorVariation;
};

export interface ColorVariation {
  attributes?: {
    font: string;
  };
  value: string;
};

export const PALMETTO_COLOR_VALUES = Object.values(colors.color) as ColorDictionary[];
export const PALMETTO_FONT_SIZE_OPTIONS = Object.keys(sizes.size.font) as PALMETTO_FONT_SIZES[];
export const PALMETTO_FONT_COLOR_OPTIONS = Object.keys(colors.color.font) as PALMETTO_FONT_COLORS[];
export const PALMETTO_BRAND_COLOR_OPTIONS = Object.keys(colors.color.brand) as PALMETTO_COLORS[];
export const PALMETTO_BACKGROUND_COLOR_OPTIONS = Object.keys(colors.color.brand) as PALMETTO_COLORS[];
export const PALMETTO_SPACING_SIZE_OPTIONS = Object.keys(sizes.size.spacing) as PALMETTO_SPACING[];
