import React from 'react';
import Layout from './MainPageLayout';
import { graphql } from 'gatsby';
import { PostHeader } from '@/components/PostHeader';
import { PostMain } from '@/components/PostMain';

interface Iprops {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        date: string;
        slug: string;
        series: string | null;
        category: string;
      };
      html: string;
    };
  };
}

const Template = (props: Iprops) => {
  const post = props.data.markdownRemark;
  return (
    <Layout>
      <PostHeader date={post.frontmatter.date} title={post.frontmatter.title} category={post.frontmatter.category} />
      <PostMain html={post.html} />
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
