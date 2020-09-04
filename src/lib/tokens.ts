import sizes from '@palmetto/palmetto-design-tokens/build/js/variables-size';
import colors from '@palmetto/palmetto-design-tokens/build/js/variables-color';

export type PALMETTO_COLORS =
  'primary-lightest' |
  'primary-lighter' |
  'primary-light' |
  'primary' |
  'primary-dark' |
  'primary-darker' |
  'primary-darkest' |
  'secondary-lightest' |
  'secondary-lighter' |
  'secondary-light' |
  'secondary' |
  'secondary-dark' |
  'secondary-darker' |
  'secondary-darkest' |
  'tertiary-lightest' |
  'tertiary-lighter' |
  'tertiary-light' |
  'tertiary' |
  'tertiary-dark' |
  'tertiary-darker' |
  'tertiary-darkest' |
  'grey-lightest' |
  'grey-lighter' |
  'grey-light' |
  'grey' |
  'grey-dark' |
  'grey-darker' |
  'grey-darkest' |
  'success-lightest' |
  'success-lighter' |
  'success-light' |
  'success' |
  'success-dark' |
  'success-darker' |
  'success-darkest' |
  'warning-lightest' |
  'warning-lighter' |
  'warning-light' |
  'warning' |
  'warning-dark' |
  'warning-darker' |
  'warning-darkest' |
  'danger-lightest' |
  'danger-lighter' |
  'danger-light' |
  'danger' |
  'danger-dark' |
  'danger-darker' |
  'danger-darkest' |
  'info-lightest' |
  'info-lighter' |
  'info-light' |
  'info' |
  'info-dark' |
  'info-darker' |
  'info-darkest' |
  'dark' |
  'light' |
  'black' |
  'white';

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
  'grey-lightest' |
  'grey-lighter' |
  'grey-light' |
  'grey' |
  'grey-dark' |
  'grey-darker' |
  'grey-darkest';

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
}

export interface ColorVariation {
  attributes?: {
    font: string;
  };
  value: string;
}

export const PALMETTO_BORDER_RADIUS_OPTIONS = Object.keys(sizes.size['border-radius']);
export const PALMETTO_BORDER_RADIUS_VALUES = Object.values(sizes.size['border-radius']);

export const PALMETTO_BREAKPOINT_OPTIONS = Object.keys(sizes.size.breakpoint);
export const PALMETTO_BREAKPOINT_VALUES = Object.values(sizes.size.breakpoint);

export const PALMETTO_COLOR_VALUES = Object.values(colors.color) as ColorDictionary[];

export const PALMETTO_FONT_SIZE_OPTIONS = Object.keys(sizes.size.font) as PALMETTO_FONT_SIZES[];
export const PALMETTO_FONT_SIZE_VALUES = Object.values(sizes.size.font);
export const PALMETTO_FONT_COLOR_OPTIONS = Object.keys(colors.color.font) as PALMETTO_FONT_COLORS[];

export const PALMETTO_BRAND_COLOR_OPTIONS = Object.keys(colors.color.brand) as PALMETTO_COLORS[];
export const PALMETTO_BRAND_COLOR_VALUES = colors.color.brand;
export const PALMETTO_BACKGROUND_COLOR_OPTIONS = Object.keys(colors.color.brand) as PALMETTO_COLORS[];
export const PALMETTO_SPACING_SIZE_OPTIONS = Object.keys(sizes.size.spacing) as PALMETTO_SPACING[];

export const PALMETTO_SPACING_OPTIONS = Object.keys(sizes.size.spacing);
