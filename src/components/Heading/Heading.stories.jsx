import React from 'react';
import { size } from '@palmetto/palmetto-design-tokens/build/js/sizes';
import { color } from '@palmetto/palmetto-design-tokens/build/js/colors';
import Heading from './Heading';
import { HEADER_LEVELS } from './Heading.constants';

const PALMETTO_FONT_SIZES = Object.keys(size.font);
const PALMETTO_BRAND_COLORS = Object.keys(color.brand);

export default {
  title: 'Heading',
  parameters: {
    componentSubtitle: 'For page and section headings',
  },
  component: Heading,
};

export const AllHeadings = () => (
  <>
    {HEADER_LEVELS.map((level, index) => (
      <Heading as={level} key={index}>
        {level} Heading Default Size
      </Heading>
    ))}
  </>
);

export const Sizes = () => (
  <>
    {[...PALMETTO_FONT_SIZES].reverse().map((fontSize, index) => (
      <Heading size={fontSize} key={index}>
        Size {fontSize}
      </Heading>
    ))}
  </>
);

export const OverrideDefaultSize = () => (
  <>
    {HEADER_LEVELS.map((level, index) => (
      <Heading as={level} size={PALMETTO_FONT_SIZES[index]} key={index}>
        {level} Heading with {PALMETTO_FONT_SIZES[index]} size
      </Heading>
    ))}
  </>
);

export const Colors = () => (
  <>
    {PALMETTO_BRAND_COLORS.map((color, index) => (
      <Heading color={color} key={index}>
        {color} heading
      </Heading>
    ))}
  </>
);
