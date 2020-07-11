/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  PALMETTO_FONT_SIZE_OPTIONS,
  PALMETTO_BRAND_COLOR_OPTIONS,
} from '../../lib/tokens';
import Box from './Box';

describe('Box', () => {
  test('aria-label is applied if set', () => {
    const { getByLabelText } = render(<Box a11yTitle="test label" />);
    expect(getByLabelText('test label')).toBeDefined();
  });

  describe('Fonts', () => {
    test('font size token classes are applied', () => {
      // eslint-disable-next-line no-lone-blocks
      {
        [...PALMETTO_FONT_SIZE_OPTIONS].forEach((fontSize, i) => {
          const { queryAllByText } = render(<Box fontSize={fontSize} key={i}>Test Box</Box>);
          expect(queryAllByText('Test Box')[i].classList).toContain(`font-size-${fontSize}`);
        });
      }
    });

    test('text color token classes are applied', () => {
      // eslint-disable-next-line no-lone-blocks
      {
        [...PALMETTO_BRAND_COLOR_OPTIONS].forEach((color, i) => {
          const { queryAllByText } = render(<Box color={color} key={i}>Test Box</Box>);
          expect(queryAllByText('Test Box')[i].classList).toContain(`font-color-${color}`);
        });
      }
    });
  });
});
