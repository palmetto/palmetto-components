/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from './Card';

describe('Card', () => {
  test('card has white background and sm shadow by default', () => {
    const { container } = render(<Card>test</Card>);
    expect(container.children[0].classList).toContain('background-color-white');
    expect(container.children[0].classList).toContain('shadow-sm');
  });
  test('card has correct background color and no shadow if subdued', () => {
    const { container } = render(<Card subdued>subdued</Card>);
    expect(container.children[0].classList).toContain('background-color-grey-lightest');
    expect(container.children[0].classList).not.toContain('shadow-sm');
  });
});
