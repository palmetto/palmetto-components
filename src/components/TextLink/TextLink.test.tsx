import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
      expect(link).toHaveClass('primary');
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
    test('It renders a link with anchor attributes if passed', () => {
      render(<TextLink target="_blank" {...ANCHOR_PROPS}>{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('With custom className', () => {
    test('It renders a link with a custom class', () => {
      render(<TextLink className="my-class" {...ANCHOR_PROPS}>{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('my-class');
    });
  });

  describe('Color variations', () => {
    test('It renders with the danger class if variant=danger', () => {
      render(<TextLink variant="danger" {...ANCHOR_PROPS}>{LINK_TEXT}</TextLink>);

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('danger');
    });
  });
});
