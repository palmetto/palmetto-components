function doesStringIncludeCssUnit(value: string): boolean {
  const cssUnits = ['px', 'em', 'rem', '%', 'vw', 'vh'];

  return cssUnits.some(unit => value.includes(unit));
}

export default doesStringIncludeCssUnit;
