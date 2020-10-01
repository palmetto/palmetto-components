/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

describe('Card', () => {
  test('card has correct background class if subduedd', () => {
    const { container } = render(<Card subdued>subdued</Card>);
    expect(container.children[0].classList).toContain('background-color-grey-lightest');
  });
});
