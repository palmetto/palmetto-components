/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardSection } from './CardSection';

describe('Card/CardSection', () => {
  test('lg padding class is applied by default', () => {
    const { container } = render(<CardSection>Test Card</CardSection>);
    expect(container.children[0].classList).toContain('p-h-lg');
  });

  test('is subdued', () => {
    const { container } = render(<CardSection subdued>subdued</CardSection>);
    expect(container.children[0].classList).toContain('card-subdued');
  });

  test('title is rendered as h4 if defined as a string', () => {
    const { container } = render(<CardSection title="section title" />);
    expect(container.getElementsByTagName('h4')).toHaveLength(1);
  });

  test('title is rendered as node if defined as a node', () => {
    const { container } = render(<CardSection title={<h1>section title node</h1>} />);
    expect(container.getElementsByTagName('h1')).toHaveLength(1);
  });
});
