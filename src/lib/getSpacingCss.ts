import { valueContainerCSS } from 'react-select/src/components/containers';
import { CssStylesAndClasses, CssSpacing, SpacingFormat } from './types';

function validateValue(value: SpacingFormat, isValid: boolean, returnValueIfTrue: [] | undefined) {
  if (
    value === undefined
    || value === null
    || value === 'inherit'
    || (typeof value !== 'string' && typeof value !== 'object')
  ) {
    return [];
  }
}
function getSpacingStyles(
  attribute: CssSpacing,
  value?: SpacingFormat,
): { [key: string]: string; } | undefined {
  if (value === undefined || typeof value !== 'string' || value !== 'inherit') {
    return undefined;
  }

  const property = attribute === 'p' ? 'padding' : 'margin';
  const styles = { [property]: 'inherit' };

  return styles;
}

function getSpacingClasses(attribute: CssSpacing, value?: SpacingFormat): string[] {
  if (
    value === undefined
    || value === null
    || value === 'inherit'
    || (typeof value !== 'string' && typeof value !== 'object')
  ) {
    return [];
  }

  if (typeof value === 'object') {

  }

  const classes = [];
  const shorthand: { [key: number]: string[]; } = {
    2: ['v', 'h'],
    3: ['top', 'h', 'bottom'],
    4: ['top', 'right', 'bottom', 'left'],
  };

  // value is css shorthand
  if (value.includes(' ') && value.split(' ').length > 1) {
    const sides = value.split(' ');

    sides.forEach((v, index) => {
      if (v !== '0') {
        classes.push(`${attribute}-${shorthand[sides.length][index]}-${v}`);
      }
    });
  } else {
    classes.push(`${attribute}-${value}`);
  }

  return classes;
}

/**
 * Returns an object of styles and class names that correspond with the given value
 * @param {CssSpacing} attribute margin or padding
 * @param {PALMETTO_SPACING} [value] spacing token value
 */
function getSpacingCss(attribute: CssSpacing, value?: SpacingFormat): CssStylesAndClasses {
  return ({
    styles: getSpacingStyles(attribute, value),
    classes: getSpacingClasses(attribute, value),
  });
}

export default getSpacingCss;
