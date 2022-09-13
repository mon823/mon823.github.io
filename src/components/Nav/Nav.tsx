import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { RouteComponentProps } from '@reach/router';

const Wrapper = styled.nav`
  padding: 30px 15%;
  display: flex;
  font-family: 'SourceHanSerif';
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  @media screen and (max-width: 768px) {
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

const Nav = (props: RouteComponentProps) => {
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
