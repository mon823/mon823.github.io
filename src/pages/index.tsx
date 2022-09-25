import React from 'react';
import type { HeadFC } from 'gatsby';
import '@styles/typography.css';
import Layout from '@layouts/MainLayout';
import { RouteComponentProps } from '@reach/router';
import { getAllData } from '@/hooks/getAllData';
import { BoardCard } from '@/components/BoardCard';
import { BloggerInfo } from '@/components/BloggerInfo';

const IndexPage = (props: RouteComponentProps) => {
  const result = getAllData('', 'category').splice(0, 5);

  return (
    <Layout>
      <BloggerInfo></BloggerInfo>
      {result.map(data => {
        return <BoardCard key={data.node.frontmatter.slug} node={data.node}></BoardCard>;
      })}
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Life Vending Machine</title>;
