import { BreakpointOption } from './tokens';
import { ResponsiveProp } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateResponsiveClasses(classRoot: string, value: ResponsiveProp<any> | string | undefined): string[] {
  if (value === null || (typeof value !== 'string' && typeof value !== 'object')) return [];

  const classes: string[] = [];

  if (typeof value === 'object') {
    Object.keys(value).forEach(key => {
      const baseClass = `${classRoot}-${value[key as BreakpointOption]}`;
      const responsiveClass = key === 'base' ? baseClass : `${baseClass}-${key}`;

      classes.push(responsiveClass);
    });
  } else if (typeof value === 'string') {
    classes.push(`${classRoot}-${value}`);
  }

  return classes;
}

export default generateResponsiveClasses;
