import { PALMETTO_SPACING } from './tokens';
import { CssObjectType, SpacingType } from './types';

function getSpacingStyles(
  attribute: SpacingType,
  value: PALMETTO_SPACING | undefined,
): { [key: string]: string; } | undefined {
  if (value === undefined || typeof value !== 'string' || value !== 'inherit') {
    return undefined;
  }

  const property = attribute === 'p' ? 'padding' : 'margin';
  const styles = { [property]: 'inherit' };

  return styles;
}

function getSpacingClasses(attribute: SpacingType, value: PALMETTO_SPACING | undefined): string[] {
  if (value === undefined || typeof value !== 'string' || value === 'inherit') {
    return [];
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
 * @param {SpacingType} attribute margin or padding
 * @param {PALMETTO_SPACING} [value] spacing token value
 */
function getSpacingCss(attribute: SpacingType, value?: PALMETTO_SPACING | undefined): CssObjectType {
  return ({
    styles: getSpacingStyles(attribute, value),
    classes: getSpacingClasses(attribute, value),
  });
}

export default getSpacingCss;
