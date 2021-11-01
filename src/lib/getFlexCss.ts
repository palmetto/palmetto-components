import { StylesAndClasses, FlexProperty, ResponsiveProp } from '../types';
import { doesStringIncludeCssUnit } from './doesStringIncludeCssUnit';

const flexValues = ['initial', 'auto', 'unset', 'none', 'inherit'];

export function parsePropertyValue(value: string): string | number {
  return Number.isNaN(Number(value)) ? value : Number(value);
}

export function getFlexStyles(value?: string): FlexProperty | undefined {
  if (value === undefined) return value;

  const styles: FlexProperty = {};

  // Single value
  if (!value.includes(' ') && !flexValues.includes(value)) {
    styles.flex = value;
    return styles;
  }

  // CSS shorthand
  if (value.includes(' ')) {
    const flexProps = value.split(' ');
    styles.flexGrow = parsePropertyValue(flexProps[0]);

    if (flexProps.length === 2) {
      if (doesStringIncludeCssUnit(flexProps[1])) {
        styles.flexBasis = parsePropertyValue(flexProps[1]);
      } else {
        styles.flexShrink = parsePropertyValue(flexProps[1]);
      }
    } else if (flexProps.length === 3) {
      styles.flexShrink = parsePropertyValue(flexProps[1]);
      styles.flexBasis = parsePropertyValue(flexProps[2]);
    }
  }

  return styles;
}

export function getFlexClasses(value?: string): string[] | undefined {
  if (value === undefined || value.split(' ').length > 1) return [];

  const classes = [];
  if (typeof value === 'string' && !doesStringIncludeCssUnit(value) && Number.isNaN(Number(value))) {
    classes.push(`flex-${value}`);
  }

  return classes;
}

/**
 * Returns an object of styles and class names that correspond with the given flex value
 * @param {string} [value] spacing token value
 */
export function getFlexCss(value?: ResponsiveProp<FlexProperty> | string): StylesAndClasses<FlexProperty> {
  return ({
    styles: getFlexStyles(value as string),
    classes: getFlexClasses(value as string),
  });
}
