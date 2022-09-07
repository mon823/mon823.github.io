import React from 'react';
import type { HeadFC } from 'gatsby';
import '@styles/typography.css';
import { GlobalStyle } from '@styles/GlobalStyle';
import { DarkMode } from '@components/DarkModeBtn/DarkModeBtn';
import { ThemeProvider } from '@hooks/useDarkMode';

const IndexPage = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <DarkMode />
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Life Vending Machine</title>
  </>
);
