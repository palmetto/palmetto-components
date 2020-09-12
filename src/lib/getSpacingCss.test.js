import getSpacingCss from './getSpacingCss';

describe('getSpacingCss', () => {
  test('returns expected css object if single value is passed', () => {
    const spacingCss = getSpacingCss('p', 'xs');

    expect(spacingCss).toEqual({
      classes: ['p-xs'],
      styles: undefined,
    });
  });

  describe('2 values', () => {
    test('returns expected css object if vertical and horizontal spacing values are passed', () => {
      const spacingCss = getSpacingCss('p', 'xs sm');

      expect(spacingCss).toEqual({
        classes: ['p-v-xs', 'p-h-sm'],
        styles: undefined,
      });
    });

    test('returns expected css object if vertical and horizontal are set to 0', () => {
      const spacingCss = getSpacingCss('p', '0 0');

      expect(spacingCss).toEqual({
        classes: [],
        styles: undefined,
      });
    });
  });

  describe('3 values', () => {
    test('returns expected css object if top, horizontal and bottom spacing values are passed', () => {
      const spacingCss = getSpacingCss('p', 'xs sm lg');

      expect(spacingCss).toEqual({
        classes: ['p-top-xs', 'p-h-sm', 'p-bottom-lg'],
        styles: undefined,
      });
    });

    test('returns expected css object if top, horizontal and bottom spacing values are set to 0', () => {
      const spacingCss = getSpacingCss('p', '0 0 0');

      expect(spacingCss).toEqual({
        classes: [],
        styles: undefined,
      });
    });
  });

  describe('4 values', () => {
    test('returns expected css object if top, right, bottom, left spacing values are passed', () => {
      const spacingCss = getSpacingCss('p', 'xs sm lg md');

      expect(spacingCss).toEqual({
        classes: ['p-top-xs', 'p-right-sm', 'p-bottom-lg', 'p-left-md'],
        styles: undefined,
      });
    });

    test('returns expected css object if top, right, bottom, left spacing values are set to 0', () => {
      const spacingCss = getSpacingCss('p', '0 0 0 0');

      expect(spacingCss).toEqual({
        classes: [],
        styles: undefined,
      });
    });
  });

  test('returns expected css object if inherit is passed', () => {
    const spacingCss = getSpacingCss('p', 'inherit');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        padding: 'inherit',
      },
    });
  });

  test('returns expected css object if margin is inherit is passed', () => {
    const spacingCss = getSpacingCss('m', 'inherit');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        margin: 'inherit',
      },
    });
  });
});
