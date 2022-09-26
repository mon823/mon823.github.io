import React from 'react';
import styled from 'styled-components';
import Logo from '@/images/logo.svg';
import { navigate } from 'gatsby';

const Wrapper = styled.nav`
  padding-bottom: 20px;
  display: flex;
  height: 50px;
  font-family: 'SourceHanSerif';
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  .logo {
    display: none;
  }
  @media screen and (max-width: 499px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  @media screen and (max-width: 273px) {
    .logo {
      display: block;
      background-image: url(${Logo});
      width: 200px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
`;

const Icon = styled.div`
  justify-content: center;
  all: unset;
  cursor: pointer;
  @media screen and (max-width: 273px) {
    display: none;
    font-size: 0;
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
    <Wrapper>
      <Icon
        onClick={() => {
          void navigate('/');
        }}
      >
        Life Vending Machine
      </Icon>
      <div
        className="logo"
        onClick={() => {
          void navigate('/');
        }}
      ></div>
      <NavMenuBox>
        <NavMenu>about </NavMenu>
        <NavMenu
          onClick={() => {
            void navigate('/category/');
          }}
        >
          posts
        </NavMenu>
      </NavMenuBox>
    </Wrapper>
  );
};

export { Nav };
