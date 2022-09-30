import React from 'react';
import type { HeadProps } from 'gatsby';
import '@styles/typography.css';
import Layout from '@layouts/MainLayout';
import { RouteComponentProps } from '@reach/router';
import { getTargetData } from '@/hooks/getTargetData';
import { BoardCard } from '@/components/BoardCard';
import * as Components from '@/components';
import { Seo } from '@/components/SEO';

const IndexPage = (props: RouteComponentProps) => {
  const result = getTargetData('', 'category').splice(0, 5);

  return (
    <Layout>
      <Components.BloggerInfo></Components.BloggerInfo>
      {result.map(data => {
        return <BoardCard key={data.node.frontmatter.slug} node={data.node}></BoardCard>;
      })}
    </Layout>
  );
};

export default IndexPage;

export const Head = (props: HeadProps) => (
  <>
    <Seo>
      <title>Life Vending Machine</title>
      <meta name="description" content="개발 일지 블로그" />
      <meta name="og:description" content="개발 일지 블로그" />
      <meta property="og:title" content="Life Vending Machine" />
    </Seo>
  </>
);
