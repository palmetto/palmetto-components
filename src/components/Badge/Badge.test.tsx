import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge, {
  BadgeSize,
  BadgeVariant,
  BADGE_COLOR_MAP,
  BADGE_SIZE_MAP,
} from './Badge';

describe('Badge', () => {
  test('Label correctly renders with base props', () => {
    render(<Badge message="hello" />);
    const badge = screen.getByText('hello');
    expect(badge).toBeInTheDocument();
  });

  test('Color Variants', () => {
    Object.keys(BADGE_COLOR_MAP).forEach(color => {
      render(<Badge variant={color as BadgeVariant} message={color} />);
      const badge = screen.getByText(color);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(`font-color-${BADGE_COLOR_MAP[color as BadgeVariant].font}`);
      expect(badge).toHaveClass(`background-color-${BADGE_COLOR_MAP[color as BadgeVariant].background}`);
    });
  });

  test('Sizes', () => {
    Object.keys(BADGE_SIZE_MAP).forEach(size => {
      render(<Badge size={size as BadgeSize} message={size} />);
      const badge = screen.getByText(size);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(`p-v-${BADGE_SIZE_MAP[size as BadgeSize].padding?.split(' ')[0]}`);
      expect(badge).toHaveClass(`p-h-${BADGE_SIZE_MAP[size as BadgeSize].padding?.split(' ')[1]}`);
      expect(badge).toHaveClass(`font-size-${BADGE_SIZE_MAP[size as BadgeSize].fontSize}`);
    });
  });
});
