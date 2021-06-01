/* eslint-disable react/no-array-index-key */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardHeader } from './CardHeader';

describe('Card/CardHeader', () => {
  test('correct padding classes are applied', () => {
    const { getByText } = render(<CardHeader>Test Card Header</CardHeader>);
    expect(getByText('Test Card Header').classList).toContain('p-h-lg');
    expect(getByText('Test Card Header').classList).toContain('p-v-md');
  });

  test('title is rendered as h4 if defined as a string', () => {
    const { container } = render(<CardHeader title="card title" />);
    expect(container.getElementsByTagName('h4')).toHaveLength(1);
  });

  test('title is rendered as node if defined as a node', () => {
    const { container } = render(<CardHeader title={<h1>card title node</h1>} />);
    expect(container.getElementsByTagName('h1')).toHaveLength(1);
  });
});
