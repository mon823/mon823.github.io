import React from 'react';
import styled from 'styled-components';
import darkMode from '@images/darkMode.png';
import { useTheme } from '@hooks/useDarkMode';

const btnSize = {
  borderSize: '45px',
  imgSize: '30px',
  bottomMargin: '25px',
  rightMargin: '25px',
};

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  bottom: calc(${btnSize.borderSize} + ${btnSize.bottomMargin});
`;

const DarkModeBtn = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.lineColor};
  border-color: ${({ theme }) => theme.color.bgColor};
  cursor: pointer;
  width: ${btnSize.borderSize};
  height: ${btnSize.borderSize};
  right: ${btnSize.rightMargin};
`;

const DarkModeIcon = styled.img<{ isDark: boolean }>`
  filter: ${props => (props.isDark ? 'invert(99%) sepia(15%) saturate(64%) hue-rotate(282deg) brightness(116%) contrast(95%)' : 'none')};
  object-fit: contain;
  width: ${btnSize.imgSize};
`;

const DarkMode = () => {
  const [isDarkMode, toggleTheme] = useTheme();
  return (
    <Wrapper>
      <DarkModeBtn onClick={toggleTheme}>
        <DarkModeIcon src={darkMode} isDark={isDarkMode} />
      </DarkModeBtn>
    </Wrapper>
  );
};

export { DarkMode };
