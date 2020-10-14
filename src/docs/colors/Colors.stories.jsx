/* eslint-disable no-unused-vars */
import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { BRAND_COLORS } from '../../lib/tokens';
import styles from './Colors.module.scss';

export default {
  title: 'Design Tokens/Colors',
  decorators: [withA11y],
};

const renderColorBlock = colorEntry => {
  const [colorName, colorVariations] = colorEntry;

  return (
    <div className={styles['color-block']} style={{ backgroundColor: `${colorVariations.base.value}` }}>
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
      <h2 className="m-bottom-md">{colorName}</h2>
      {Object.entries(colorVariations).map((colorVariationEntry, i) => {
        const [colorVariationName, colorVariation] = colorVariationEntry;
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={styles['palette-item']}
            style={{
              backgroundColor: `${colorVariation.value}`,
              color: `${getFontColor(colorVariation)}`,
            }}
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
    <h1 className="m-bottom-md">Brand Colors</h1>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {Object.entries(BRAND_COLORS).map(renderColorBlock)}
    </div>
    <h1>Extended Brand Palette</h1>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {Object.entries(BRAND_COLORS).map(renderColorPalette)}
    </div>
  </>
);
