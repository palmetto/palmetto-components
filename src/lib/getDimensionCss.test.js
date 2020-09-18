import getDimensionCss from './getDimensionCss';
import {
  PALMETTO_HEIGHT_OPTIONS,
  PALMETTO_WIDTH_OPTIONS,
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

  describe('width', () => {
    PALMETTO_WIDTH_OPTIONS.map(token => (
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
    PALMETTO_HEIGHT_OPTIONS.map(token => (
      test(`returns expected css object if ${token} width value is passed`, () => {
        const spacingCss = getDimensionCss('h', token);

        expect(spacingCss).toEqual({
          classes: [`h-${token}`],
          styles: undefined,
        });
      })
    ));
  });
});
