import { CssObjectType, DimensionType } from './types';

function doesValueIncludeCssUnit(value: string): boolean {
  const cssUnits = ['px', 'em', 'rem', '%', 'vw', 'vh'];

  return cssUnits.some(unit => value.includes(unit));
}

function getDimensionStyles(dimension: DimensionType, value?: string): { [key: string]: string; } | undefined {
  if (value === undefined) return value;

  let styles;
  // value is a css unit so set its style property
  if (typeof value === 'string' && doesValueIncludeCssUnit(value)) {
    styles = dimension === 'w' ? { width: value } : { height: value };
  }

  return styles;
}

function getDimensionClasses(dimension: DimensionType, value?: string): string[] | undefined {
  if (value === undefined) return value;

  const classes = [];
  if (typeof value === 'string' && !doesValueIncludeCssUnit(value)) {
    classes.push(`${dimension}-${value}`);
  }

  return classes;
}
/**
 * Returns an object of styles and class names that correspond with the given value
 * @param {DimensionType} dimension width or height
 * @param {string} [value] value of the dimension
 */
function getDimensionCss(dimension: DimensionType, value?: string): CssObjectType {
  return ({
    styles: getDimensionStyles(dimension, value),
    classes: getDimensionClasses(dimension, value),
  });
}

export default getDimensionCss;
