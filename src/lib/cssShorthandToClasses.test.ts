import { cssShorthandToClasses } from './cssShorthandToClasses';
import { SPACING_OPTIONS } from './tokens';

describe('cssShorthandToClasses', () => {
  describe('token values', () => {
    SPACING_OPTIONS.map(token => (
      test(`returns expected css object if token ${token} is passed`, () => {
        const spacingClasses = cssShorthandToClasses('p', token);

        expect(spacingClasses).toEqual([`p-${token}`]);
      })
    ));
  });

  describe('2 values', () => {
    test('returns expected css object if vertical and horizontal spacing values are passed', () => {
      const spacingClasses = cssShorthandToClasses('p', 'xs sm');

      expect(spacingClasses).toEqual(['p-v-xs', 'p-h-sm']);
    });

    test('returns expected css object if vertical and horizontal are set to 0', () => {
      const spacingClasses = cssShorthandToClasses('p', '0 0');

      expect(spacingClasses).toEqual(['p-v-0', 'p-h-0']);
    });

    test('returns expected css object if gap is set to sm lg', () => {
      const classes = cssShorthandToClasses('g', 'sm lg');

      expect(classes).toEqual(['rg-sm', 'cg-lg']);
    });

    test('returns expected css object if border radius are set to sm lg', () => {
      const classes = cssShorthandToClasses('br', 'sm lg');

      expect(classes).toEqual(['br-top-left-sm', 'br-bottom-right-sm', 'br-top-right-lg', 'br-bottom-left-lg']);
    });
  });

  describe('3 values', () => {
    test('returns expected css object if top, horizontal and bottom spacing values are passed', () => {
      const spacingClasses = cssShorthandToClasses('p', 'xs sm lg');

      expect(spacingClasses).toEqual(['p-top-xs', 'p-h-sm', 'p-bottom-lg']);
    });

    test('returns expected css object if top, horizontal and bottom spacing values are set to 0', () => {
      const spacingClasses = cssShorthandToClasses('p', '0 0 0');

      expect(spacingClasses).toEqual([
        'p-top-0',
        'p-h-0',
        'p-bottom-0',
      ]);
    });

    test('returns expected css object if border radius are set to sm lg', () => {
      const classes = cssShorthandToClasses('br', 'sm md lg');

      expect(classes).toEqual(['br-top-left-sm', 'br-top-right-md', 'br-bottom-left-md', 'br-bottom-right-lg']);
    });
  });

  describe('4 values', () => {
    test('returns expected css object if top, right, bottom, left spacing values are passed', () => {
      const spacingClasses = cssShorthandToClasses('p', 'xs sm lg md');

      expect(spacingClasses).toEqual(['p-top-xs', 'p-right-sm', 'p-bottom-lg', 'p-left-md']);
    });

    test('returns expected css object if top, right, bottom, left spacing values are set to 0', () => {
      const spacingClasses = cssShorthandToClasses('p', '0 0 0 0');

      expect(spacingClasses).toEqual([
        'p-top-0',
        'p-right-0',
        'p-bottom-0',
        'p-left-0',
      ]);
    });

    test('returns expected css object if border radius are set to xs sm md lg', () => {
      const classes = cssShorthandToClasses('br', 'xs sm md lg');

      expect(classes).toEqual(['br-top-left-xs', 'br-top-right-sm', 'br-bottom-right-md', 'br-bottom-left-lg']);
    });
  });

  describe('Responsive Classes', () => {
    test('returns expected css object if an object is passed with spacing for particular breakpoints', () => {
      const spacingClasses = cssShorthandToClasses('p', { base: 'md lg', tablet: 'sm md lg xl' });

      expect(spacingClasses).toEqual([
        'p-v-md',
        'p-h-lg',
        'p-top-sm-tablet',
        'p-right-md-tablet',
        'p-bottom-lg-tablet',
        'p-left-xl-tablet',
      ]);
    });

    test('returns expected css object if an object is passed with spacing 0 for particular breakpoints', () => {
      const spacingClasses = cssShorthandToClasses('p', { base: '3xl 0', desktop: '0 3xl' });

      expect(spacingClasses).toEqual([
        'p-v-3xl',
        'p-h-0',
        'p-v-0-desktop',
        'p-h-3xl-desktop',
      ]);
    });
  });

  test('returns expected classes if inherit is passed', () => {
    const spacingClasses = cssShorthandToClasses('p', 'inherit');

    expect(spacingClasses).toEqual(['p-inherit']);
  });

  test('returns expected classes if margin is inherit is passed', () => {
    const spacingClasses = cssShorthandToClasses('m', 'inherit');

    expect(spacingClasses).toEqual(['m-inherit']);
  });
});
