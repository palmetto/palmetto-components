import { ResponsiveProp, BreakpointSizeWithBase } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateResponsiveClasses(classRoot: string, value: ResponsiveProp<any> | string | undefined): string[] {
  if (value === null || (typeof value !== 'string' && typeof value !== 'object')) return [];

  const classes: string[] = [];

  if (typeof value === 'object') {
    Object.keys(value).forEach(key => {
      const baseClass = `${classRoot}-${value[key as BreakpointSizeWithBase]}`;
      const responsiveClass = key === 'base' ? baseClass : `${baseClass}-${key}`;

      classes.push(responsiveClass);
    });
  } else if (typeof value === 'string') {
    classes.push(`${classRoot}-${value}`);
  }

  return classes;
}

export default generateResponsiveClasses;
