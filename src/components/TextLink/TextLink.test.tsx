import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextLink from './TextLink';

const LINK_TEXT = 'Click me!';

const BASE_PROPS = {
  href: 'http://palmetto.com',
};

describe('TextTextLink', () => {
  describe('Default', () => {
    test('It renders a link with some text', () => {
      render(<TextLink {...BASE_PROPS}>{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      const linkText = screen.getByText(LINK_TEXT);
      expect(linkText).toBeInTheDocument();
    });
  });

  describe('Renders an anchor tag if href', () => {
    test('It renders a link with some text', () => {
      render(<TextLink>{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      const linkText = screen.getByText(LINK_TEXT);
      expect(linkText).toBeInTheDocument();
    });
  });
});
