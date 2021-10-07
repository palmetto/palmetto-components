import React, { useContext, useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeContext, ThemeProvider } from './ThemeProvider';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Theme Provider', () => {
  it('provides a theme and a setter -- dark', () => {
    const Component = () => {
      const { theme, setTheme } = useContext(ThemeContext);
      useEffect(() => {
        setTheme('dark');
      }, [setTheme]);
      return <p>{theme}</p>;
    };
    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('provides a theme and a setter -- light', () => {
    const Component = () => {
      const { theme, setTheme } = useContext(ThemeContext);
      useEffect(() => {
        setTheme('light');
      }, [setTheme]);
      return <p>{theme}</p>;
    };
    render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>,
    );
    expect(screen.getByText('light')).toBeInTheDocument();
  });
});
