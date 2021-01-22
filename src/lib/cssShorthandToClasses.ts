import {
  ResponsiveProp,
  BreakpointSizeWithBase,
} from '../types';

function isValidSpacingValue(value?: string | ResponsiveProp<string | undefined>): boolean {
  if (
    value === undefined
    || value === null
    || (typeof value !== 'string' && typeof value !== 'object')
  ) {
    return false;
  }

  return true;
}

function generateBaseClasses(
  attribute: string | undefined,
  value?: string | ResponsiveProp<string | undefined>,
): string[] {
  if (typeof value !== 'string') return [];

  const classes: string[] = [];

  const shorthand: { [key: number]: string[]; } = attribute === 'br' ? {
    /* top-left-and-bottom-right | top-right-and-bottom-left */
    2: ['top-left', 'top-right'],
    /* top-left | top-right-and-bottom-left | bottom-right */
    3: ['top-left', 'top-right', 'bottom-right'],
    4: ['top-left', 'top-right', 'bottom-right', 'bottom-left'],
  } : {
    2: ['v', 'h'],
    3: ['top', 'h', 'bottom'],
    4: ['top', 'right', 'bottom', 'left'],
  };

  if (attribute === 'br' && value.includes(' ') && value.split(' ').length > 1) {
    const corners = value.split(' ');

    corners.forEach((v, index) => {
      classes.push(`${attribute}-${shorthand[corners.length][index]}-${v}`);

      if (corners.length === 3 && index === 1) {
        classes.push(`${attribute}-bottom-left-${corners[index]}`);
      } else if (corners.length === 2 && index === 0) {
        classes.push(`${attribute}-bottom-right-${corners[index]}`);
      } else if (corners.length === 2 && index === 1) {
        classes.push(`${attribute}-bottom-left-${corners[index]}`);
      }
    });
  } else if (value.includes(' ') && value.split(' ').length > 1) {
    const sides = value.split(' ');

    sides.forEach((v, index) => {
      classes.push(`${attribute}-${shorthand[sides.length][index]}-${v}`);
    });
  } else {
    classes.push(`${attribute}-${value}`);
  }

  return classes;
}

function cssShorthandToClasses(
  attribute: string,
  value?: string | ResponsiveProp<string | undefined>,
): string[] {
  if (!isValidSpacingValue(value)) return [];

  const classes: string[] = [];

  if (typeof value === 'object') {
    Object.keys(value).forEach(key => {
      const baseClasses = generateBaseClasses(attribute, value[key as BreakpointSizeWithBase]);
      const responsiveClasses = baseClasses?.map(baseClass => (key === 'base' ? baseClass : `${baseClass}-${key}`));
      classes.push(...responsiveClasses);
    });
  } else if (typeof value === 'string') {
    classes.push(...generateBaseClasses(attribute, value));
  }

  return classes;
}

export default cssShorthandToClasses;
