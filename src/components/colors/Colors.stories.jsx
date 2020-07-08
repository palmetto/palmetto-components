import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { PALMETTO_COLOR_VALUES } from '../../lib/tokens';
import './colors.scss';
// import { action } from '@storybook/addon-actions';

const [baseColors, brandColors] = PALMETTO_COLOR_VALUES;

export default {
  title: 'Colors',
  decorators: [withA11y],
};

const renderColorBlock = colorEntry => {
  const [colorName, colorVariations] = colorEntry;

  return (
    <div className="colors__color-block__item" style={{ backgroundColor: `${colorVariations.base.value}` }}>
      <h2>{colorName}</h2>
      <p>{colorVariations.base.value}</p>
    </div>
  );
};

const renderColorPalette = (colorEntry, index) => {
  const [colorName, colorVariations] = colorEntry;

  const getFontColor = colorVariation => (
    colorVariation && colorVariation.attributes && colorVariation.attributes.font === 'base' ? 'black' : 'white'
  );

  return (
    <div key={index}>
      <h2 style={{ marginTop: '0' }}>{colorName}</h2>
      {Object.entries(colorVariations).map((colorVariationEntry, index) => {
        const [colorVariationName, colorVariation] = colorVariationEntry;
        return (
          <div
            key={index}
            className="colors__color-palette__item"
            style={{ backgroundColor: `${colorVariation.value}`, color: `${getFontColor(colorVariation)}` }}
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
