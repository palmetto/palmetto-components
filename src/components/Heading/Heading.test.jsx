import React from 'react';
import { v4 as uuid } from 'uuid';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { size as palmettoSizes } from '@palmetto/palmetto-design-tokens/build/js/variables-size';
import { color as palmettoColors } from '@palmetto/palmetto-design-tokens/build/js/variables-color';
import { HEADING_LEVELS } from './Heading.constants';
import Heading from './Heading';

const PALMETTO_FONT_SIZES = Object.keys(palmettoSizes.font);
const PALMETTO_BRAND_COLORS = Object.keys(palmettoColors.brand);


const headingComponentLevels = (
  HEADING_LEVELS.map((level) => (
    <Heading as={level} key={uuid()}>
      {level} Heading Default Size
    </Heading>
  ))
);

const headingComponentSizes = (
  PALMETTO_FONT_SIZES.map((fontSize) => (
    <Heading size={fontSize} key={uuid()}>
      Size {fontSize}
    </Heading>
  ))
);

const headingComponentSizeOverrides = (
  HEADING_LEVELS.map((level, index) => (
    <Heading as={level} size={PALMETTO_FONT_SIZES[index]} key={uuid()}>
      {level} Heading with {PALMETTO_FONT_SIZES[index]} size
    </Heading>
  ))
);

const headingComponentColors = (
  PALMETTO_BRAND_COLORS.map((color, index) => (
    <Heading color={color} key={uuid()}>
      {color} heading
    </Heading>
  ))
);

describe('Heading', () => {
  test('Matches the snapshot for component with default props', () => {
    const { asFragment } = render(<Heading>Hello World</Heading>);
    expect(asFragment(<Heading>Hello World</Heading>)).toMatchSnapshot();
  })
  headingComponentLevels.forEach((headingComponent, index) => {
    test(`Matches the snapshot for heading ${HEADING_LEVELS[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment(headingComponent)).toMatchSnapshot();
    });
  });

  headingComponentSizes.forEach((headingComponent, index) => {
    test(`Matches the snapshot for size ${PALMETTO_FONT_SIZES[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment(headingComponent)).toMatchSnapshot();
    });
  });

  headingComponentSizeOverrides.forEach((headingComponent, index) => {
    test(`Matches the snapshot for heading ${HEADING_LEVELS[index]} and font size ${PALMETTO_FONT_SIZES[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment(headingComponent)).toMatchSnapshot();
    });
  });

  headingComponentColors.forEach((headingComponent, index) => {
    test(`Matches the snapshot for color ${PALMETTO_BRAND_COLORS[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment(headingComponent)).toMatchSnapshot();
    });
  });
});
