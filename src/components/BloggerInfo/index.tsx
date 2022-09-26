import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Wrapper = styled.div`
  margin-bottom: 50px;
  height: 400px;
`;

const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  @media screen and (max-width: 499px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const Word = styled.div``;

const SocialLink = styled.span`
  display: flex;
  padding: 10px;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  cursor: pointer;
  opacity: 0.6;
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding-left: 10px;
`;

const WordStrong = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const BloggerInfo = () => {
  return (
    <Wrapper>
      <WordWrapper>
        <Word>
          안녕하세요.
          <br /> 개발자<WordStrong> 문석암 </WordStrong>입니다.
        </Word>
        <SocialLink>
          <FontAwesome
            onClick={() => {
              window.open('https://github.com/mon823');
            }}
            icon={faGithub as IconProp}
          />
          <FontAwesome
            onClick={() => {
              window.open('mailto:liendmch@gmail.com');
            }}
            icon={faEnvelope as IconProp}
          />
        </SocialLink>
      </WordWrapper>
      Latest
    </Wrapper>
  );
};
