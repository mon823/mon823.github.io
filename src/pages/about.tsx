import React from 'react';
import '@styles/typography.css';
import Layout from '@layouts/MainLayout';
import * as Components from '@/components';
import { Seo } from '@/components/SEO';

const IndexPage = () => {
  return (
    <Layout>
      <Components.BloggerInfo></Components.BloggerInfo>
      <Components.About></Components.About>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <Seo>
      <title>Life Vending Machine</title>
      <meta name="description" content="개발 일지 블로그" />
      <meta name="og:description" content="개발 일지 블로그" />
      <meta property="og:title" content="Life Vending Machine" />
    </Seo>
  </>
);
