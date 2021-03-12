import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextLink } from './TextLink';

const LINK_TEXT = 'Click me!';

const ANCHOR_PROPS = {
  href: 'http://palmetto.com',
};

describe('TextLink', () => {
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

  describe('With anchor attributes', () => {
    test('It renders a link with anchor attributes if passed', () => {
      render(<TextLink {...ANCHOR_PROPS} target="_blank">{LINK_TEXT}</TextLink>);

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

  describe('onClick event', () => {
    test('it does not fire function if onClick callback not provided', () => {
      const mockedHandleClick = jest.fn();

      render(<TextLink {...ANCHOR_PROPS}>Click</TextLink>);

      fireEvent.click(screen.getByRole('link'));

      expect(mockedHandleClick).toBeCalledTimes(0);
    });

    test('it prevents default event behavior if specified by onClick', async () => {
      const mockedHandleClick = jest.fn(event => event.preventDefault());
      const mockedNavigate = jest.fn(() => null);

      render(<TextLink navigate={mockedNavigate} onClick={mockedHandleClick} {...ANCHOR_PROPS}>Click</TextLink>);
      fireEvent.click(screen.getByRole('link'));

      expect(mockedHandleClick).toBeCalledTimes(1);
      expect(mockedNavigate).not.toBeCalled();
    });
  });

  describe('React Router', () => {
    it('fires navigate callback when included', () => {
      const mockedNavigate = jest.fn();
      render(<TextLink navigate={mockedNavigate} href="/">react router link</TextLink>);

      fireEvent.click(screen.getByRole('link'));

      expect(mockedNavigate).toBeCalledTimes(1);
    });

    it('does not fire navigate callback if target is _blank', () => {
      const mockedNavigate = jest.fn();
      render(<TextLink navigate={mockedNavigate} href="/" target="_blank">react router link</TextLink>);

      fireEvent.click(screen.getByRole('link'));

      expect(mockedNavigate).toBeCalledTimes(0);
    });
  });
});
