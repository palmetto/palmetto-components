import React, {
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextShape {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  systemPreference: Theme;
}

export const ThemeContext = createContext<ThemeContextShape>({
  theme: 'light',
  setTheme: (_theme) => {}, // eslint-disable-line
  systemPreference: 'light',
});
ThemeContext.displayName = 'ThemeContext';

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children = null }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [systemPreference, setSystemPreference] = useState<Theme>('light');

  const prefersDark = useRef(window?.matchMedia('(prefers-color-scheme: dark)'));

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
    const currentMediaQuery = prefersDark.current;

    if (typeof window !== 'undefined') {
      handleThemePreferenceChange(currentMediaQuery);
      currentMediaQuery.addEventListener('change', handleThemePreferenceChange);
    }

    return () => currentMediaQuery.removeEventListener('change', handleThemePreferenceChange);
  }, [prefersDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, systemPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};
