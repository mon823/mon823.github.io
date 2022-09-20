import React from 'react';
import Layout from '@/layouts/MainLayout';
import { PostHeader } from '@/components/PostHeader';
import { SeriesMain } from '@/components/SeriesMain';
import { graphql } from 'gatsby';

import type { IpostData } from '@/types/dataType';

const Template = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const seriesTitle = post.frontmatter.series ? post.frontmatter.series : '';
  return (
    <>
      <Layout>
        <PostHeader date={post.frontmatter.date} title={seriesTitle} category={post.frontmatter.category} tag={null} />
        <SeriesMain series={seriesTitle} />
      </Layout>
    </>
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
      }
    }
  }
`;

export default Template;
