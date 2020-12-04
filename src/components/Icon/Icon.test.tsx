import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  test('default', () => {
    render(<Icon name="user" />);
    const icon = screen.getByTestId('icon-testid--user');
    expect(icon).toBeInTheDocument();
  });

  test('fallback', () => {
    render(<Icon name={'does-not-exist' as 'user'} />);
    const icon = screen.getByText('???');
    expect(icon).toBeInTheDocument();
  });
});
