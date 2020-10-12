const fs = require('fs');
const colorTokens = require('@palmetto/palmetto-design-tokens/build/json/variables-color.json');
const sizeTokens = require('@palmetto/palmetto-design-tokens/build/json/variables-size.json');

/**
 * COLORS
 */
const brandColors = colorTokens.color.brand;
const fontColors = colorTokens.color.font;

const brandColorOptions = Object.keys(brandColors)
  .map(colorName => (
    Object.keys(brandColors[colorName])
      .map(colorGrade => `${colorName}-${colorGrade}`)
  )).flat();

const fontColorOptions = Object.keys(fontColors)
  .map(colorName => (
    Object.keys(brandColors[colorName])
      .map(colorGrade => `${colorName}-${colorGrade}`)
  )).flat();

/**
 * SIZES
 */
const { size } = sizeTokens;
const spacingSizeOptions = Object.keys(size.spacing);
const fontSizeOptions = Object.keys(size.font);

/**
 * UTILITY FUNCTIONS
 */
const writeArray = (array, arrayName) => {
  let result = `const ${arrayName} = [`;

  array.forEach(element => {
    result = `${result}\n  '${element}',`;
  });

  return `${result}\n];\n\n`;
};

const writeExport = string => 'export '.concat(string);

/**
 * TOKEN CREATION
 */
const createColorTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeExport(writeArray(brandColorOptions, 'BRAND_COLORS')));
  result = result.concat(writeExport(writeArray(fontColorOptions, 'FONT_COLORS')));

  return result;
};

const createSizeTokens = currentFile => {
  let result = currentFile;

  result = result.concat(writeExport(writeArray(spacingSizeOptions, 'SPACING_SIZES')));
  result = result.concat(writeExport(writeArray(fontSizeOptions, 'FONT_SIZES')));

  return result;
};

/**
 * WRITE FILE
 */
let tokensData = '';

tokensData = createColorTokens(tokensData);
tokensData = createSizeTokens(tokensData);

fs.writeFileSync(`${__dirname}/tokens.ts`, tokensData);
