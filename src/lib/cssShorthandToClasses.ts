import {
  ResponsiveProp,
  BreakpointSizeWithBase,
} from '../types';

export function isValidSpacingValue(value?: string | ResponsiveProp<string | undefined>): boolean {
  if (
    value === undefined
    || value === null
    || (typeof value !== 'string' && typeof value !== 'object')
  ) {
    return false;
  }

  return true;
}

export function generateBaseClasses(
  attribute: string | undefined,
  value?: string | ResponsiveProp<string | undefined>,
): string[] {
  if (typeof value !== 'string') return [];

  const trimmedValue = value.trim();

  if (trimmedValue !== value) {
    // eslint-disable-next-line no-console
    console.warn(`
      Palmetto Components: It seems you've passed an incorrect
      shorthand value as a prop in your component. The value
      has extra whitespace either at the beginning or the end of it.
      We have trimmed this whitespace, but please double-check that
      the prop value is correct.
      attribute: "${attribute}"
      value: "${value}"
    `);
  }

  const classes: string[] = [];
  let shorthand: { [key: number]: string[]; };

  if (attribute === 'br') {
    shorthand = {
      /* top-left-and-bottom-right | top-right-and-bottom-left */
      2: ['top-left', 'top-right'],
      /* top-left | top-right-and-bottom-left | bottom-right */
      3: ['top-left', 'top-right', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-right', 'bottom-left'],
    };
  } else if (attribute === 'g') {
    shorthand = { 2: ['rg', 'cg'] };
  } else {
    shorthand = {
      2: ['v', 'h'],
      3: ['top', 'h', 'bottom'],
      4: ['top', 'right', 'bottom', 'left'],
    };
  }

  if (trimmedValue.includes(' ') && trimmedValue.split(' ').length > 1) {
    const sides = trimmedValue.split(' ');

    if (sides.length > 4) {
      // eslint-disable-next-line no-console
      console.warn(`
        Palmetto Components: It seems you've passed an incorrect
        shorthand value as a prop in your component. The value
        has more than four string components. While it will not break anything,
        please double-check your prop values to ensure the expected result is correct.
        attribute: "${attribute}"
        value: "${value}"
      `);
    }

    const trimmedSides = sides.slice(0, 4);

    // br = border radius -- the corner logic is different than sides.
    if (attribute === 'br') {
      trimmedSides.forEach((v, index) => {
        classes.push(`${attribute}-${shorthand[trimmedSides.length][index]}-${v}`);

        if (trimmedSides.length === 3 && index === 1) {
          classes.push(`${attribute}-bottom-left-${trimmedSides[index]}`);
        } else if (trimmedSides.length === 2 && index === 0) {
          classes.push(`${attribute}-bottom-right-${trimmedSides[index]}`);
        } else if (trimmedSides.length === 2 && index === 1) {
          classes.push(`${attribute}-bottom-left-${trimmedSides[index]}`);
        }
      });
    } else if (attribute === 'g') {
      trimmedSides.forEach((v, index) => {
        classes.push(`${shorthand[trimmedSides.length][index]}-${v}`);
      });
    } else {
      trimmedSides.forEach((v, index) => {
        classes.push(`${attribute}-${shorthand[trimmedSides.length][index]}-${v}`);
      });
    }
  } else {
    classes.push(`${attribute}-${trimmedValue}`);
  }

  return classes;
}

export function cssShorthandToClasses(
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
