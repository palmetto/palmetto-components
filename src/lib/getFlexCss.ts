import { FlexStylesAndClasses, FlexProperty } from './types';

const flexValues = ['initial', 'auto', 'unset', 'none', 'inherit'];

function doesValueIncludeCssUnit(value: string): boolean {
  const cssUnits = ['px', 'em', 'rem', '%', 'vw', 'vh'];

  return cssUnits.some(unit => value.includes(unit));
}

function getFlexStyles(value?: string): FlexProperty | undefined {
  if (value === undefined) return value;

  const styles: FlexProperty = {};

  // value is css shorthand
  if (value.includes(' ') && value.split(' ').length > 1) {
    const flexProps = value.split(' ');
    if (flexProps.length === 2) {
      styles.flexGrow = Number.isNaN(Number(flexProps[0])) ? flexProps[0] : Number(flexProps[0]);
      if (doesValueIncludeCssUnit(flexProps[1])) {
        styles.flexBasis = flexProps[1]; // eslint-disable-line
      } else {
        styles.flexShrink = Number.isNaN(Number(flexProps[1])) ? flexProps[1] : Number(flexProps[1]);
      }
    } else if (flexProps.length === 3) {
      styles.flexGrow = Number.isNaN(Number(flexProps[0])) ? flexProps[0] : Number(flexProps[0]);
      styles.flexShrink = Number.isNaN(Number(flexProps[1])) ? flexProps[1] : Number(flexProps[1]);
      styles.flexBasis = Number.isNaN(Number(flexProps[2])) ? flexProps[2] : Number(flexProps[2]); // eslint-disable-line
    }
  } else if (!flexValues.includes(value)) {
    styles.flex = value;
  }

  return styles;
}

function getFlexClasses(value?: string): string[] | undefined {
  if (value === undefined || value.split(' ').length > 1) return [];

  const classes = [];
  if (typeof value === 'string' && !doesValueIncludeCssUnit(value) && Number.isNaN(Number(value))) {
    classes.push(`flex-${value}`);
  }

  return classes;
}

function getDimensionCss(value?: string): FlexStylesAndClasses {
  return ({
    styles: getFlexStyles(value),
    classes: getFlexClasses(value),
  });
}

export default getDimensionCss;
