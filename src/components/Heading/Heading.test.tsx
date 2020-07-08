import React from 'react';
import { v4 as uuid } from 'uuid';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { PALMETTO_FONT_SIZE_OPTIONS, PALMETTO_BRAND_COLOR_OPTIONS } from '../../lib/tokens';
import { HEADING_LEVELS } from './Heading.constants';
import Heading from './Heading';

const headingComponentLevels = (
  HEADING_LEVELS.map(level => (
    <Heading as={level} key={uuid()}>
      {level}
      &nbsp;Heading Default Size
    </Heading>
  ))
);

const headingComponentSizes = (
  PALMETTO_FONT_SIZE_OPTIONS.map(fontSize => (
    <Heading size={fontSize} key={uuid()}>
      Size&nbsp;
      {fontSize}
    </Heading>
  ))
);

const headingComponentSizeOverrides = (
  HEADING_LEVELS.map((level, index) => (
    <Heading as={level} size={PALMETTO_FONT_SIZE_OPTIONS[index]} key={uuid()}>
      {level}
      &nbsp;Heading with&nbsp;
      {PALMETTO_FONT_SIZE_OPTIONS[index]}
      &nbsp;size
    </Heading>
  ))
);

const headingComponentColors = (
  PALMETTO_BRAND_COLOR_OPTIONS.map(color => (
    <Heading color={color} key={uuid()}>
      {color}
      &nbsp;heading
    </Heading>
  ))
);

describe('Heading', () => {
  test('Matches the snapshot for component with default props', () => {
    const { asFragment } = render(<Heading>Hello World</Heading>);
    expect(asFragment()).toMatchSnapshot();
  });
  headingComponentLevels.forEach((headingComponent, index) => {
    test(`Matches the snapshot for heading ${HEADING_LEVELS[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  headingComponentSizes.forEach((headingComponent, index) => {
    test(`Matches the snapshot for size ${PALMETTO_FONT_SIZE_OPTIONS[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  headingComponentSizeOverrides.forEach((headingComponent, index) => {
    test(`Matches the snapshot for heading ${HEADING_LEVELS[index]} and font size ${PALMETTO_FONT_SIZE_OPTIONS[index]}`, () => { // eslint-disable-line max-len
      const { asFragment } = render(headingComponent);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  headingComponentColors.forEach((headingComponent, index) => {
    test(`Matches the snapshot for color ${PALMETTO_BRAND_COLOR_OPTIONS[index]}`, () => {
      const { asFragment } = render(headingComponent);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
