import React from 'react';
import type { HeadFC } from 'gatsby';
import '@styles/typography.css';
import Layout from '@layouts/MainPageLayout';
import { Nav } from '@/components/Nav/Nav';
import { RouteComponentProps } from '@reach/router';

const IndexPage = (props: RouteComponentProps) => {
  return (
    <>
      <Layout>
        <Nav></Nav>
      </Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Life Vending Machine</title>
  </>
);
