import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useGetSeries } from '@/hooks/useGetSeries';

const Wrapper = styled.div`
  margin: 30px 0px;
  background-color: ${({ theme }) => theme.color.boxColor};
  border-radius: 10px;
  padding: 20px;
`;

const SeriesHeader = styled(Link)`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const SeriesHeaderCount = styled.span`
  color: ${({ theme }) => theme.color.commonColor};
`;

const SeriesBox = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Current = styled.a`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Series = styled(Link)`
  all: unset;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.commonColor};
  }
`;

export const SeriesSection = ({ series, title, slug }: { series: string; title: string; slug: string }) => {
  const data = useGetSeries(series);
  const seriesSlug = slug.split('/')[0];
  return (
    <Wrapper>
      <SeriesHeader to={'/post/' + seriesSlug}>
        SERIES: {series} <SeriesHeaderCount>({data.length})</SeriesHeaderCount>
      </SeriesHeader>
      <br />
      <br />
      {data.map(({ node }, index) => {
        const slug = '/post/';
        if (title == node.frontmatter.title) {
          return (
            <SeriesBox key={node.id}>
              <Current>
                {index + 1}. {node.frontmatter.title} {'<<'}
              </Current>
            </SeriesBox>
          );
        } else {
          return (
            <SeriesBox key={node.id}>
              <Series to={slug + node.frontmatter.slug}>
                {index + 1}. {node.frontmatter.title}
              </Series>
            </SeriesBox>
          );
        }
      })}
    </Wrapper>
  );
};
