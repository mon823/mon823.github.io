import React from 'react';
import type { HeadFC } from 'gatsby';
import '@styles/typography.css';
import { GlobalStyle } from '@styles/GlobalStyle';
import { ThemeProvider } from '@hooks/useDarkMode';

const IndexPage = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>life-vending-machine</title>
  </>
);
