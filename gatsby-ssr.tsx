import * as React from 'react';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { ThemeProvider } from '@/hooks/useDarkMode';
import type { GatsbySSR } from 'gatsby';

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({ element }) => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
};

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({ element }) => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
};
``;
