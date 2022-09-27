import React from 'react';
import styled from 'styled-components';
import IconGithub from '@/images/github.svg';
import IconMail from '@/images/mail.svg';

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

const Icon = styled.img`
  cursor: pointer;
  opacity: 0.6;
  padding-left: 10px;
  width: 34px;
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
          <Icon
            onClick={() => {
              window.open('https://github.com/mon823');
            }}
            src={IconGithub}
          />
          <Icon
            onClick={() => {
              window.open('mailto:liendmch@gmail.com');
            }}
            src={IconMail}
          />
        </SocialLink>
      </WordWrapper>
      Latest
    </Wrapper>
  );
};
