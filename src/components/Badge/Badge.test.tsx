import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { BADGE_SIZES, BADGE_VARIANTS } from './Badge.constants';

describe('Badge', () => {
  test('Label correctly renders with base props', () => {
    render(<Badge message="hello" />);
    const badge = screen.getByText('hello');
    expect(badge).toBeInTheDocument();
  });

  describe('Variants', () => {
    BADGE_VARIANTS.map(variant => describe(`${BADGE_VARIANTS}`, () => {
      test(`it has a ${variant} class applied to it`, () => {
        render(<Badge variant={variant} message={`${variant} Badge`} />);
        const badge = screen.getByText(`${variant} Badge`);

        expect(badge.getAttribute('class')).toContain(variant);
      });
    }));
  });

  describe('Sizes', () => {
    BADGE_SIZES.map(size => describe(`${BADGE_SIZES}`, () => {
      test(`it has a ${size} class applied to it`, () => {
        render(<Badge size={size} message={`${size} Badge`} />);
        const badge = screen.getByText(`${size} Badge`);

        expect(badge.getAttribute('class')).toContain(`size-${size}`);
      });
    }));

    test('It applies responsive size classes', () => {
      render(
        <Badge
          size={{
            base: 'sm', tablet: 'md', desktop: 'lg', hd: 'xl',
          }}
          message="badge"
        >
          button
        </Badge>,
      );

      const badge = screen.getByText('badge');

      expect(badge.getAttribute('class')).toContain('size-sm');
      expect(badge.getAttribute('class')).toContain('size-md-tablet');
      expect(badge.getAttribute('class')).toContain('size-lg-desktop');
      expect(badge.getAttribute('class')).toContain('size-xl-hd');
    });
  });
});
