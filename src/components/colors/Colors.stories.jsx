import React from 'react';
import palmettoColors from '@palmetto/palmetto-design-tokens/build/js/variables-color.js';
import '../../main.scss';
import './colors.scss';
// import { action } from '@storybook/addon-actions';

const [baseColors, brandColors] = Object.values(palmettoColors.color);

export default {
  title: 'Colors'
};

const renderColorBlock = (colorEntry) => {
  const [colorName, colorVariations] = colorEntry;

  return (
    <div className="colors__color-block__item" style={{ backgroundColor: `${colorVariations['base'].value}` }}>
      <h3>{colorName}</h3>
      <p>{colorVariations['base'].value}</p>
    </div>
  );
};

const renderColorPalette = (colorEntry, index) => {
  const [colorName, colorVariations] = colorEntry;

  const getFontColor = (colorVariation) => {
    return colorVariation?.attributes?.font === 'base' ? 'black' : 'white';
  }

  return (
    <div key={index}>
      <h3 style={{ marginTop: '0' }}>{colorName}</h3>
      {Object.entries(colorVariations).map((colorVariationEntry, index) => {
        const [colorVariationName, colorVariation] = colorVariationEntry;
        return (
          <div
            key={index}
            className="colors__color-palette__item"
            style={{ backgroundColor: `${colorVariation.value}`, color: `${getFontColor(colorVariation)}`}}
          >
            <small style={{ display: 'block' }}>{colorVariationName}</small>
            <small>{colorVariation.value}</small>
          </div>
        );
      })}
    </div>
  );
};

export const brand = () => (
  <>
    <h1>Brand Colors</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(brandColors).map(renderColorBlock)}
    </div>
    <h1>Extended Brand Palette</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(brandColors).map(renderColorPalette)}
    </div>
  </>
);

export const base = () => (
  <>
    <h1>Base Color Palette</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(baseColors)
        .filter(colorEntry => colorEntry[0] !== 'white' && colorEntry[0] !== 'black') /* Filtering out black and white at the moment */
        .map(renderColorPalette)
      }
    </div>
  </>
);