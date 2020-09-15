import { CssObjectType, DimensionType } from './types';

/**
 * Returns an object of styles and class names that correspond with the given value
 * @param {DimensionType} dimension width or height
 * @param {string} [value] value of the dimension
 */
function getDimensionCss(dimension: DimensionType, value?: string): CssObjectType {
  if (value === undefined) {
    return {
      styles: {},
      classes: [],
    };
  }

  const classes = [];
  let styles;

  // value is a css unit so set its style property
  if (
    typeof value === 'string'
    && (value.includes('px')
      || value.includes('em')
      || value.includes('rem')
      || value.includes('%')
      || value.includes('vw')
      || value.includes('vh'))
  ) {
    styles = dimension === 'w' ? { width: value } : { height: value };
  } else if (typeof value === 'string') { // standard percentage or token value
    classes.push(`${dimension}-${value}`);
  }

  return ({
    styles,
    classes,
  });
}

export default getDimensionCss;
