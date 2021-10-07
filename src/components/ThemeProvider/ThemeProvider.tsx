import React, { createContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextShape {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  systemPreference: Theme;
}

export const PalmettoThemeContext = createContext<ThemeContextShape>({
  theme: 'light',
  setTheme: (_theme) => {},
  systemPreference: 'light',
});
PalmettoThemeContext.displayName = 'PalmettoThemeContext';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const PalmettoThemeProvider: React.FC<ThemeProviderProps> = ({ children = null }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemPreference, setSystemPreference] = useState<Theme>('light');

  const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)');

  const handleThemePreferenceChange = (mediaQuery: MediaQueryListEvent | MediaQueryList) => {
    let preference: Theme;
    if (mediaQuery.matches) {
      preference = 'dark';
    } else {
      preference = 'light';
    }

    setSystemPreference(preference);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleThemePreferenceChange(prefersDark);
      prefersDark.addEventListener('change', handleThemePreferenceChange);
    }

    return () => prefersDark.removeEventListener('change', handleThemePreferenceChange);
  }, []);

  return (
    <PalmettoThemeContext.Provider value={{ theme, setTheme, systemPreference }}>
      {children}
    </PalmettoThemeContext.Provider>
  );
};