const fs = require('fs');
const colorTokens = require('@palmetto/palmetto-design-tokens/build/json/variables-color.json');

const brandColors = colorTokens.color.brand;
const fontColors = colorTokens.color.font;
// type ColorName = keyof typeof brandColors;
// type ColorGrade = keyof typeof brandColors.primary;

const brandColorTokens = Object.keys(brandColors)
  .map(colorName => (
    Object.keys(brandColors[colorName])
      .map(colorGrade => `${colorName}-${colorGrade}`)
  )).flat();

const fontColorTokens = Object.keys(fontColors)
  .map(colorName => (
    Object.keys(brandColors[colorName])
      .map(colorGrade => `${colorName}-${colorGrade}`)
  )).flat();

let myFile = '';

const writeArray = (array, arrayName) => {
  let string = `const ${arrayName} = [`;
  array.forEach(element => {
    string = `${string}\n  '${element}',`;
  });
  return `${string}\n];`;
};

const writeExport = string => 'export '.concat(string);

myFile = myFile.concat(writeExport(writeArray(brandColorTokens, 'BRAND_COLORS')));
myFile = myFile.concat('\n');
myFile = myFile.concat(writeExport(writeArray(fontColorTokens, 'FONT_COLORS')));

(() => {
  fs.writeFileSync(`${__dirname}/tokens.ts`, myFile);
})();
