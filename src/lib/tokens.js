const { size: sizes } = require('@palmetto/palmetto-design-tokens/build/js/variables-size');
const { color: colors } = require('@palmetto/palmetto-design-tokens/build/js/variables-color');

const PALMETTO_COLOR_VALUES = Object.values(colors);
const PALMETTO_FONT_SIZE_OPTIONS = Object.keys(sizes.font);
PALMETTO_FONT_SIZE_OPTIONS.push('inherit');
const PALMETTO_BRAND_COLOR_OPTIONS = Object.keys(colors.brand);
PALMETTO_BRAND_COLOR_OPTIONS.push('inherit');

const PALMETTO_SPACING_VALUES = Object.values(sizes.spacing);

export {
  PALMETTO_COLOR_VALUES,
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BRAND_COLOR_OPTIONS,
  PALMETTO_SPACING_VALUES,
};
