import { CSSProperties } from 'react';
import {
  StylesAndClasses,
  CssDimensionAbbreviation,
  ResponsiveProp,
  DimensionSize,
} from '../types';
import { doesStringIncludeCssUnit } from './doesStringIncludeCssUnit';
import { generateResponsiveClasses } from './generateResponsiveClasses';

export function getDimensionStyles(
  dimension: CssDimensionAbbreviation,
  value?: DimensionSize | ResponsiveProp<DimensionSize> | string,
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
      case 'minw':
        styles = { minWidth: value };
        break;
      case 'minh':
        styles = { minHeight: value };
        break;
      default:
        styles = { width: value };
    }
  }
  return styles;
}

export function getDimensionClasses(
  dimension: CssDimensionAbbreviation,
  value?: DimensionSize | ResponsiveProp<DimensionSize> | string,
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
 * @param {CssDimensionAbbreviation} dimension width or height
 * @param {string} [value] value of the dimension
 */
export function getDimensionCss(
  dimension: CssDimensionAbbreviation,
  value?: DimensionSize | ResponsiveProp<DimensionSize> | string,
): StylesAndClasses<CSSProperties> {
  return ({
    styles: getDimensionStyles(dimension, value),
    classes: getDimensionClasses(dimension, value),
  });
}
