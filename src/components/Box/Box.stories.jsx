/* eslint-disable react/no-array-index-key */
import React from 'react';
import Box from './Box';
import { PALMETTO_FONT_SIZE_OPTIONS } from '../../lib/tokens';

export default {
  title: 'Components/Box',
  component: Box,
};

export const FontSize = () => (
  <>
    {[...PALMETTO_FONT_SIZE_OPTIONS].reverse().map((fontSize, i) => (
      <Box fontSize={fontSize} key={i}>
        {`${fontSize} font size`}
      </Box>
    ))}
  </>
);
