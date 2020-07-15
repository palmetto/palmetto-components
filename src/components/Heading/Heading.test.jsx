import React from 'react';
import { v4 as uuid } from 'uuid';
import { screen, render } from '@testing-library/react';
import { PALMETTO_FONT_SIZE_OPTIONS, PALMETTO_BRAND_COLOR_OPTIONS } from '../../lib/tokens';
import { HEADING_LEVELS } from './Heading.constants';
import Heading from './Heading';

const headingComponentLevels = (
  HEADING_LEVELS.map(level => (
    <Heading as={level} key={uuid()}>
      {level}
    </Heading>
  ))
);

const headingComponentSizes = (
  PALMETTO_FONT_SIZE_OPTIONS.map(fontSize => (
    <Heading size={fontSize} key={uuid()}>
      {fontSize}
    </Heading>
  ))
);

const headingComponentColors = (
  PALMETTO_BRAND_COLOR_OPTIONS.map(color => (
    <Heading color={color} key={uuid()}>
      {color}
    </Heading>
  ))
);

describe('Heading', () => {
  test('it has the correct defaultProps', () => {
    expect(Heading.defaultProps.as).toEqual('h4');
    expect(Heading.defaultProps.className).toBeUndefined();
    expect(Heading.defaultProps.color).toBeUndefined();
    expect(Heading.defaultProps.size).toBeUndefined();
  });

  test('it adds className', () => {
    render(<Heading className="test-class">Hello World</Heading>);
    expect(screen.getByText('Hello World').classList).toContain('test-class');
  });

  describe('Levels', () => {
    headingComponentLevels.forEach((headingComponent, index) => {
      test(`it renders the specified html heading ${HEADING_LEVELS[index]}`, () => {
        render(headingComponent);
        expect(document.getElementsByTagName(HEADING_LEVELS[index])[0]).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    headingComponentSizes.forEach((headingComponent, index) => {
      test(`it renders the specified size ${PALMETTO_FONT_SIZE_OPTIONS[index]}`, () => {
        render(headingComponent);
        expect(screen.getByText(PALMETTO_FONT_SIZE_OPTIONS[index]).classList)
          .toContain(`font-size-${PALMETTO_FONT_SIZE_OPTIONS[index]}`);
      });
    });
  });

  describe('Colors', () => {
    headingComponentColors.forEach((headingComponent, index) => {
      test(`it renders the specified color ${PALMETTO_BRAND_COLOR_OPTIONS[index]}`, () => {
        render(headingComponent);
        expect(screen.getByText(PALMETTO_BRAND_COLOR_OPTIONS[index]).classList)
          .toContain(`font-color-${PALMETTO_BRAND_COLOR_OPTIONS[index]}`);
      });
    });
  });
});
