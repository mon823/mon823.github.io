import React, { useState, createContext, useContext, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { DefaultTheme, ThemeProvider as StyleProvider } from 'styled-components';
import { theme, colorLight, colorDark } from '@styles/theme';
import { checkStringTrue } from '@/utils/stringTypeToBool';

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
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [isLoad, setLoad] = useState(true);
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    const systemPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const osTheme = systemPrefers ? true : false;
    const isDarkState = localTheme == null ? osTheme : checkStringTrue(localTheme);

    setDarkMode(isDarkState);
    setLoad(false);
  }, []);

  const themeState = structuredClone(theme);
  const isTheme: DefaultTheme = useMemo(() => {
    themeState.color = isDarkMode ? colorDark : colorLight;

    return themeState;
  }, [isDarkMode]);

  return isLoad ? (
    <></>
  ) : (
    <>
      <ThemeContext.Provider value={{ isDarkMode, setDarkMode }}>
        <StyleProvider theme={isTheme}>{children}</StyleProvider>
      </ThemeContext.Provider>
    </>
  );
};

const useTheme = () => {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);
  const toggleTheme = useCallback(() => {
    if (isDarkMode) {
      setDarkMode?.(false);
      window.localStorage.setItem('theme', 'false');
    } else {
      setDarkMode?.(true);
      window.localStorage.setItem('theme', 'true');
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleTheme] as const;
};

export { ThemeProvider, useTheme };
