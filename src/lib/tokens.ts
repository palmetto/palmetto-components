import sizes from '@palmetto/palmetto-design-tokens/build/js/variables-size';
import colors from '@palmetto/palmetto-design-tokens/build/js/variables-color';

const PALMETTO_COLOR_VALUES = Object.values(colors);
const PALMETTO_FONT_SIZE_OPTIONS = Object.keys(sizes.size.font);
const PALMETTO_BRAND_COLOR_OPTIONS = Object.keys(colors.color.brand);

export {
  PALMETTO_COLOR_VALUES,
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BRAND_COLOR_OPTIONS,
};
