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

export type PALMETTO_FONTS =
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
export const PALMETTO_FONT_SIZE_OPTIONS = Object.keys(sizes.size.font) as PALMETTO_FONTS[];
export const PALMETTO_BRAND_COLOR_OPTIONS = Object.keys(colors.color.brand) as PALMETTO_COLORS[];
export const PALMETTO_BRAND_COLOR_VALUES = colors.brand;
