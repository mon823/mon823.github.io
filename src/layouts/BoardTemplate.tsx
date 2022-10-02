import React from 'react';
import Layout from '@/layouts/MainLayout';
import * as Components from '@/components';
import { getTargetData } from '@/hooks/getTargetData';
import styled from 'styled-components';

interface Iprops {
  path: string;
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

const Hr = styled.hr`
  width: 95%;
  background-color: ${({ theme }) => theme.color.lineColor};
  opacity: 0.2;
`;

const Template = (props: Iprops) => {
  const result = getTargetData(props.pageContext.target, props.pageContext.is);
  return (
    <Layout>
      <Wrapper>
        <Header>{props.pageContext.target == '' ? 'ALL' : props.pageContext.target}</Header>
        <NumPost>{result.length} post</NumPost>
        <Components.BoardToc slug={props.path} />
        <Hr />
        {result.map(data => {
          return (
            <BoardWrapper key={data.node.frontmatter.slug}>
              <Components.BoardCard node={data.node}></Components.BoardCard>
            </BoardWrapper>
          );
        })}
      </Wrapper>
    </Layout>
  );
};

export default Template;

export const Head = (props: Iprops) => {
  return (
    <>
      <Components.Seo>
        <title>{props.pageContext.target == '' ? 'Post: All' : 'Post: ' + props.pageContext.target}</title>
        <meta property="og:title" content={props.pageContext.target == '' ? 'Post: All' : 'Post: ' + props.pageContext.target} />
      </Components.Seo>
    </>
  );
};
