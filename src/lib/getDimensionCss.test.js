import { getDimensionCss } from './getDimensionCss';
import {
  HEIGHT_OPTIONS,
  WIDTH_OPTIONS,
} from './tokens';

describe('getDimensionCss', () => {
  test('returns expected css object if width css value is passed', () => {
    const spacingCss = getDimensionCss('w', '20px');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        width: '20px',
      },
    });
  });

  test('returns expected css object if height css value is passed', () => {
    const spacingCss = getDimensionCss('h', '42rem');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        height: '42rem',
      },
    });
  });

  test('returns expected css object if max width css value is passed', () => {
    const spacingCss = getDimensionCss('mw', '20px');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        maxWidth: '20px',
      },
    });
  });

  test('returns expected css object if min width css value is passed', () => {
    const spacingCss = getDimensionCss('minw', '20px');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        minWidth: '20px',
      },
    });
  });

  test('returns expected css object if max height css value is passed', () => {
    const spacingCss = getDimensionCss('mh', '42rem');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        maxHeight: '42rem',
      },
    });
  });

  test('returns expected css object if min height css value is passed', () => {
    const spacingCss = getDimensionCss('minh', '42rem');

    expect(spacingCss).toEqual({
      classes: [],
      styles: {
        minHeight: '42rem',
      },
    });
  });

  describe('width', () => {
    WIDTH_OPTIONS.map(token => (
      test(`returns expected css object if ${token} width value is passed`, () => {
        const spacingCss = getDimensionCss('w', token);

        expect(spacingCss).toEqual({
          classes: [`w-${token}`],
          styles: undefined,
        });
      })
    ));
  });

  describe('height', () => {
    HEIGHT_OPTIONS.map(token => (
      test(`returns expected css object if ${token} width value is passed`, () => {
        const spacingCss = getDimensionCss('h', token);

        expect(spacingCss).toEqual({
          classes: [`h-${token}`],
          styles: undefined,
        });
      })
    ));
  });

  describe('max width', () => {
    WIDTH_OPTIONS.map(token => (
      test(`returns expected css object if ${token} max width value is passed`, () => {
        const spacingCss = getDimensionCss('mw', token);

        expect(spacingCss).toEqual({
          classes: [`mw-${token}`],
          styles: undefined,
        });
      })
    ));
  });

  describe('min width', () => {
    WIDTH_OPTIONS.map(token => (
      test(`returns expected css object if ${token} min width value is passed`, () => {
        const spacingCss = getDimensionCss('minw', token);

        expect(spacingCss).toEqual({
          classes: [`minw-${token}`],
          styles: undefined,
        });
      })
    ));
  });

  describe('max height', () => {
    HEIGHT_OPTIONS.map(token => (
      test(`returns expected css object if ${token} max height value is passed`, () => {
        const spacingCss = getDimensionCss('mh', token);

        expect(spacingCss).toEqual({
          classes: [`mh-${token}`],
          styles: undefined,
        });
      })
    ));
  });

  describe('min height', () => {
    HEIGHT_OPTIONS.map(token => (
      test(`returns expected css object if ${token} min height value is passed`, () => {
        const spacingCss = getDimensionCss('minh', token);

        expect(spacingCss).toEqual({
          classes: [`minh-${token}`],
          styles: undefined,
        });
      })
    ));
  });
});
