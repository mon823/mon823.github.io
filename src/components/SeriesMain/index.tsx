import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useGetSeries } from '@/hooks/useGetSeries';
import { SplitTag } from '@/components/Tag';

const Wrapper = styled.div`
  padding: 20px;
`;

const SeriesBox = styled.div`
  margin: 10px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const Series = styled(Link)`
  all: unset;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.commonColor};
  }
`;

export const SeriesMain = ({ series }: { series: string }) => {
  const data = useGetSeries(series);
  return (
    <Wrapper>
      <strong>Series List ({data.length})</strong>
      <br />
      <br />
      {data.map(({ node }, index) => {
        const slug = '/post/';
        return (
          <SeriesBox key={node.id}>
            <Series to={slug + node.frontmatter.slug}>
              {index + 1}. {node.frontmatter.title}
            </Series>
            <br />
            <SplitTag data={node.frontmatter.tag} />
          </SeriesBox>
        );
      })}
    </Wrapper>
  );
};
