import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useGetSeries } from '@/hooks/useGetSeries';

const Wrapper = styled.div`
  margin: 30px 5px;
  background-color: ${({ theme }) => theme.color.boxColor};
  padding: 20px;
`;

const SeriesHeader = styled.a`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const SeriesHeaderCount = styled.a`
  color: ${({ theme }) => theme.color.commonColor};
`;

const SeriesBox = styled.div`
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

export const SeriesSection = ({ series, title }: { series: string; title: string }) => {
  const data = useGetSeries(series);
  return (
    <>
      <Wrapper>
        <SeriesHeader>
          SERIES: {series} <SeriesHeaderCount>({series.length})</SeriesHeaderCount>
        </SeriesHeader>
        <br />
        <br />
        {data.map(({ node }, index) => {
          const slug = '/post';
          if (title == node.frontmatter.title) {
            return (
              <SeriesBox>
                <Current>
                  {index + 1}. {node.frontmatter.title} {'<<'}
                </Current>
              </SeriesBox>
            );
          } else {
            return (
              <SeriesBox>
                <Series to={slug + node.frontmatter.slug}>
                  {index + 1}. {node.frontmatter.title}
                </Series>
              </SeriesBox>
            );
          }
        })}
      </Wrapper>
    </>
  );
};
