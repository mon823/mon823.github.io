import type { GatsbyNode, Actions } from 'gatsby';
import type { IallMarkdownData } from '@/types/dataType';
import path from 'path';

export const onPostBuild: GatsbyNode['onPostBuild'] = ({ reporter }) => {
  reporter.info('Blog has been built!');
};

// const createPostPages = ({ actions, result }: { actions: Actions; result: Iresult }) => {
//   const { createPage } = actions;
// };

const createBlogPages = ({ actions, result }: { actions: Actions; result: IallMarkdownData }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('src/layouts/blogPost.tsx');
  if (result.data) {
    result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
      createPage({
        path: `/post${node.frontmatter.slug}`,
        component: blogPostTemplate,
        context: {
          title: node.frontmatter.title,
          date: node.frontmatter.date,
          slug: node.frontmatter.slug,
          series: node.frontmatter.series,
          category: node.frontmatter.category,
          next: next,
          previous: previous,
        },
      });
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({ actions, graphql }) => {
  const result: IallMarkdownData = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { stage: { eq: "PUBLISHED" } } }, sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              title
              date
              slug
              series
              category
            }
          }
          next {
            frontmatter {
              slug
              title
            }
          }
          previous {
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    return Promise.reject(result.errors);
  } else {
    createBlogPages({ actions, result });
  }
};
