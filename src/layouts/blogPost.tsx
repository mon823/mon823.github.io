import React from 'react';
import Layout from './MainLayout';
import { graphql } from 'gatsby';
import { PostHeader } from '@/components/PostHeader';
import { PostMain } from '@/components/PostMain';
import { SeriesSection } from '@/components/SeriesSection';
import { PostTailBtn } from '@/components/PostTailBtn';
import type { IpostData } from '@/types/dataType';

const Template = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const pageContext = props.pageContext;
  return (
    <Layout>
      <PostHeader date={post.frontmatter.date} title={post.frontmatter.title} category={post.frontmatter.category} />
      {post.frontmatter.series ? <SeriesSection series={post.frontmatter.series} title={post.frontmatter.title} /> : <></>}
      <PostMain html={post.html} />
      <PostTailBtn pageContext={pageContext} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "YYYY년 MM월 DD일 ")
        title
        slug
        series
        category
      }
    }
  }
`;

export default Template;
