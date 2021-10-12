import { getFlexCss } from './getFlexCss';

describe('getFlexCss', () => {
  describe('Single value shorthand applies classes', () => {
    const flexValues = ['initial', 'auto', 'unset', 'none', 'inherit'];
    flexValues.map(value => (
      test(`returns expected css object with class  flex: ${value} is passed`, () => {
        const flexCss = getFlexCss(value);

        expect(flexCss).toEqual({
          classes: [`flex-${value}`],
          styles: {},
        });
      })
    ));
  });

  describe('Single value shorthand applies styles', () => {
    const flexValues = ['1', '1rem', '10%', '2em', '100px', '50vw', '50vh'];
    flexValues.map(value => (
      test(`returns expected css object with class  flex: ${value} is passed`, () => {
        const flexCss = getFlexCss(value);

        expect(flexCss).toEqual({
          styles: { flex: value },
          classes: [],
        });
      })
    ));
  });

  describe('Two-value shorthand applies styles with flex integer values', () => {
    const flexValues = ['1 0', 'auto 1', '0 2'];
    flexValues.map(value => (
      test(`returns expected css object with class  flex: ${value} is passed`, () => {
        const flexCss = getFlexCss(value);
        const flexProps = value.split(' ');

        expect(flexCss).toEqual({
          styles: {
            flexGrow: Number.isNaN(Number(flexProps[0])) ? flexProps[0] : Number(flexProps[0]),
            flexShrink: Number.isNaN(Number(flexProps[1])) ? flexProps[1] : Number(flexProps[1]),
          },
          classes: [],
        });
      })
    ));
  });

  describe('Two-value shorthand applies styles with css unit values', () => {
    const flexValues = ['10px 10px', '1 10vw', '0 50%'];
    flexValues.map(value => (
      test(`returns expected css object with class  flex: ${value} is passed`, () => {
        const flexCss = getFlexCss(value);
        const flexProps = value.split(' ');

        expect(flexCss).toEqual({
          styles: {
            flexGrow: Number.isNaN(Number(flexProps[0])) ? flexProps[0] : Number(flexProps[0]),
            flexBasis: Number.isNaN(Number(flexProps[1])) ? flexProps[1] : Number(flexProps[1]),
          },
          classes: [],
        });
      })
    ));
  });

  describe('Two-value shorthand applies styles to correct flex property', () => {
    const flexValues = ['10px inherit', '1 auto', '0 initial'];
    flexValues.map(value => (
      test(`returns expected css object with class  flex: ${value} is passed`, () => {
        const flexCss = getFlexCss(value);
        const flexProps = value.split(' ');

        expect(flexCss).toEqual({
          styles: {
            flexGrow: Number.isNaN(Number(flexProps[0])) ? flexProps[0] : Number(flexProps[0]),
            flexShrink: Number.isNaN(Number(flexProps[1])) ? flexProps[1] : Number(flexProps[1]),
          },
          classes: [],
        });
      })
    ));
  });

  describe('Three-value shorthand applies styles with css unit values', () => {
    const flexValues = ['1 auto 10px', 'auto 0 10%', '0 1 50%', '1 1 1'];
    flexValues.map(value => (
      test(`returns expected css object with class  flex: ${value} is passed`, () => {
        const flexCss = getFlexCss(value);
        const flexProps = value.split(' ');

        expect(flexCss).toEqual({
          styles: {
            flexGrow: Number.isNaN(Number(flexProps[0])) ? flexProps[0] : Number(flexProps[0]),
            flexShrink: Number.isNaN(Number(flexProps[1])) ? flexProps[1] : Number(flexProps[1]),
            flexBasis: Number.isNaN(Number(flexProps[2])) ? flexProps[2] : Number(flexProps[2]),
          },
          classes: [],
        });
      })
    ));
  });
});
