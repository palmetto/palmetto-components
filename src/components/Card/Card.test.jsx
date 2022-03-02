/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Card } from './Card';

describe('Card', () => {
  test('card has overflow hidden by default', () => {
    const { container } = render(<Card>test</Card>);
    expect(container.children[0].classList).toContain('overflow-hidden');
  });
});
