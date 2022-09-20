import React, { useState, createContext, useContext, ReactNode, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ThemeProvider as StyleProvider } from 'styled-components';
import { theme, colorLight, colorDark } from '@styles/theme';
import { checkStringTrue } from '@utils/stringTypeToBool';
import { getValueFromLocalStorage, setValueToLocalStorage } from '@/utils/localStorage';

interface Ichildren {
  children: ReactNode;
}
interface IthemeContext {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const ThemeContextState = {
  isDarkMode: false,
  setDarkMode: () => undefined,
};

const ThemeContext = createContext<IthemeContext>(ThemeContextState);

const ThemeProvider = ({ children }: Ichildren) => {
  const localTheme = getValueFromLocalStorage('theme');
  const systemPrefers = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });
  const osTheme = systemPrefers ? true : false;
  const isDarkState = localTheme === '' ? osTheme : checkStringTrue(localTheme);

  const [isDarkMode, setDarkMode] = useState(isDarkState);
  const themeState = structuredClone(theme);

  themeState.color = isDarkMode ? colorDark : colorLight;

  return (
    <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>
      <StyleProvider theme={themeState}>{children}</StyleProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);
  const toggleTheme = useCallback(() => {
    if (isDarkMode) {
      setDarkMode?.(false);
      setValueToLocalStorage('theme', 'false');
    } else {
      setDarkMode?.(true);
      setValueToLocalStorage('theme', 'true');
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleTheme] as const;
};

export { ThemeProvider, useTheme };
