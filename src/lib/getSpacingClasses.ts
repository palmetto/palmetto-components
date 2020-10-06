import { CssSpacing, SpacingFormat } from './types';
import { BreakpointOption } from './tokens';

function isValidSpacingValue(value?: SpacingFormat): boolean {
  if (
    value === undefined
    || value === null
    || (typeof value !== 'string' && typeof value !== 'object')
  ) {
    return false;
  }

  return true;
}

function generateBaseClasses(attribute: CssSpacing, value: SpacingFormat): string[] {
  if (typeof value !== 'string') return [];

  const classes: string[] = [];

  const shorthand: { [key: number]: string[]; } = {
    2: ['v', 'h'],
    3: ['top', 'h', 'bottom'],
    4: ['top', 'right', 'bottom', 'left'],
  };

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

function getSpacingClasses(attribute: CssSpacing, value?: SpacingFormat): string[] {
  if (!isValidSpacingValue(value)) return [];

  const classes: string[] = [];

  if (typeof value === 'object') {
    Object.keys(value).forEach(key => {
      const baseClasses = generateBaseClasses(attribute, value[key as BreakpointOption]);
      const responsiveClasses = baseClasses?.map(baseClass => (key === 'base' ? baseClass : `${baseClass}-${key}`));
      classes.push(...responsiveClasses);
    });
  } else if (typeof value === 'string') {
    classes.push(...generateBaseClasses(attribute, value));
  }

  return classes;
}

export default getSpacingClasses;
