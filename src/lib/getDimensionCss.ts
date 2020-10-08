import { CssStylesAndClasses, CssDimension, ResponsiveProp } from './types';
import { PalmettoTokensDimension } from './tokens';
import doesStringIncludeCssUnit from './doesStringIncludeCssUnit';
import generateResponsiveClasses from './generateResponsiveClasses';

function getDimensionStyles(
  dimension: CssDimension,
  value?: PalmettoTokensDimension | ResponsiveProp<PalmettoTokensDimension> | string,
): { [key: string]: string; } | undefined {
  if (value === undefined) return value;

  let styles;
  // value is a css unit so set its style property
  if (typeof value === 'string' && doesStringIncludeCssUnit(value)) {
    switch (dimension) {
      case 'h':
        styles = { height: value };
        break;
      case 'mw':
        styles = { maxWidth: value };
        break;
      case 'mh':
        styles = { maxHeight: value };
        break;
      default:
        styles = { width: value };
    }
  }
  return styles;
}

function getDimensionClasses(
  dimension: CssDimension,
  value?: PalmettoTokensDimension | ResponsiveProp<PalmettoTokensDimension> | string,
): string[] | undefined {
  if (value === undefined) return value;

  const classes = [];
  if (
    (typeof value === 'string' && !doesStringIncludeCssUnit(value))
    || (typeof value === 'object' && Object.values(value).every(v => !doesStringIncludeCssUnit(v)))
  ) {
    classes.push(...generateResponsiveClasses(dimension, value));
  }

  return classes;
}
/**
 * Returns an object of styles and class names that correspond with the given value
 * @param {CssDimension} dimension width or height
 * @param {string} [value] value of the dimension
 */
function getDimensionCss(
  dimension: CssDimension,
  value?: PalmettoTokensDimension | ResponsiveProp<PalmettoTokensDimension> | string,
): CssStylesAndClasses {
  return ({
    styles: getDimensionStyles(dimension, value),
    classes: getDimensionClasses(dimension, value),
  });
}

export default getDimensionCss;
