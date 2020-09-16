/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  PALMETTO_FONT_COLOR_OPTIONS,
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BACKGROUND_COLOR_OPTIONS,
  PALMETTO_BORDER_COLOR_OPTIONS,
  PALMETTO_SPACING_SIZE_OPTIONS,
} from '../../lib/tokens';
import Box from './Box';

describe('Box', () => {
  test('aria-label is applied if set', () => {
    const { getByLabelText } = render(<Box aria-label="test label" />);
    expect(getByLabelText('test label')).toBeDefined();
  });

  test('background color token classes are applied', () => {
    [...PALMETTO_BACKGROUND_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box background={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`background-color-${color}`);
    });
  });

  test('font size token classes are applied', () => {
    [...PALMETTO_FONT_SIZE_OPTIONS].forEach((fontSize, i) => {
      const { queryAllByText } = render(<Box fontSize={fontSize} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`font-size-${fontSize}`);
    });
  });

  test('text color token classes are applied', () => {
    [...PALMETTO_FONT_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box color={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`font-color-${color}`);
    });
  });

  test('border color token classes are applied', () => {
    [...PALMETTO_BORDER_COLOR_OPTIONS].forEach((color, i) => {
      const { queryAllByText } = render(<Box border={color} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`border-color-${color}`);
    });
  });

  test('overflow option classes are applied', () => {
    const overflowOptions = [
      'visible',
      'hidden',
      'clip',
      'scroll',
      'auto',
      'inherit',
      'initial',
      'unset',
    ];

    [...overflowOptions].forEach((value, i) => {
      const { queryAllByText } = render(<Box overflow={value} key={i}>Test Box</Box>);
      expect(queryAllByText('Test Box')[i].classList).toContain(`overflow-${value}`);
    });
  });

  test('childGap margin classes are applied', () => {
    [...PALMETTO_SPACING_SIZE_OPTIONS].forEach((value, optionIndex) => {
      const { container } = render(
        <Box childGap={value} key={optionIndex}>
          <Box className="foo" key={`child1${optionIndex}`}>child 1</Box>
          <Box className="foo" key={`child2${optionIndex}`}>child 2</Box>
        </Box>,
      );

      const { children } = container.children[0];

      Array.from(children).forEach((child, childIndex) => {
        expect(child.classList).toContain('foo');
        if (childIndex > children.length - 1) {
          expect(child.classList).toContain(`m-bottom-${value}`);
        }
      });
    });
  });
});
