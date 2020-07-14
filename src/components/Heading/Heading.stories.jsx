import React from 'react';
import { v4 as uuid } from 'uuid';
import { withA11y } from '@storybook/addon-a11y';
import { PALMETTO_FONT_SIZE_OPTIONS, PALMETTO_BRAND_COLOR_OPTIONS } from '../../lib/tokens';
import Heading from './Heading';
import { HEADING_LEVELS } from './Heading.constants';

export default {
  title: 'Components/Heading',
  parameters: {
    componentSubtitle: 'For page and section headings',
  },
  component: Heading,
  decorators: [withA11y],
};

export const AllHeadings = () => (
  <>
    {HEADING_LEVELS.map(level => (
      <Heading as={level} key={uuid()}>
        {level}
        Heading Default Size
      </Heading>
    ))}
  </>
);

export const Sizes = () => (
  <>
    {[...PALMETTO_FONT_SIZE_OPTIONS].reverse().map(fontSize => (
      <Heading size={fontSize} key={uuid()}>
        Size
        {fontSize}
      </Heading>
    ))}
  </>
);

export const OverrideDefaultSize = () => (
  <>
    {HEADING_LEVELS.map((level, index) => (
      <Heading as={level} size={PALMETTO_FONT_SIZE_OPTIONS[index]} key={uuid()}>
        {level}
        Heading with
        {PALMETTO_FONT_SIZE_OPTIONS[index]}
        size
      </Heading>
    ))}
  </>
);

export const Colors = () => (
  <>
    {PALMETTO_BRAND_COLOR_OPTIONS.map(color => (
      <Heading color={color} key={uuid()}>
        {color}
        heading
      </Heading>
    ))}
  </>
);
