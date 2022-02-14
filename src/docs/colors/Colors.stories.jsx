/* eslint-disable no-unused-vars */
import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { color } from '@palmetto/palmetto-design-tokens/build/json/variables-color.json';
import styles from './Colors.module.scss';

export default {
  title: 'Design Tokens/Colors',
  decorators: [withA11y],
};

const renderColorBlock = colorEntry => {
  const [colorName, colorVariations] = colorEntry;
  console.log('colorName', colorName);

  return (
    <div
      className={`${styles['color-block']} ${
        ['white', 'light', 'transparent'].includes(colorName)
          ? 'font-color-dark'
          : 'font-color-white'
      }`}
      style={{ backgroundColor: `${colorVariations.base.value}` }}
    >
      <h2>{colorName}</h2>
      <p>{colorVariations.base.value}</p>
    </div>
  );
};

const renderColorPalette = (colorEntry, index) => {
  const [colorName, colorVariations] = colorEntry;

  const getFontColor = colorVariation => {
    const variationsWithDarkFont = [
      'white',
      'light',
      'lighter',
      'lightest',
      'transparent',
      '50',
      '100',
      '200',
    ];

    if (variationsWithDarkFont.includes(colorVariation)) {
      return 'dark';
    }

    return 'white';
  };

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
              color: `${getFontColor(colorVariationName)}`,
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

export const brand = () => {
  // console.log(
  //   Object.keys(color.brand.grey)
  //     .filter(c => !c.includes('light') && !c.includes('dark'))
  //     .map(g => color.brand.grey[g].value),
  // );

  const t = Object.keys(color.brand).map(c => color.brand[c]);

  for (const property in color.brand) {
    console.log(
      Object.keys(color.brand[property]).reduce((acc, item, i) => {
        acc[item] = Object.keys(color.brand[property]).map(g => color.brand[property][g].value)[i];
        return acc;
      }, {}),
    );
  }

  // const colors = Object.keys(color.brand.grey).reduce((acc, item, i) => {
  //   acc[item] = Object.keys(color.brand.grey).map(g => color.brand.grey[g].value)[i];
  //   return acc;
  // }, {});

  // console.log(colors);

  return (
    <>
      <h1 className="m-bottom-md">Brand Colors</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(color.brand).map(renderColorBlock)}
      </div>
      <h1>Extended Brand Palette</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(color.brand).map(renderColorPalette)}
      </div>
    </>
  );
};
