import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  test('default', () => {
    render(<Icon name="user" />);
    const icon = screen.getByTestId('icon-testid--user');
    expect(icon).toBeInTheDocument();
  });

  test('does not add a class property if none is provided', () => {
    render(<Icon name="user" />);
    const icon = screen.getByTestId('icon-testid--user');
    expect(icon).not.toHaveAttribute('class');
  });

  test('adds a class property if defined', () => {
    render(<Icon name="user" className="testClass" />);
    const icon = screen.getByTestId('icon-testid--user');
    expect(icon.getAttribute('class')).toBe('testClass');
  });

  test('fallback', () => {
    render(<Icon name={'does-not-exist' as 'user'} />);
    const icon = screen.getByText('???');
    expect(icon).toBeInTheDocument();
  });
});
