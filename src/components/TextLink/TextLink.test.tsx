import React, { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TextLink from './TextLink';

const LINK_TEXT = 'Click me!';

const ANCHOR_PROPS = {
  href: 'http://palmetto.com',
};

const ROUTER_LINK_PROPS = {
  to: '/',
};

describe('TextTextLink', () => {
  describe('Default', () => {
    test('It renders an anchor tag with text and an href attribute', () => {
      render(<TextLink {...ANCHOR_PROPS}>{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', ANCHOR_PROPS.href);
      const linkText = screen.getByText(LINK_TEXT);
      expect(linkText).toBeInTheDocument();
    });
  });

  describe('With React Router Link', () => {
    test('It renders an anchor with text and href', () => {
      render(
        <BrowserRouter>
          <TextLink {...ROUTER_LINK_PROPS}>{LINK_TEXT}</TextLink>
        </BrowserRouter>,
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      const linkText = screen.getByText(LINK_TEXT);
      expect(linkText).toBeInTheDocument();
    });
  });

  describe('With anchor attributes', () => {
    test('It renders a link with some text', () => {
      render(<TextLink {...ANCHOR_PROPS} >{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      const linkText = screen.getByText(LINK_TEXT);
      expect(linkText).toBeInTheDocument();
    });
  });
});
