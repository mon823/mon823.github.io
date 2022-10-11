import React from 'react';
import styled from 'styled-components';
import { getAboutData } from '@/hooks/getAboutData';
import IconGithub from '@/images/github.svg';
import IconPost from '@/images/post.svg';
import IconDemo from '@/images/demo.svg';
import { navigate } from 'gatsby';
import { useTheme } from '@hooks/useDarkMode';
import * as Components from '@/components';

const Wrapper = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
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
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Icon = styled.img<{ isDark: boolean }>`
  cursor: pointer;
  opacity: 0.6;
  padding-left: 10px;
  width: 24px;
  filter: ${props => (props.isDark ? 'invert(100%) sepia(85%) saturate(365%) hue-rotate(34deg) brightness(108%) contrast(104%)' : 'none')};
`;

const IconFun = (data: string | null, src: string) => {
  const [isDarkMode] = useTheme();
  return data ? (
    <Icon
      onClick={() => {
        void navigate(data);
      }}
      src={src}
      isDark={isDarkMode}
    />
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
      </Header>
      {data.allMarkdownRemark.edges.map(data => {
        return (
          <>
            <ProjectWrapper>
              <Title>{data.node.frontmatter.title}</Title>
              {IconFun(data.node.frontmatter.post, IconPost)}
              {IconFun(data.node.frontmatter.github, IconGithub)}
              {IconFun(data.node.frontmatter.demo, IconDemo)}
            </ProjectWrapper>
            <Components.SplitTag data={data.node.frontmatter.tag} />
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: data.node.html }} />
            <Hr />
          </>
        );
      })}
    </Wrapper>
  );
};
