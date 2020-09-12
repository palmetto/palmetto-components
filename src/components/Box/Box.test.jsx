/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  PALMETTO_FONT_COLOR_OPTIONS,
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BACKGROUND_COLOR_OPTIONS,
  PALMETTO_BORDER_COLOR_OPTIONS,
} from '../../lib/tokens';
import Box from './Box';

describe('Box', () => {
  test('aria-label is applied if set', () => {
    const { getByLabelText } = render(<Box a11yTitle="test label" />);
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
});
