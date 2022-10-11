import React from 'react';
import styled from 'styled-components';
import { getAboutData } from '@/hooks/getAboutData';
import IconGithub from '@/images/github.svg';
import IconPost from '@/images/post.svg';
import IconDemo from '@/images/demo.svg';
import { navigate } from 'gatsby';
import { useTheme } from '@hooks/useDarkMode';
import * as Components from '@/components';

const Wrapper = styled.div`
  padding: 0% 10%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const HeaderSub = styled.div`
  margin-top: 5px;
  font-size: ${({ theme }) => theme.fontSize.md};
  text-align: center;
`;

const Underline = styled.div`
  margin-top: 10px;
  width: 150px;
  border: 2px solid ${({ theme }) => theme.color.textColor};
`;

const Hr = styled.hr`
  margin: 50px 0px;
  width: 95%;
  background-color: ${({ theme }) => theme.color.lineColor};
  opacity: 0.2;
`;

const ProjectWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ToolTipText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  opacity: 0.5;
  display: none;
  position: absolute;
  background-color: black;
  padding: 5px 0;
  color: #fff;
  width: 50px;
  border-radius: 6px;
  text-align: center;
  margin-left: -10px;
  z-index: 1;
  top: 150%;
`;

const MarkdownBox = styled.div`
  cursor: pointer;
`;

const Icon = styled.img<{ isDark: boolean }>`
  cursor: pointer;
  opacity: 0.6;
  padding-left: 10px;
  width: 24px;
  filter: ${props => (props.isDark ? 'invert(100%) sepia(85%) saturate(365%) hue-rotate(34deg) brightness(108%) contrast(104%)' : 'none')};
`;

const ToolTipBox = styled.div`
  position: relative;
  display: inline-block;
  & ${Icon}:hover + ${ToolTipText} {
    display: block;
  }

  & ${Icon} + ${ToolTipText}:after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

const IconFun = (data: string | null, src: string, tooltip: string) => {
  const [isDarkMode] = useTheme();
  return data ? (
    <>
      <ToolTipBox>
        <Icon
          onClick={() => {
            void navigate(data);
          }}
          src={src}
          isDark={isDarkMode}
        ></Icon>
        <ToolTipText>{tooltip}</ToolTipText>
      </ToolTipBox>
    </>
  ) : (
    <></>
  );
};

export const About = () => {
  const data = getAboutData();
  return (
    <Wrapper>
      <Header>
        Projects
        <Underline />
        <HeaderSub>본문을 클릭하여 상세한 개발 과정을 확인하세요</HeaderSub>
      </Header>
      {data.allMarkdownRemark.edges.map(data => {
        return (
          <div key={data.node.frontmatter.title}>
            <ProjectWrapper>
              <Title>{data.node.frontmatter.title}</Title>
              {IconFun(data.node.frontmatter.post, IconPost, 'post')}
              {IconFun(data.node.frontmatter.github, IconGithub, 'github')}
              {IconFun(data.node.frontmatter.demo, IconDemo, 'demo')}
            </ProjectWrapper>
            <Components.SplitTag data={data.node.frontmatter.tag} />
            <MarkdownBox
              className="markdown-body"
              onClick={() => {
                if (data.node.frontmatter.post) {
                  window.open(data.node.frontmatter.post);
                }
              }}
              dangerouslySetInnerHTML={{ __html: data.node.html }}
            />
            <Hr />
          </div>
        );
      })}
    </Wrapper>
  );
};
