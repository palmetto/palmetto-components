import React from 'react';
import { v4 as uuid } from 'uuid';
import { screen, render } from '@testing-library/react';
import { FONT_SIZE_OPTIONS, FONT_COLOR_OPTIONS } from '../../lib/tokens';
import { HEADING_LEVELS } from './Heading.constants';
import { Heading } from './Heading';

const headingComponentLevels = (
  HEADING_LEVELS.map(level => (
    <Heading as={level} key={uuid()}>
      {level}
    </Heading>
  ))
);

const headingComponentSizes = (
  FONT_SIZE_OPTIONS.map(fontSize => (
    <Heading size={fontSize} key={uuid()}>
      {fontSize}
    </Heading>
  ))
);

const headingComponentColors = (
  FONT_COLOR_OPTIONS.map(variant => (
    <Heading variant={variant} key={uuid()}>
      {variant}
    </Heading>
  ))
);

describe('Heading', () => {
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
      test(`it renders the specified size ${FONT_SIZE_OPTIONS[index]}`, () => {
        render(headingComponent);
        expect(screen.getByText(FONT_SIZE_OPTIONS[index]).classList)
          .toContain(`font-size-${FONT_SIZE_OPTIONS[index]}`);
      });
    });
  });

  describe('Colors', () => {
    headingComponentColors.forEach((headingComponent, index) => {
      test(`it renders the specified variant ${FONT_COLOR_OPTIONS[index]}`, () => {
        render(headingComponent);
        expect(screen.getByText(FONT_COLOR_OPTIONS[index]).classList)
          .toContain(`font-color-${FONT_COLOR_OPTIONS[index]}`);
      });
    });
  });
});
