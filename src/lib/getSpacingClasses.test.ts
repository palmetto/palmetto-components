import getSpacingClasses from './getSpacingClasses';
import { SPACING_OPTIONS } from './tokens';

describe('getSpacingClasses', () => {
  describe('token values', () => {
    SPACING_OPTIONS.map(token => (
      test(`returns expected css object if token ${token} is passed`, () => {
        const spacingClasses = getSpacingClasses('p', token);

        expect(spacingClasses).toEqual([`p-${token}`]);
      })
    ));
  });

  describe('2 values', () => {
    test('returns expected css object if vertical and horizontal spacing values are passed', () => {
      const spacingClasses = getSpacingClasses('p', 'xs sm');

      expect(spacingClasses).toEqual(['p-v-xs', 'p-h-sm']);
    });

    test('returns expected css object if vertical and horizontal are set to 0', () => {
      const spacingClasses = getSpacingClasses('p', '0 0');

      expect(spacingClasses).toEqual([]);
    });
  });

  describe('3 values', () => {
    test('returns expected css object if top, horizontal and bottom spacing values are passed', () => {
      const spacingClasses = getSpacingClasses('p', 'xs sm lg');

      expect(spacingClasses).toEqual(['p-top-xs', 'p-h-sm', 'p-bottom-lg']);
    });

    test('returns expected css object if top, horizontal and bottom spacing values are set to 0', () => {
      const spacingClasses = getSpacingClasses('p', '0 0 0');

      expect(spacingClasses).toEqual([]);
    });
  });

  describe('4 values', () => {
    test('returns expected css object if top, right, bottom, left spacing values are passed', () => {
      const spacingClasses = getSpacingClasses('p', 'xs sm lg md');

      expect(spacingClasses).toEqual(['p-top-xs', 'p-right-sm', 'p-bottom-lg', 'p-left-md']);
    });

    test('returns expected css object if top, right, bottom, left spacing values are set to 0', () => {
      const spacingClasses = getSpacingClasses('p', '0 0 0 0');

      expect(spacingClasses).toEqual([]);
    });
  });

  describe('Responsive Classes', () => {
    test('returns expected css object if an object is passed with spacing for particular breakpoints', () => {
      const spacingClasses = getSpacingClasses('p', { base: 'md lg', tablet: 'sm md lg xl' });

      expect(spacingClasses).toEqual([
        'p-v-md',
        'p-h-lg',
        'p-top-sm-tablet',
        'p-right-md-tablet',
        'p-bottom-lg-tablet',
        'p-left-xl-tablet',
      ]);
    });
  });

  test('returns expected classes if inherit is passed', () => {
    const spacingClasses = getSpacingClasses('p', 'inherit');

    expect(spacingClasses).toEqual(['p-inherit']);
  });

  test('returns expected classes if margin is inherit is passed', () => {
    const spacingClasses = getSpacingClasses('m', 'inherit');

    expect(spacingClasses).toEqual(['m-inherit']);
  });
});
