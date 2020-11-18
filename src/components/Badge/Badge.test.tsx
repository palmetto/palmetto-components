import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge, {
  BadgeSize,
  BadgeVariant,
  BadgeColorAttributes,
  BadgeSizeAttributes,
} from './Badge';

describe('Badge', () => {
  test('Label correctly renders with base props', () => {
    render(<Badge message="hello" />);
    const badge = screen.getByText('hello');
    expect(badge).toBeInTheDocument();
  });

  test('Color Variants', () => {
    const colorMap: { [key in BadgeVariant]: BadgeColorAttributes } = {
      info: { font: 'dark-500', background: 'info-100' },
      primary: { font: 'dark-500', background: 'primary-100' },
      success: { font: 'dark-500', background: 'success-100' },
      secondary: { font: 'dark-500', background: 'secondary-100' },
      warning: { font: 'dark-500', background: 'warning-100' },
      tertiary: { font: 'dark-500', background: 'tertiary-100' },
      danger: { font: 'dark-500', background: 'danger-100' },
      default: { font: 'dark-500', background: 'grey-100' },
    };

    Object.keys(colorMap).forEach(color => {
      render(<Badge variant={color as BadgeVariant} message={color} />);
      const badge = screen.getByText(color);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(`font-color-${colorMap[color as BadgeVariant].font}`);
      expect(badge).toHaveClass(`background-color-${colorMap[color as BadgeVariant].background}`);
    });
  });

  test('Sizes', () => {
    const sizeMap: { [key in BadgeSize]: BadgeSizeAttributes} = {
      sm: { fontSize: '2xs', padding: '2xs 2xs' },
      md: { fontSize: 'xs', padding: '2xs xs' },
      lg: { fontSize: 'sm', padding: '2xs xs' },
      xl: { fontSize: 'md', padding: 'xs sm' },
    };

    Object.keys(sizeMap).forEach(size => {
      render(<Badge size={size as BadgeSize} message={size} />);
      const badge = screen.getByText(size);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(`p-v-${sizeMap[size as BadgeSize].padding?.split(' ')[0]}`);
      expect(badge).toHaveClass(`p-h-${sizeMap[size as BadgeSize].padding?.split(' ')[1]}`);
      expect(badge).toHaveClass(`font-size-${sizeMap[size as BadgeSize].fontSize}`);
    });
  });
});
