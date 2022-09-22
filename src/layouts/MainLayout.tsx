import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { DarkMode } from '@/components/DarkModeBtn';
import { Nav } from '@/components/Nav';

const Wrapper = styled.div`
  max-width: 720px;
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;

  font-family: 'SourceHanSans';
  @media screen and (max-width: 768px) {
    padding: 30px 5%;
  }
`;

interface Ichildren {
  children?: ReactNode;
}

const Layout = ({ children }: Ichildren) => {
  return (
    <>
      <DarkMode />
      <Wrapper>
        <Nav />
        {children}
      </Wrapper>
    </>
  );
};

export default Layout;
