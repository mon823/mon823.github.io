import React from 'react';
import Layout from '@/layouts/MainLayout';
import { graphql } from 'gatsby';
import { PostHeader } from '@/components/PostHeader';
import { PostMain } from '@/components/PostMain';
import { SeriesSection } from '@/components/SeriesSection';
import { PostTailBtn } from '@/components/PostTailBtn';
import { PostToc } from '@/components/PostToc';

import type { IpostData } from '@/types/dataType';

const Template = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const pageContext = props.pageContext;
  return (
    <Layout>
      <PostHeader date={post.frontmatter.date} title={post.frontmatter.title} category={post.frontmatter.category} tag={post.frontmatter.tag} />
      <PostToc html={post.tableOfContents} />
      {post.frontmatter.series ? <SeriesSection series={post.frontmatter.series} title={post.frontmatter.title} slug={post.frontmatter.slug} /> : <></>}
      <PostMain html={post.html} />
      <PostTailBtn pageContext={pageContext} />
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
        slug
        series
        category
        tag
      }
      excerpt(truncate: true, pruneLength: 100)
    }
  }
`;

export default Template;
