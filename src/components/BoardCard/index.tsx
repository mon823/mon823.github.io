import React from 'react';
import styled from 'styled-components';
import { SplitTag } from '@/components/Tag';
import { navigate } from 'gatsby';

import type { Inode } from '@/types/dataType';

const Wrapper = styled.div`
  cursor: pointer;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 30px;
  margin-bottom: 20px;
`;

const Hr = styled.hr`
  width: 95%;
  background-color: ${({ theme }) => theme.color.lineColor};
  opacity: 0.2;
`;

const LinkWrapper = styled.div`
  &:hover {
    .cardMain {
      text-decoration: underline;
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Series = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.commonColor};
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
  @media screen and (max-width: 499px) {
    display: none;
  }
`;

const Main = styled.p`
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 20px;
`;

const Info = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.commonColor};
  margin-top: 15px;
  display: flex;
`;

const Date = styled.p`
  margin-right: auto;
`;

const Category = styled.div`
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
`;

export const BoardCard = ({ node }: { node: Inode }) => {
  const seriesSlug = node.frontmatter.slug.split('/')[0];
  return (
    <>
      <LinkWrapper
        onClick={() => {
          void navigate('/post/' + node.frontmatter.slug);
        }}
      >
        <Wrapper>
          <TitleBox>
            <Title className="cardMain">{node.frontmatter.title}</Title>
            <Series
              onClick={e => {
                e.stopPropagation();
                void navigate('/post/' + seriesSlug);
              }}
            >
              {node.frontmatter.series}
            </Series>
          </TitleBox>
          <SplitTag data={node.frontmatter.tag}></SplitTag>
          <Main>{node.excerpt}</Main>
          <Info>
            <Date>{node.frontmatter.date}</Date>
            <Category
              onClick={e => {
                e.stopPropagation();
                void navigate('/category/' + node.frontmatter.category);
              }}
            >
              {node.frontmatter.category}
            </Category>
          </Info>
        </Wrapper>
      </LinkWrapper>
      <Hr />
    </>
  );
};
