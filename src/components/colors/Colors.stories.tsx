import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import styles from './Colors.module.scss';
import { PALMETTO_COLOR_VALUES, ColorEntry, ColorVariation } from '../../lib/tokens';
import './colors.scss';

const [baseColors, brandColors] = PALMETTO_COLOR_VALUES;

export default {
  title: 'Tokens/Colors',
  decorators: [withA11y],
};

const renderColorBlock = (colorEntry: [string, ColorEntry]) => {
  const [colorName, colorVariations] = colorEntry;

  return (
    <div className={styles.colorBlock} style={{ backgroundColor: `${colorVariations.base.value}` }}>
      <h2>{colorName}</h2>
      <p>{colorVariations.base.value}</p>
    </div>
  );
};

const renderColorPalette = (colorEntry: [string, ColorEntry], index: number) => {
  const [colorName, colorVariations] = colorEntry;

  const getFontColor = (colorVariation: ColorVariation) => (
    colorVariation && colorVariation.attributes && colorVariation.attributes.font === 'base' ? 'black' : 'white'
  );

  return (
    <div key={index}>
      <h2 style={{ marginTop: '0' }}>{colorName}</h2>
      {Object.entries(colorVariations).map((colorVariationEntry, i) => {
        const [colorVariationName, colorVariation] = colorVariationEntry;
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={styles.paletteItem}
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
        /* Filtering out black and white at the moment */
        .filter(colorEntry => colorEntry[0] !== 'white' && colorEntry[0] !== 'black')
        .map(renderColorPalette)}
    </div>
  </>
);
