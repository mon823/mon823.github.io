import React, { ReactNode } from 'react';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { ThemeProvider } from '@/hooks/useDarkMode';
import { DarkMode } from '@/components/DarkModeBtn';
import { Nav } from '@/components/Nav';

interface Ichildren {
  children?: ReactNode;
}

const Layout = ({ children }: Ichildren) => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <DarkMode />
      <Nav />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
