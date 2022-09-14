import React from 'react';
import type { HeadFC } from 'gatsby';
import '@styles/typography.css';
import Layout from '@layouts/MainPageLayout';
import { RouteComponentProps } from '@reach/router';

const IndexPage = (props: RouteComponentProps) => {
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Life Vending Machine</title>
  </>
);
