import { color as colorTokens } from '@palmetto/palmetto-design-tokens/build/js/variables-color';
import BorderType from './BorderType';

type ColorName = keyof typeof colorTokens.color.brand;
type ColorGrade = keyof typeof colorTokens.color.brand.primary;

// interface ColorGrade<T> {
//   ofType<R extends T>(RType: { new(...args: any[]): R; }): R[];
// }

declare global {
  type colors = { [name in ColorName]: { [grade in ColorGrade]: string } }
}

const TokenColors = Object.entries(colorTokens.brand).map(([colorRoot, colorGrades]) => (
  Object.keys(colorGrades as Record<string, unknown>).map(colorGrade => `${colorRoot}-${colorGrade}`)
)).flat();

type TokenColor = 

export {
  // Tokens,
  BorderType,
  TokenColors,
};
