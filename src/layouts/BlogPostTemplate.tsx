import React from 'react';
import Layout from '@/layouts/MainLayout';
import { graphql } from 'gatsby';
import * as Components from '@/components';

import type { IpostData } from '@/types/dataType';

const Template = (props: IpostData) => {
  const post = props.data.markdownRemark;
  const { repo } = props.data.site.siteMetadata.comments.utterances;
  const pageContext = props.pageContext;
  return (
    <Layout>
      <Components.PostHeader date={post.frontmatter.date} title={post.frontmatter.title} category={post.frontmatter.category} tag={post.frontmatter.tag} />
      <Components.PostToc html={post.tableOfContents} title={post.frontmatter.title} />
      {post.frontmatter.series ? (
        <Components.SeriesSection series={post.frontmatter.series} title={post.frontmatter.title} slug={post.frontmatter.slug} />
      ) : (
        <></>
      )}
      <Components.PostMain html={post.html} />
      <Components.PostTailBtn pageContext={pageContext} />
      <Components.Profile />
      <Components.Utterances repo={repo} />
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
    site {
      siteMetadata {
        comments {
          utterances {
            repo
          }
        }
      }
    }
  }
`;

export default Template;

export const Head = (props: IpostData) => {
  const post = props.data.markdownRemark;
  return (
    <>
      <Components.Seo>
        <title>{post.frontmatter.title}</title>
        <meta property="og:title" content={post.frontmatter.title} />
        <meta name="description" content={post.excerpt} />
        <meta name="og:description" content={post.excerpt} />
        <meta name="keywords" content={post.frontmatter.tag ? post.frontmatter.tag : undefined} />
      </Components.Seo>
    </>
  );
};
