import React from 'react';
import palmettoColors from '@palmetto/palmetto-design-tokens/build/js/colors.js';
import '../../main.scss';
// import { action } from '@storybook/addon-actions';

const [baseColors, brandColors] = Object.values(palmettoColors.color); // eslint-disable-line no-unused-vars

export default {
  title: 'Colors'
};

const renderColorBlock = (colorEntry) => {
  const [colorName, colorVariations] = colorEntry;
  const divStyle = {
    padding: '1rem',
    backgroundColor: `${colorVariations['base'].value}`,
    color: 'white',
    width: '100px',
    marginRight: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
  };
  return (
    <div style={divStyle}>
      <h3>{colorName}</h3>
      <p>{colorVariations['base'].value}</p>
    </div>
  );
};

export const brand = () => (
  <div style={{ padding: '1rem' }}>
    <h1>Brand Colors</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(brandColors).map(renderColorBlock)}
    </div>
    <h1>Extended Brand Palette</h1>
    {/* PLACEHOLDER */}
  </div>
);