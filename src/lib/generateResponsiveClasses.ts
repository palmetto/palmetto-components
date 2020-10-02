import { PALMETTO_BREAKPOINTS } from './tokens';
import { ResponsiveGeneric } from './types';

function generateResponsiveClasses(classRoot: string, value: ResponsiveGeneric | string | undefined): string[] {
  if (value === null || (typeof value !== 'string' && typeof value !== 'object')) return [];

  const classes: string[] = [];

  if (typeof value === 'object') {
    Object.keys(value).forEach(key => {
      const baseClass = `${classRoot}-${value[key as PALMETTO_BREAKPOINTS | 'base']}`;
      const responsiveClass = key === 'base' ? baseClass : `${baseClass}-${key}`;

      classes.push(responsiveClass);
    });
  } else if (typeof value === 'string') {
    classes.push(`${classRoot}-${value}`);
  }

  return classes;
}

export default generateResponsiveClasses;
