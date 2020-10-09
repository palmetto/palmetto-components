/* eslint-disable no-unused-vars */
import React, { FC } from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { PALMETTO_COLOR_VALUES, ColorEntry, ColorVariation } from '../../lib/tokens';
import styles from './Colors.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [baseColors, brandColors] = PALMETTO_COLOR_VALUES;

export default {
  title: 'Design Tokens/Colors',
  decorators: [withA11y],
};

const renderColorBlock = (colorEntry: [string, ColorEntry]) => {
  const [colorName, colorVariations] = colorEntry;

  return (
    <div className={styles['color-block']} style={{ backgroundColor: `${colorVariations.base.value}` }}>
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
      <h2 className="m-bottom-md">{colorName}</h2>
      {Object.entries(colorVariations).map((colorVariationEntry, i) => {
        const [colorVariationName, colorVariation] = colorVariationEntry;
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={styles['palette-item']}
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

export const brand: FC = () => (
  <>
    <h1 className="m-bottom-md">Brand Colors</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(brandColors).map(renderColorBlock)}
    </div>
    <h1>Extended Brand Palette</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(brandColors).map(renderColorPalette)}
    </div>
  </>
);
