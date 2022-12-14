import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { ThemeProvider } from '@/hooks/useDarkMode';
import * as Components from '@/components';

const Wrapper = styled.div`
  max-width: 1080px;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 1150px) {
    padding: 30px 5%;
  }
`;

interface Ichildren {
  children?: ReactNode;
}

const Layout = ({ children }: Ichildren) => {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Components.DarkMode />
        <Wrapper>
          <Components.Nav />
          {children}
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default Layout;
