import * as React from 'react';
import type { HeadFC } from 'gatsby';
import { GlobalStyle } from '@styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';

const IndexPage = () => {
  return (
    <>
      <GlobalStyle />
      <h1>Main Pages</h1>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>life-vending-machine</title>
  </>
);
