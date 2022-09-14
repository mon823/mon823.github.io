import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.nav`
  max-width: 1080px;
  padding: 30px 0%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  font-family: 'SourceHanSerif';
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media screen and (max-width: 1180px) {
    padding: 30px 5%;
  }
`;

const Icon = styled(Link)`
  justify-content: center;
  all: unset;
  cursor: pointer;
  @media screen and (max-width: 499px) {
    display: none;
  }
`;

const NavMenuBox = styled.div`
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

const NavMenu = styled.button`
  all: unset;
  cursor: pointer;
  justify-content: center;
  padding: 0px 10px;
`;

const Nav = () => {
  return (
    <>
      <Wrapper>
        <Icon to="/">Life Vending Machine</Icon>
        <NavMenuBox>
          <NavMenu>about </NavMenu>
          <NavMenu>posts</NavMenu>
        </NavMenuBox>
      </Wrapper>
    </>
  );
};

export { Nav };
