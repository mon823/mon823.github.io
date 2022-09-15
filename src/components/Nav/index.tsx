import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.nav`
  padding-bottom: 20px;
  display: flex;
  font-family: 'SourceHanSerif';
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
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
