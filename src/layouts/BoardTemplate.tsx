import React from 'react';
import Layout from '@/layouts/MainLayout';
import { BoardCard } from '@/components/BoardCard';
import { getAllData } from '@/hooks/getAllData';
import styled from 'styled-components';

interface Iprops {
  pageContext: {
    is: string;
    slug: string;
    target: string;
  };
}
const Wrapper = styled.div`
  margin-top: 30px;
`;

const Header = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-decoration: underline;
  margin-bottom: 15px;
`;

const NumPost = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: 30px;
`;

const BoardWrapper = styled.div``;

const Template = (props: Iprops) => {
  const result = getAllData(props.pageContext.target, props.pageContext.is);
  return (
    <Layout>
      <Wrapper>
        <Header>
          {props.pageContext.is.toUpperCase()} : {props.pageContext.target == '' ? 'ALL' : props.pageContext.target}
        </Header>
        <NumPost>{result.length} post</NumPost>
        {result.map(data => {
          return (
            <BoardWrapper key={data.node.frontmatter.slug}>
              <BoardCard node={data.node}></BoardCard>
            </BoardWrapper>
          );
        })}
      </Wrapper>
    </Layout>
  );
};

export default Template;
