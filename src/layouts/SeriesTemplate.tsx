import React from 'react';
import Layout from '@/layouts/MainLayout';
import * as Components from '@/components';
import { graphql } from 'gatsby';

import type { IpostData } from '@/types/dataType';

const Template = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const seriesTitle = post.frontmatter.series ? post.frontmatter.series : '';
  return (
    <Layout>
      <Components.PostHeader date={post.frontmatter.date} title={seriesTitle} category={post.frontmatter.category} tag={null} />
      <Components.SeriesMain series={seriesTitle} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      tableOfContents
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일 ")
        title
        series
        category
        tag
        slug
      }
    }
  }
`;

export default Template;

export const Head = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const seriesTitle = post.frontmatter.series ? post.frontmatter.series : '';
  return (
    <>
      <Components.Seo>
        <title>{seriesTitle}</title>
        <meta property="og:title" content={seriesTitle} />
        <meta property="og:url" content={`https://mon823.github.io/post/${post.frontmatter.slug.split('/')[0]}/`} />
      </Components.Seo>
    </>
  );
};
