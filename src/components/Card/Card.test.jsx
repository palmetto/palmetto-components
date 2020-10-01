/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

describe('Card', () => {
  test('card has white background class by default', () => {
    const { container } = render(<Card>test</Card>);
    expect(container.children[0].classList).toContain('background-color-white');
  });
  test('card has correct background class if subdued', () => {
    const { container } = render(<Card subdued>subdued</Card>);
    expect(container.children[0].classList).toContain('background-color-grey-lightest');
  });
});
